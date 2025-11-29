#!/bin/bash

# Consolidated Setup Script for Portfolio API
# This script sets up all required AWS resources and secrets

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

# R2 Configuration (optional - only needed for R2 setup)
R2_ACCESS_KEY_ID="${R2_ACCESS_KEY_ID:-}"
R2_SECRET_ACCESS_KEY="${R2_SECRET_ACCESS_KEY:-}"
R2_ENDPOINT="${R2_ENDPOINT:-}"
R2_BUCKET="${R2_BUCKET:-}"
R2_PUBLIC_URL="${R2_PUBLIC_URL:-}"

# Fixed names
SECURITY_GROUP_NAME="portfolio-efs-sg"
EFS_NAME="portfolio-strapi-data"

echo "🚀 Portfolio API - AWS Setup"
echo "============================================"
echo ""

# Get AWS Account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo "📋 AWS Account ID: $ACCOUNT_ID"
echo "📋 Region: $REGION"
echo ""

# ============================================
# EFS Setup
# ============================================

echo "📁 Setting up EFS for persistent storage..."

# Check if Security Group already exists
EXISTING_SG_ID=$(aws ec2 describe-security-groups \
  --filters "Name=group-name,Values=$SECURITY_GROUP_NAME" "Name=vpc-id,Values=$VPC_ID" \
  --region $REGION \
  --query 'SecurityGroups[0].GroupId' \
  --output text 2>/dev/null || echo "None")

if [ "$EXISTING_SG_ID" != "None" ] && [ -n "$EXISTING_SG_ID" ]; then
  echo "  ✅ Using existing Security Group: $EXISTING_SG_ID"
  EFS_SG_ID=$EXISTING_SG_ID
else
  echo "  🔒 Creating security group for EFS..."
  EFS_SG_ID=$(aws ec2 create-security-group \
    --group-name $SECURITY_GROUP_NAME \
    --description "Security group for Strapi EFS" \
    --vpc-id $VPC_ID \
    --region $REGION \
    --query 'GroupId' \
    --output text)
  echo "  ✅ Security Group created: $EFS_SG_ID"

  aws ec2 authorize-security-group-ingress \
    --group-id $EFS_SG_ID \
    --protocol tcp \
    --port 2049 \
    --cidr 10.0.0.0/8 \
    --region $REGION
fi

# Check if EFS File System already exists
EXISTING_FS_ID=$(aws efs describe-file-systems \
  --region $REGION \
  --query "FileSystems[?Tags[?Key=='Name' && Value=='$EFS_NAME']].FileSystemId | [0]" \
  --output text 2>/dev/null || echo "None")

if [ "$EXISTING_FS_ID" != "None" ] && [ -n "$EXISTING_FS_ID" ]; then
  echo "  ✅ Using existing EFS File System: $EXISTING_FS_ID"
  FILE_SYSTEM_ID=$EXISTING_FS_ID
else
  echo "  💾 Creating EFS file system..."
  FILE_SYSTEM_ID=$(aws efs create-file-system \
    --performance-mode generalPurpose \
    --throughput-mode bursting \
    --encrypted \
    --tags Key=Name,Value=$EFS_NAME \
    --region $REGION \
    --query 'FileSystemId' \
    --output text)
  echo "  ✅ EFS File System created: $FILE_SYSTEM_ID"
  sleep 10
fi

# Create mount targets in each subnet
EXISTING_MOUNT_TARGETS=$(aws efs describe-mount-targets \
  --file-system-id $FILE_SYSTEM_ID \
  --region $REGION \
  --query 'MountTargets[].SubnetId' \
  --output text 2>/dev/null || echo "")

for SUBNET_ID in "${SUBNET_IDS[@]}"; do
  if echo "$EXISTING_MOUNT_TARGETS" | grep -q "$SUBNET_ID"; then
    echo "  ✅ Mount target already exists in $SUBNET_ID"
  else
    echo "  🔗 Creating mount target in $SUBNET_ID..."
    aws efs create-mount-target \
      --file-system-id $FILE_SYSTEM_ID \
      --subnet-id $SUBNET_ID \
      --security-groups $EFS_SG_ID \
      --region $REGION 2>/dev/null || true
  fi
