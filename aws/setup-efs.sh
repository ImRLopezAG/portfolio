#!/bin/bash
set -e

# Disable AWS CLI pager to prevent blocking
export AWS_PAGER=""

# Configuration
REGION="us-east-1"
VPC_ID="vpc-0b12e1cd3cec6a9a7"  # Replace with your VPC ID
SUBNET_IDS=("subnet-0b6f1b119fe2f2456" "subnet-066001e23226d7c01")  # Replace with your subnet IDs
SECURITY_GROUP_NAME="portfolio-efs-sg"
EFS_NAME="portfolio-strapi-data"

echo "🚀 Setting up EFS for Strapi persistent storage..."

# Get AWS Account ID
ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
echo "📋 AWS Account ID: $ACCOUNT_ID"

# Check if Security Group already exists
echo "🔒 Checking for existing security group..."
EXISTING_SG_ID=$(aws ec2 describe-security-groups \
  --filters "Name=group-name,Values=$SECURITY_GROUP_NAME" "Name=vpc-id,Values=$VPC_ID" \
  --region $REGION \
  --query 'SecurityGroups[0].GroupId' \
  --output text 2>/dev/null || echo "None")

if [ "$EXISTING_SG_ID" != "None" ] && [ -n "$EXISTING_SG_ID" ]; then
  echo "✅ Using existing Security Group: $EXISTING_SG_ID"
  EFS_SG_ID=$EXISTING_SG_ID
else
  echo "🔒 Creating security group for EFS..."
  EFS_SG_ID=$(aws ec2 create-security-group \
    --group-name $SECURITY_GROUP_NAME \
    --description "Security group for Strapi EFS" \
    --vpc-id $VPC_ID \
    --region $REGION \
    --query 'GroupId' \
    --output text)
  echo "✅ Security Group created: $EFS_SG_ID"

  # Add ingress rule for NFS (port 2049) from ECS tasks
  echo "🔓 Adding ingress rule for NFS..."
  aws ec2 authorize-security-group-ingress \
    --group-id $EFS_SG_ID \
    --protocol tcp \
    --port 2049 \
    --cidr 10.0.0.0/8 \
    --region $REGION
fi

# Check if EFS File System already exists
echo "💾 Checking for existing EFS file system..."
EXISTING_FS_ID=$(aws efs describe-file-systems \
  --region $REGION \
  --query "FileSystems[?Tags[?Key=='Name' && Value=='$EFS_NAME']].FileSystemId | [0]" \
  --output text 2>/dev/null || echo "None")

if [ "$EXISTING_FS_ID" != "None" ] && [ -n "$EXISTING_FS_ID" ]; then
  echo "✅ Using existing EFS File System: $EXISTING_FS_ID"
  FILE_SYSTEM_ID=$EXISTING_FS_ID
else
  echo "💾 Creating EFS file system..."
  FILE_SYSTEM_ID=$(aws efs create-file-system \
    --performance-mode generalPurpose \
    --throughput-mode bursting \
    --encrypted \
    --tags Key=Name,Value=$EFS_NAME \
    --region $REGION \
    --query 'FileSystemId' \
    --output text)
  echo "✅ EFS File System created: $FILE_SYSTEM_ID"
fi

# Wait for file system to become available
echo "⏳ Waiting for file system to become available..."
aws efs describe-file-systems \
  --file-system-id $FILE_SYSTEM_ID \
  --region $REGION \
  --query 'FileSystems[0].LifeCycleState' \
  --output text

sleep 10

# Check if mount targets already exist
echo "🔗 Checking for existing mount targets..."
EXISTING_MOUNT_TARGETS=$(aws efs describe-mount-targets \
  --file-system-id $FILE_SYSTEM_ID \
  --region $REGION \
  --query 'MountTargets[].SubnetId' \
  --output text 2>/dev/null || echo "")

# Create mount targets in each subnet (skip if already exists)
echo "🔗 Creating mount targets..."
for SUBNET_ID in "${SUBNET_IDS[@]}"; do
  if echo "$EXISTING_MOUNT_TARGETS" | grep -q "$SUBNET_ID"; then
    echo "  ✅ Mount target already exists in $SUBNET_ID, skipping..."
  else
    echo "  Creating mount target in $SUBNET_ID..."
    aws efs create-mount-target \
      --file-system-id $FILE_SYSTEM_ID \
      --subnet-id $SUBNET_ID \
      --security-groups $EFS_SG_ID \
      --region $REGION || echo "  ⚠️ Mount target creation failed or already exists in $SUBNET_ID"
  fi
