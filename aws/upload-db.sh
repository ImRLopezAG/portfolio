#!/bin/bash
set -e

export AWS_PAGER=""

REGION="us-east-1"
CLUSTER_NAME="portfolio-cluster"
SERVICE_NAME="portfolio-api-service"
LOCAL_DB_PATH="apps/api/.tmp/data.db"

echo "📦 Uploading local database to production EFS..."

# Check if local database exists
if [ ! -f "$LOCAL_DB_PATH" ]; then
  echo "❌ Local database not found at: $LOCAL_DB_PATH"
  exit 1
fi

ACCOUNT_ID=$(aws sts get-caller-identity --query Account --output text)
S3_BUCKET="portfolio-db-transfer-${ACCOUNT_ID}"

# Create S3 bucket
echo "🪣 Creating S3 bucket: $S3_BUCKET"
aws s3 mb "s3://$S3_BUCKET" --region $REGION 2>/dev/null || true

# Make bucket public temporarily for easy access
echo "🔓 Configuring bucket for transfer..."
aws s3api put-public-access-block \
  --bucket $S3_BUCKET \
  --public-access-block-configuration "BlockPublicAcls=false,IgnorePublicAcls=false,BlockPublicPolicy=false,RestrictPublicBuckets=false" \
  --region $REGION

# Upload the database
echo "⬆️  Uploading database to S3..."
aws s3 cp "$LOCAL_DB_PATH" "s3://$S3_BUCKET/data.db" --acl public-read

S3_URL="https://${S3_BUCKET}.s3.${REGION}.amazonaws.com/data.db"
echo "✅ Database uploaded to: $S3_URL"

# Get the running task
TASK_ARN=$(aws ecs list-tasks \
  --cluster $CLUSTER_NAME \
  --service-name $SERVICE_NAME \
  --region $REGION \
  --query 'taskArns[0]' \
  --output text)

# Get ENI and public IP
ENI_ID=$(aws ecs describe-tasks \
  --cluster $CLUSTER_NAME \
  --tasks $TASK_ARN \
  --region $REGION \
  --query 'tasks[0].attachments[0].details[?name==`networkInterfaceId`].value' \
  --output text)

PUBLIC_IP=$(aws ec2 describe-network-interfaces \
  --network-interface-ids $ENI_ID \
  --region $REGION \
  --query 'NetworkInterfaces[0].Association.PublicIp' \
  --output text)

echo ""
echo "============================================"
echo "📋 Manual Steps Required"
echo "============================================"
echo ""
echo "The database has been uploaded to S3."
echo ""
echo "To copy it to the container, you need to:"
echo ""
echo "1. SSH into the container or use docker exec"
echo "   (ECS Exec requires additional setup)"
echo ""
echo "2. Or restart the service with the database baked into the image"
echo ""
echo "3. Or use this workaround - call the Strapi API to trigger a download:"
echo ""
echo "   curl -X POST http://$PUBLIC_IP:1337/api/admin/transfer/token"
echo ""
echo "============================================"
echo ""
echo "🧹 To clean up the S3 bucket after you're done:"
echo "   aws s3 rm s3://$S3_BUCKET/data.db"
echo "   aws s3 rb s3://$S3_BUCKET"
echo ""
echo "S3 URL: $S3_URL"
echo "============================================"