done

# Check if Access Point already exists
EXISTING_AP_ID=$(aws efs describe-access-points \
  --file-system-id $FILE_SYSTEM_ID \
  --region $REGION \
  --query "AccessPoints[?Tags[?Key=='Name' && Value=='portfolio-strapi-ap']].AccessPointId | [0]" \
  --output text 2>/dev/null || echo "None")

if [ "$EXISTING_AP_ID" != "None" ] && [ -n "$EXISTING_AP_ID" ]; then
  echo "  ✅ Using existing EFS Access Point: $EXISTING_AP_ID"
  ACCESS_POINT_ID=$EXISTING_AP_ID
else
  echo "  🔑 Creating EFS access point..."
  sleep 30
  ACCESS_POINT_ID=$(aws efs create-access-point \
    --file-system-id $FILE_SYSTEM_ID \
    --posix-user Uid=1000,Gid=1000 \
    --root-directory "Path=/strapi,CreationInfo={OwnerUid=1000,OwnerGid=1000,Permissions=755}" \
    --tags Key=Name,Value=portfolio-strapi-ap \
    --region $REGION \
    --query 'AccessPointId' \
    --output text)
  echo "  ✅ EFS Access Point created: $ACCESS_POINT_ID"
fi

echo ""

# ============================================
# IAM Roles Setup
# ============================================

echo "🔐 Setting up IAM roles..."

# ECS Task Execution Role
EXISTING_EXEC_ROLE=$(aws iam get-role \
  --role-name ecsTaskExecutionRole \
  --query 'Role.RoleName' \
  --output text 2>/dev/null || echo "")

if [ -z "$EXISTING_EXEC_ROLE" ]; then
  echo "  🔐 Creating ECS Task Execution Role..."
  
  aws iam create-role \
    --role-name ecsTaskExecutionRole \
    --assume-role-policy-document '{
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {"Service": "ecs-tasks.amazonaws.com"},
          "Action": "sts:AssumeRole"
        }
      ]
    }' \
    --description "Role for ECS task execution" >/dev/null
  
  aws iam attach-role-policy \
    --role-name ecsTaskExecutionRole \
    --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy
  
  echo "  ✅ ECS Task Execution Role created"
else
  echo "  ✅ Using existing ECS Task Execution Role"
fi

# Add Secrets Manager policy
aws iam put-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-name SecretsManagerAccess \
  --policy-document "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
      {
        \"Effect\": \"Allow\",
        \"Action\": [\"secretsmanager:GetSecretValue\"],
        \"Resource\": [
          \"arn:aws:secretsmanager:${REGION}:${ACCOUNT_ID}:secret:portfolio/*\",
          \"arn:aws:secretsmanager:${REGION}:${ACCOUNT_ID}:secret:github/*\"
        ]
      }
    ]
  }" >/dev/null

# ECS Task Role
EXISTING_TASK_ROLE=$(aws iam get-role \
  --role-name ecsTaskRole \
  --query 'Role.RoleName' \
  --output text 2>/dev/null || echo "")

if [ -z "$EXISTING_TASK_ROLE" ]; then
  echo "  🔐 Creating ECS Task Role..."
  
  aws iam create-role \
    --role-name ecsTaskRole \
    --assume-role-policy-document '{
      "Version": "2012-10-17",
      "Statement": [
        {
          "Effect": "Allow",
          "Principal": {"Service": "ecs-tasks.amazonaws.com"},
          "Action": "sts:AssumeRole"
        }
      ]
    }' \
    --description "Role for ECS tasks to access AWS services" >/dev/null
  
  echo "  ✅ ECS Task Role created"
else
  echo "  ✅ Using existing ECS Task Role"
fi