done

echo "⏳ Waiting for mount targets to become available..."
sleep 30

# Check if Access Point already exists
echo "🔑 Checking for existing EFS access point..."
EXISTING_AP_ID=$(aws efs describe-access-points \
  --file-system-id $FILE_SYSTEM_ID \
  --region $REGION \
  --query "AccessPoints[?Tags[?Key=='Name' && Value=='portfolio-strapi-ap']].AccessPointId | [0]" \
  --output text 2>/dev/null || echo "None")

if [ "$EXISTING_AP_ID" != "None" ] && [ -n "$EXISTING_AP_ID" ]; then
  echo "✅ Using existing EFS Access Point: $EXISTING_AP_ID"
  ACCESS_POINT_ID=$EXISTING_AP_ID
else
  echo "🔑 Creating EFS access point..."
  ACCESS_POINT_ID=$(aws efs create-access-point \
    --file-system-id $FILE_SYSTEM_ID \
    --posix-user Uid=1000,Gid=1000 \
    --root-directory "Path=/strapi,CreationInfo={OwnerUid=1000,OwnerGid=1000,Permissions=755}" \
    --tags Key=Name,Value=portfolio-strapi-ap \
    --region $REGION \
    --query 'AccessPointId' \
    --output text)
  echo "✅ EFS Access Point created: $ACCESS_POINT_ID"
fi

# Check if ecsTaskRole exists, create if not
ECS_TASK_ROLE_NAME="ecsTaskRole"
echo "🔐 Checking for existing ECS task role..."
EXISTING_ROLE=$(aws iam get-role \
  --role-name $ECS_TASK_ROLE_NAME \
  --query 'Role.RoleName' \
  --output text 2>/dev/null || echo "None")

if [ "$EXISTING_ROLE" == "None" ]; then
  echo "🔐 Creating ECS task role..."
  
  # Create trust policy for ECS tasks
  cat > ecs-trust-policy.json <<EOF
{
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
}
EOF

  aws iam create-role \
    --role-name $ECS_TASK_ROLE_NAME \
    --assume-role-policy-document file://ecs-trust-policy.json \
    --description "Role for ECS tasks to access AWS services"
  
  rm -f ecs-trust-policy.json
  echo "✅ ECS Task Role created: $ECS_TASK_ROLE_NAME"
else
  echo "✅ Using existing ECS Task Role: $ECS_TASK_ROLE_NAME"
fi

# Update IAM role policy for EFS access
echo "🔐 Updating IAM role policy for EFS access..."
cat > efs-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "elasticfilesystem:ClientMount",
        "elasticfilesystem:ClientWrite"
      ],
      "Resource": "arn:aws:elasticfilesystem:${REGION}:${ACCOUNT_ID}:file-system/${FILE_SYSTEM_ID}",
      "Condition": {
        "StringEquals": {
          "elasticfilesystem:AccessPointArn": "arn:aws:elasticfilesystem:${REGION}:${ACCOUNT_ID}:access-point/${ACCESS_POINT_ID}"
        }
      }
    }
  ]
}
EOF

aws iam put-role-policy \
  --role-name ecsTaskRole \
  --policy-name EFSAccess \
  --policy-document file://efs-policy.json

echo "✅ IAM policy updated"

# Output summary
echo ""
echo "============================================"
echo "✅ EFS Setup Complete!"
echo "============================================"
echo "File System ID: $FILE_SYSTEM_ID"
echo "Access Point ID: $ACCESS_POINT_ID"
echo "Security Group ID: $EFS_SG_ID"
echo ""
echo "Next steps:"
echo "1. Update aws/task-definition.json:"
echo "   - Replace 'fs-XXXXXXXXX' with: $FILE_SYSTEM_ID"
echo "   - Replace 'fsap-XXXXXXXXX' with: $ACCESS_POINT_ID"
echo ""
echo "2. Ensure your ECS security group allows outbound to EFS security group on port 2049"
echo "   ECS SG -> EFS SG ($EFS_SG_ID) on TCP 2049"
echo ""
echo "3. Deploy your task definition:"
echo "   ./aws/deploy.sh"
echo "============================================"

# Clean up
rm -f efs-policy.json
