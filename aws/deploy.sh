#!/bin/bash
set -e

# Disable AWS CLI pager to prevent blocking
export AWS_PAGER=""

# Load environment variables from .env file if it exists (for local development)
if [ -f "aws/.env" ]; then
  export $(grep -v '^#' aws/.env | xargs)
fi

# Configuration from environment variables
REGION="${AWS_REGION:-us-east-1}"
VPC_ID="${AWS_VPC_ID:?AWS_VPC_ID is required}"
SUBNET_IDS=("${AWS_SUBNET_1:?AWS_SUBNET_1 is required}" "${AWS_SUBNET_2:?AWS_SUBNET_2 is required}")
EFS_FILE_SYSTEM_ID="${AWS_EFS_FILE_SYSTEM_ID:?AWS_EFS_FILE_SYSTEM_ID is required}"
EFS_ACCESS_POINT_ID="${AWS_EFS_ACCESS_POINT_ID:?AWS_EFS_ACCESS_POINT_ID is required}"
DOCKER_IMAGE="${DOCKER_IMAGE:-ghcr.io/imrlopezag/portfolio-api:latest}"

# Fixed names
CLUSTER_NAME="portfolio-cluster"
SERVICE_NAME="portfolio-api-service"
TASK_DEFINITION_FILE="aws/task-definition.json"
ECS_SG_NAME="portfolio-ecs-sg"

# ============================================
# Helper Functions
# ============================================

log_info() {
  echo "ℹ️  $1" >&2
}

log_success() {
  echo "✅ $1" >&2
}

log_error() {
  echo "❌ $1" >&2
  exit 1
}

get_account_id() {
  aws sts get-caller-identity --query Account --output text
}

# ============================================
# Deploy Functions
# ============================================

generate_task_definition() {
  local account_id=$1
  log_info "Generating task definition from template..."
  
  export AWS_ACCOUNT_ID="$account_id"
  export AWS_REGION="$REGION"
  export AWS_EFS_FILE_SYSTEM_ID="$EFS_FILE_SYSTEM_ID"
  export AWS_EFS_ACCESS_POINT_ID="$EFS_ACCESS_POINT_ID"
  export DOCKER_IMAGE="$DOCKER_IMAGE"
  
  envsubst < aws/task-definition.template.json > aws/task-definition.json
  log_success "Task definition generated"
}

get_ecs_security_group() {
  aws ec2 describe-security-groups \
    --filters "Name=group-name,Values=$ECS_SG_NAME" "Name=vpc-id,Values=$VPC_ID" \
    --region $REGION \
    --query 'SecurityGroups[0].GroupId' \
    --output text 2>/dev/null || echo "None"
}

register_task_definition() {
  log_info "Registering task definition..."
  
  local arn=$(aws ecs register-task-definition \
    --cli-input-json "file://$TASK_DEFINITION_FILE" \
    --region $REGION \
    --query 'taskDefinition.taskDefinitionArn' \
    --output text)
  
  log_success "Task definition registered: $arn"
  echo "$arn"
}

check_service_exists() {
  aws ecs describe-services \
    --cluster "$CLUSTER_NAME" \
    --services "$SERVICE_NAME" \
    --region $REGION \
    --query "services[?serviceName=='$SERVICE_NAME' && status=='ACTIVE'].serviceName" \
    --output text 2>/dev/null || echo ""
}

deploy_service() {
  local task_def_arn=$1
  local ecs_sg_id=$2
  local subnet_string=$(IFS=,; echo "${SUBNET_IDS[*]}")
  
  local existing=$(check_service_exists)
  
  if [ -z "$existing" ]; then
    log_info "Creating ECS service: $SERVICE_NAME"
    aws ecs create-service \
      --cluster "$CLUSTER_NAME" \
      --service-name "$SERVICE_NAME" \
      --task-definition "$task_def_arn" \
      --desired-count 1 \
      --launch-type FARGATE \
      --platform-version LATEST \
      --network-configuration "awsvpcConfiguration={subnets=[$subnet_string],securityGroups=[$ecs_sg_id],assignPublicIp=ENABLED}" \
      --region $REGION \
      --query 'service.serviceArn' \
      --output text >/dev/null
    log_success "ECS Service created: $SERVICE_NAME"
  else
    log_info "Updating ECS service: $SERVICE_NAME"
    aws ecs update-service \
      --cluster "$CLUSTER_NAME" \
      --service "$SERVICE_NAME" \
      --task-definition "$task_def_arn" \
      --force-new-deployment \
      --region $REGION \
      --query 'service.serviceArn' \
      --output text >/dev/null
    log_success "ECS Service updated: $SERVICE_NAME"
  fi
}

wait_for_stable() {
  log_info "Waiting for service to stabilize..."
  aws ecs wait services-stable \
    --cluster "$CLUSTER_NAME" \
    --services "$SERVICE_NAME" \
    --region $REGION
}

# ============================================
# Main Deployment
# ============================================

deploy() {
  echo "🚀 Deploying portfolio-api to ECS..."
  echo ""
  
  local account_id=$(get_account_id)
  log_info "AWS Account ID: $account_id"
  
  # Get ECS security group (created by setup.sh)
  local ecs_sg_id=$(get_ecs_security_group)
  if [ "$ecs_sg_id" == "None" ] || [ -z "$ecs_sg_id" ]; then
    log_error "ECS security group not found. Run ./aws/setup.sh first."
  fi
  log_success "Using ECS Security Group: $ecs_sg_id"
  
  # Generate and register task definition
  generate_task_definition "$account_id"
  local task_def_arn=$(register_task_definition)
  
  # Deploy service
  deploy_service "$task_def_arn" "$ecs_sg_id"
  
  # Wait for deployment
  wait_for_stable
  
  echo ""
  echo "============================================"
  echo "✅ Deployment complete!"
  echo "============================================"
  echo "Cluster: $CLUSTER_NAME"
  echo "Service: $SERVICE_NAME"
  echo "Task Definition: $task_def_arn"
  echo ""
  echo "To view logs:"
  echo "  aws logs tail /ecs/portfolio-api --follow --region $REGION"
  echo "============================================"
}

deploy