# Add EFS policy
aws iam put-role-policy \
  --role-name ecsTaskRole \
  --policy-name EFSAccess \
  --policy-document "{
    \"Version\": \"2012-10-17\",
    \"Statement\": [
      {
        \"Effect\": \"Allow\",
        \"Action\": [
          \"elasticfilesystem:ClientMount\",
          \"elasticfilesystem:ClientWrite\"
        ],
        \"Resource\": \"arn:aws:elasticfilesystem:${REGION}:${ACCOUNT_ID}:file-system/${FILE_SYSTEM_ID}\",
        \"Condition\": {
          \"StringEquals\": {
            \"elasticfilesystem:AccessPointArn\": \"arn:aws:elasticfilesystem:${REGION}:${ACCOUNT_ID}:access-point/${ACCESS_POINT_ID}\"
          }
        }
      }
    ]
  }" >/dev/null

echo ""

# ============================================
# Secrets Manager Setup
# ============================================

echo "🔑 Setting up secrets in AWS Secrets Manager..."

create_or_update_secret() {
  local name=$1
  local value=$2
  local description=$3
  
  aws secretsmanager create-secret \
    --name "$name" \
    --secret-string "$value" \
    --region $REGION \
    --description "$description" \
    2>/dev/null || \
  aws secretsmanager update-secret \
    --secret-id "$name" \
    --secret-string "$value" \
    --region $REGION >/dev/null 2>&1
  
  echo "  ✅ $name"
}

# R2 Secrets (if configured)
if [ -n "$R2_ACCESS_KEY_ID" ] && [ -n "$R2_SECRET_ACCESS_KEY" ]; then
  echo "  📦 Creating R2 storage secrets..."
  create_or_update_secret "portfolio/strapi-R2_ACCESS_KEY_ID" "$R2_ACCESS_KEY_ID" "Cloudflare R2 Access Key ID"
  create_or_update_secret "portfolio/strapi-R2_SECRET_ACCESS_KEY" "$R2_SECRET_ACCESS_KEY" "Cloudflare R2 Secret Access Key"
  create_or_update_secret "portfolio/strapi-R2_ENDPOINT" "$R2_ENDPOINT" "Cloudflare R2 S3-compatible endpoint"
  create_or_update_secret "portfolio/strapi-R2_BUCKET" "$R2_BUCKET" "Cloudflare R2 bucket name"
  create_or_update_secret "portfolio/strapi-R2_PUBLIC_URL" "$R2_PUBLIC_URL" "Cloudflare R2 public URL"
else
  echo "  ⚠️  R2 credentials not configured, skipping R2 secrets"
fi

echo ""

# ============================================
# CloudWatch Log Group
# ============================================

echo "📊 Setting up CloudWatch Log Group..."

LOG_GROUP_NAME="/ecs/portfolio-api"
EXISTING_LOG_GROUP=$(aws logs describe-log-groups \
  --log-group-name-prefix "$LOG_GROUP_NAME" \
  --region $REGION \
  --query "logGroups[?logGroupName=='$LOG_GROUP_NAME'].logGroupName" \
  --output text 2>/dev/null || echo "")

if [ -z "$EXISTING_LOG_GROUP" ]; then
  aws logs create-log-group \
    --log-group-name "$LOG_GROUP_NAME" \
    --region $REGION >/dev/null
  echo "  ✅ CloudWatch Log Group created: $LOG_GROUP_NAME"
else
  echo "  ✅ Using existing CloudWatch Log Group: $LOG_GROUP_NAME"
fi

echo ""

# ============================================
# Output Summary
# ============================================

echo "============================================"
echo "✅ Setup Complete!"
echo "============================================"
echo ""
echo "EFS File System ID: $FILE_SYSTEM_ID"
echo "EFS Access Point ID: $ACCESS_POINT_ID"
echo "EFS Security Group ID: $EFS_SG_ID"
echo ""
echo "Update your aws/.env file with:"
echo "  AWS_EFS_FILE_SYSTEM_ID=$FILE_SYSTEM_ID"
echo "  AWS_EFS_ACCESS_POINT_ID=$ACCESS_POINT_ID"
echo ""
echo "Next step: Run ./aws/deploy.sh to deploy the service"
echo "============================================"
