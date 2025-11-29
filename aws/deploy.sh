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
ALB_TARGET_GROUP_ARN="${AWS_ALB_TARGET_GROUP_ARN:-}"
DOCKER_IMAGE="${DOCKER_IMAGE:-ghcr.io/imrlopezag/portfolio-api:next-strapi}"

# Fixed names (not sensitive)
CLUSTER_NAME="portfolio-cluster"
SERVICE_NAME="portfolio-api-service"
TASK_DEFINITION_FILE="aws/task-definition.json"
ECS_SG_NAME="portfolio-ecs-sg"
EFS_SG_NAME="portfolio-efs-sg"

# ============================================
# Helper Functions
# ============================================

log_info() {
  echo "ℹ️  $1" >&2
}

log_success() {
  echo "✅ $1" >&2
}

log_warning() {
  echo "⚠️  $1" >&2
}

log_error() {
  echo "❌ $1" >&2
  exit 1
}

# ============================================
# AWS Functions
# ============================================

get_account_id() {
  aws sts get-caller-identity --query Account --output text
}

# Cluster Functions
check_cluster_exists() {
  local cluster_name=$1
  aws ecs describe-clusters \
    --clusters "$cluster_name" \
    --region $REGION \
    --query "clusters[?clusterName=='$cluster_name' && status=='ACTIVE'].clusterName" \
    --output text 2>/dev/null || echo ""
}

create_cluster() {
  local cluster_name=$1
  log_info "Creating ECS cluster: $cluster_name"
  aws ecs create-cluster \
    --cluster-name "$cluster_name" \
    --region $REGION \
    --capacity-providers FARGATE FARGATE_SPOT \
    --default-capacity-provider-strategy capacityProvider=FARGATE,weight=1 \
    --query 'cluster.clusterArn' \
    --output text >/dev/null
}

ensure_cluster() {
  local cluster_name=$1
  log_info "Checking for ECS cluster..."
  
  local existing=$(check_cluster_exists "$cluster_name")
  if [ -z "$existing" ]; then
    create_cluster "$cluster_name"
    log_success "ECS Cluster created: $cluster_name"
  else
    log_success "Using existing ECS Cluster: $cluster_name"
  fi
}

# Security Group Functions
check_security_group_exists() {
  local sg_name=$1
  local vpc_id=$2
  aws ec2 describe-security-groups \
    --filters "Name=group-name,Values=$sg_name" "Name=vpc-id,Values=$vpc_id" \
    --region $REGION \
    --query 'SecurityGroups[0].GroupId' \
    --output text 2>/dev/null || echo "None"
}

create_security_group() {
  local sg_name=$1
  local description=$2
  local vpc_id=$3
  aws ec2 create-security-group \
    --group-name "$sg_name" \
    --description "$description" \
    --vpc-id "$vpc_id" \
    --region $REGION \
    --query 'GroupId' \
    --output text
}

add_ingress_rule() {
  local sg_id=$1
  local port=$2
  local cidr=${3:-"0.0.0.0/0"}
  aws ec2 authorize-security-group-ingress \
    --group-id "$sg_id" \
    --protocol tcp \
    --port "$port" \
    --cidr "$cidr" \
    --region $REGION >/dev/null 2>&1 || true
}

add_ingress_rule_from_sg() {
  local sg_id=$1
  local port=$2
  local source_sg=$3
  aws ec2 authorize-security-group-ingress \
    --group-id "$sg_id" \
    --protocol tcp \
    --port "$port" \
    --source-group "$source_sg" \
    --region $REGION >/dev/null 2>&1 || true
}

ensure_ecs_security_group() {
  log_info "Checking for ECS security group..."
  
  local existing=$(check_security_group_exists "$ECS_SG_NAME" "$VPC_ID")
  if [ "$existing" != "None" ] && [ -n "$existing" ]; then
    log_success "Using existing ECS Security Group: $existing"
    echo "$existing"
  else
    local sg_id=$(create_security_group "$ECS_SG_NAME" "Security group for ECS tasks" "$VPC_ID")
    log_success "ECS Security Group created: $sg_id"
    
    log_info "Adding ingress rule for Strapi port 1337..."
    add_ingress_rule "$sg_id" 1337
    
    echo "$sg_id"
  fi
}

configure_efs_access() {
  local ecs_sg_id=$1
  log_info "Checking EFS security group for access configuration..."
  
  local efs_sg_id=$(check_security_group_exists "$EFS_SG_NAME" "$VPC_ID")
  if [ "$efs_sg_id" != "None" ] && [ -n "$efs_sg_id" ]; then
    log_info "Ensuring ECS can access EFS..."
    add_ingress_rule_from_sg "$efs_sg_id" 2049 "$ecs_sg_id"
    log_success "EFS access configured"
  else
    log_warning "EFS security group not found, skipping EFS access configuration"
  fi
}

# IAM Role Functions
check_role_exists() {
  local role_name=$1
  aws iam get-role \
    --role-name "$role_name" \
    --query 'Role.RoleName' \
    --output text 2>/dev/null || echo ""
}

create_ecs_execution_role() {
  local role_name="ecsTaskExecutionRole"
  log_info "Creating ECS Task Execution Role..."
  
  # Create trust policy
  local trust_policy='{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "ecs-tasks.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }'
  
  aws iam create-role \
    --role-name "$role_name" \
    --assume-role-policy-document "$trust_policy" \
    --description "Role for ECS task execution" \
    >/dev/null
  
  # Attach AWS managed policy
  aws iam attach-role-policy \
    --role-name "$role_name" \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
  
  log_success "ECS Task Execution Role created: $role_name"
}

create_ecs_task_role() {
  local role_name="ecsTaskRole"
  log_info "Creating ECS Task Role..."
  
  # Create trust policy
  local trust_policy='{
    "Version": "2012-10-17",
    "Statement": [
      {
        "Effect": "Allow",
        "Principal": {
          "Service": "ecs-tasks.amazonaws.com"
        },
        "Action": "sts:AssumeRole"
      }
    ]
  }'
  
  aws iam create-role \
    --role-name "$role_name" \
    --assume-role-policy-document "$trust_policy" \
    --description "Role for ECS tasks to access AWS services" \
    >/dev/null
  
  log_success "ECS Task Role created: $role_name"
}

add_secrets_manager_policy() {
  local role_name=$1
  local account_id=$2
  log_info "Adding Secrets Manager permissions..."
  
  local policy="{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
      {
        \"Effect\": \"Allow\",
        \"Action\": [\"secretsmanager:GetSecretValue\"],
        \"Resource\": [
          \"arn:aws:secretsmanager:${REGION}:${account_id}:secret:portfolio/*\",
          \"arn:aws:secretsmanager:${REGION}:${account_id}:secret:github/*\"
        ]
      }
    ]
  }"
  
  aws iam put-role-policy \
    --role-name "$role_name" \
    --policy-name SecretsManagerAccess \
    --policy-document "$policy" \
    >/dev/null
}

add_efs_policy() {
  local role_name=$1
  local account_id=$2
  local file_system_id=$3
  local access_point_id=$4
  log_info "Adding EFS permissions..."
  
  local policy="{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
      {
        \"Effect\": \"Allow\",
        \"Action\": [
          \"elasticfilesystem:ClientMount\",
          \"elasticfilesystem:ClientWrite\"
        ],
        \"Resource\": \"arn:aws:elasticfilesystem:${REGION}:${account_id}:file-system/${file_system_id}\",
        \"Condition\": {
          \"StringEquals\": {
            \"elasticfilesystem:AccessPointArn\": \"arn:aws:elasticfilesystem:${REGION}:${account_id}:access-point/${access_point_id}\"
          }
        }
      }
    ]
  }"
  
  aws iam put-role-policy \
    --role-name "$role_name" \
    --policy-name EFSAccess \
    --policy-document "$policy" \
    >/dev/null
}

ensure_iam_roles() {
  local account_id=$1
  
  # Check/create execution role
  log_info "Checking for ECS Task Execution Role..."
  local exec_role=$(check_role_exists "ecsTaskExecutionRole")
  if [ -z "$exec_role" ]; then
    create_ecs_execution_role
    add_secrets_manager_policy "ecsTaskExecutionRole" "$account_id"
  else
    log_success "Using existing ECS Task Execution Role"
  fi
  
  # Check/create task role
  log_info "Checking for ECS Task Role..."
  local task_role=$(check_role_exists "ecsTaskRole")
  if [ -z "$task_role" ]; then
    create_ecs_task_role
  else
    log_success "Using existing ECS Task Role"
  fi
  
  # Add EFS policy if EFS exists
  local efs_id=$(aws efs describe-file-systems \
    --region $REGION \
    --query "FileSystems[?Tags[?Key=='Name' && Value=='portfolio-strapi-data']].FileSystemId | [0]" \
    --output text 2>/dev/null || echo "")
  
  if [ -n "$efs_id" ] && [ "$efs_id" != "None" ]; then
    local ap_id=$(aws efs describe-access-points \
      --file-system-id "$efs_id" \
      --region $REGION \
      --query "AccessPoints[0].AccessPointId" \
      --output text 2>/dev/null || echo "")
    
    if [ -n "$ap_id" ] && [ "$ap_id" != "None" ]; then
      add_efs_policy "ecsTaskRole" "$account_id" "$efs_id" "$ap_id"
      log_success "EFS permissions configured"
    fi
  fi
}

# CloudWatch Log Group Functions
ensure_log_group() {
  local log_group_name="/ecs/portfolio-api"
  log_info "Checking for CloudWatch Log Group..."
  
  local existing=$(aws logs describe-log-groups \
    --log-group-name-prefix "$log_group_name" \
    --region $REGION \
    --query "logGroups[?logGroupName=='$log_group_name'].logGroupName" \
    --output text 2>/dev/null || echo "")
  
  if [ -z "$existing" ]; then
    log_info "Creating CloudWatch Log Group..."
    aws logs create-log-group \
      --log-group-name "$log_group_name" \
      --region $REGION >/dev/null
    log_success "CloudWatch Log Group created: $log_group_name"
  else
    log_success "Using existing CloudWatch Log Group: $log_group_name"
  fi
}

# Task Definition Functions
register_task_definition() {
  local task_file=$1
  log_info "Registering task definition..."
  
  local arn=$(aws ecs register-task-definition \
    --cli-input-json "file://$task_file" \
    --region $REGION \
    --query 'taskDefinition.taskDefinitionArn' \
    --output text)
  
  log_success "Task definition registered: $arn"
  echo "$arn"
}

# Service Functions
check_service_exists() {
  local cluster_name=$1
  local service_name=$2
  aws ecs describe-services \
    --cluster "$cluster_name" \
    --services "$service_name" \
    --region $REGION \
    --query "services[?serviceName=='$service_name' && status=='ACTIVE'].serviceName" \
    --output text 2>/dev/null || echo ""
}

create_service() {
  local cluster_name=$1
  local service_name=$2
  local task_def_arn=$3
  local security_group=$4
  local subnets=$5
  
  log_info "Creating ECS service: $service_name"
  aws ecs create-service \
    --cluster "$cluster_name" \
    --service-name "$service_name" \
    --task-definition "$task_def_arn" \
    --desired-count 1 \
    --launch-type FARGATE \
    --platform-version LATEST \
    --network-configuration "awsvpcConfiguration={subnets=[$subnets],securityGroups=[$security_group],assignPublicIp=ENABLED}" \
    --region $REGION \
    --query 'service.serviceArn' \
    --output text >/dev/null
}

update_service() {
  local cluster_name=$1
  local service_name=$2
  local task_def_arn=$3
  
  log_info "Updating ECS service: $service_name"
  aws ecs update-service \
    --cluster "$cluster_name" \
    --service "$service_name" \
    --task-definition "$task_def_arn" \
    --force-new-deployment \
    --region $REGION \
    --query 'service.serviceArn' \
    --output text >/dev/null
}

wait_for_service_stable() {
  local cluster_name=$1
  local service_name=$2
  
  log_info "Waiting for service to stabilize..."
  aws ecs wait services-stable \
    --cluster "$cluster_name" \
    --services "$service_name" \
    --region $REGION
}

ensure_service() {
  local cluster_name=$1
  local service_name=$2
  local task_def_arn=$3
  local security_group=$4
  
  log_info "Checking for ECS service..."
  
  local subnet_string=$(IFS=,; echo "${SUBNET_IDS[*]}")
  local existing=$(check_service_exists "$cluster_name" "$service_name")
  
  if [ -z "$existing" ]; then
    create_service "$cluster_name" "$service_name" "$task_def_arn" "$security_group" "$subnet_string"
    log_success "ECS Service created: $service_name"
  else
    update_service "$cluster_name" "$service_name" "$task_def_arn"
    log_success "ECS Service updated: $service_name"
  fi
}

# ============================================
# Main Deployment Function
# ============================================

generate_task_definition() {
  local account_id=$1
  log_info "Generating task definition from template..."
  
  # Export variables for envsubst
  export AWS_ACCOUNT_ID="$account_id"
  export AWS_REGION="$REGION"
  export AWS_EFS_FILE_SYSTEM_ID="$EFS_FILE_SYSTEM_ID"
  export AWS_EFS_ACCESS_POINT_ID="$EFS_ACCESS_POINT_ID"
  export DOCKER_IMAGE="$DOCKER_IMAGE"
  
  envsubst < aws/task-definition.template.json > aws/task-definition.json
  log_success "Task definition generated"
}

deploy() {
  echo "🚀 Deploying portfolio-api to ECS..."
  echo ""
  
  # Get account ID
  local account_id=$(get_account_id)
  log_info "AWS Account ID: $account_id"
  
  # Generate task definition from template
  generate_task_definition "$account_id"
  
  # Ensure IAM roles exist
  ensure_iam_roles "$account_id"
  
  # Ensure CloudWatch Log Group exists
  ensure_log_group
  
  # Ensure cluster exists
  ensure_cluster "$CLUSTER_NAME"
  
  # Ensure security group exists
  local ecs_sg_id=$(ensure_ecs_security_group)
  
  # Configure EFS access
  configure_efs_access "$ecs_sg_id"
  
  # Register task definition
  local task_def_arn=$(register_task_definition "$TASK_DEFINITION_FILE")
  
  # Ensure service exists and deploy
  ensure_service "$CLUSTER_NAME" "$SERVICE_NAME" "$task_def_arn" "$ecs_sg_id"
  
  # Wait for deployment
  wait_for_service_stable "$CLUSTER_NAME" "$SERVICE_NAME"
  
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

# ============================================
# Run Deployment
# ============================================

deploy
