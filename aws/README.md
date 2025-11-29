# AWS ECS Deployment Guide

This guide will help you deploy the portfolio API (Strapi CMS) to AWS ECS using the Docker image from GitHub Container Registry.

## Prerequisites

1. AWS CLI installed and configured
2. AWS Account with appropriate permissions
3. Docker image published to GHCR (`ghcr.io/imrlopez/portfolio-api`)

## Setup Steps

### 1. Create GitHub Personal Access Token for GHCR

Since GHCR is a private registry, ECS needs credentials to pull the image.

1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `read:packages` scope
3. Copy the token value

### 2. Store GitHub Token in AWS Secrets Manager

```bash
aws secretsmanager create-secret \
  --name github/ghcr-token \
  --description "GitHub Container Registry PAT" \
  --secret-string '{"username":"imrlopez","password":"YOUR_GITHUB_TOKEN"}' \
  --region us-east-1
```

### 3. Store Strapi Secrets in AWS Secrets Manager

Generate random secrets for Strapi:

```bash
# Generate secrets (you can use openssl or any secure random generator)
APP_KEYS=$(openssl rand -base64 32)
API_TOKEN_SALT=$(openssl rand -base64 32)
ADMIN_JWT_SECRET=$(openssl rand -base64 32)
TRANSFER_TOKEN_SALT=$(openssl rand -base64 32)
JWT_SECRET=$(openssl rand -base64 32)

# Store in AWS Secrets Manager
aws secretsmanager create-secret --name portfolio/strapi-APP_KEYS --secret-string "$APP_KEYS" --region us-east-1
aws secretsmanager create-secret --name portfolio/strapi-API_TOKEN_SALT --secret-string "$API_TOKEN_SALT" --region us-east-1
aws secretsmanager create-secret --name portfolio/strapi-ADMIN_JWT_SECRET --secret-string "$ADMIN_JWT_SECRET" --region us-east-1
aws secretsmanager create-secret --name portfolio/strapi-TRANSFER_TOKEN_SALT --secret-string "$TRANSFER_TOKEN_SALT" --region us-east-1
aws secretsmanager create-secret --name portfolio/strapi-JWT_SECRET --secret-string "$JWT_SECRET" --region us-east-1
```

### 4. Create IAM Roles

#### ECS Task Execution Role

```bash
# Create trust policy
cat > ecs-task-execution-trust-policy.json <<EOF
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

# Create role
aws iam create-role \
  --role-name ecsTaskExecutionRole \
  --assume-role-policy-document file://ecs-task-execution-trust-policy.json

# Attach AWS managed policy
aws iam attach-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-arn arn:aws:iam::aws:policy/service-role/AmazonECSTaskExecutionRolePolicy

# Create custom policy for secrets access
cat > ecs-secrets-policy.json <<EOF
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Action": [
        "secretsmanager:GetSecretValue"
      ],
      "Resource": [
        "arn:aws:secretsmanager:us-east-1:*:secret:portfolio/strapi-*",
        "arn:aws:secretsmanager:us-east-1:*:secret:github/ghcr-token*"
      ]
    }
  ]
}
EOF

aws iam put-role-policy \
  --role-name ecsTaskExecutionRole \
  --policy-name SecretsAccess \
  --policy-document file://ecs-secrets-policy.json
```

#### ECS Task Role

```bash
# Create task role (for application permissions)
aws iam create-role \
  --role-name ecsTaskRole \
  --assume-role-policy-document file://ecs-task-execution-trust-policy.json
```

### 5. Create CloudWatch Log Group

```bash
aws logs create-log-group \
  --log-group-name /ecs/portfolio-api \
  --region us-east-1
```

### 6. Create EFS for Persistent Storage

⚠️ **Important**: This step is required for database persistence across deployments.

#### Option A: Automated Setup (Recommended)

1. Edit `aws/setup-efs.sh` and update:
   - `VPC_ID`: Your VPC ID
   - `SUBNET_IDS`: Your subnet IDs (at least 2 in different AZs)
   - `REGION`: Your AWS region

2. Run the script:
```bash
chmod +x aws/setup-efs.sh
./aws/setup-efs.sh
```

The script will output the File System ID and Access Point ID.

#### Option B: Manual Setup

```bash
# Create EFS file system
FILE_SYSTEM_ID=$(aws efs create-file-system \
  --performance-mode generalPurpose \
  --throughput-mode bursting \
  --encrypted \
  --tags Key=Name,Value=portfolio-strapi-data \
  --region us-east-1 \
  --query 'FileSystemId' \
  --output text)

# Create security group for EFS
EFS_SG_ID=$(aws ec2 create-security-group \
  --group-name portfolio-efs-sg \
  --description "Security group for Strapi EFS" \
  --vpc-id vpc-xxxxx \
  --region us-east-1 \
  --query 'GroupId' \
  --output text)

# Allow NFS traffic (port 2049)
aws ec2 authorize-security-group-ingress \
  --group-id $EFS_SG_ID \
  --protocol tcp \
  --port 2049 \
  --source-group YOUR_ECS_SECURITY_GROUP_ID \
  --region us-east-1

# Create mount targets in each subnet
for SUBNET_ID in subnet-xxxxx subnet-yyyyy; do
  aws efs create-mount-target \
    --file-system-id $FILE_SYSTEM_ID \
    --subnet-id $SUBNET_ID \
    --security-groups $EFS_SG_ID \
    --region us-east-1
done

# Create access point
ACCESS_POINT_ID=$(aws efs create-access-point \
  --file-system-id $FILE_SYSTEM_ID \
  --posix-user Uid=1000,Gid=1000 \
  --root-directory "Path=/strapi,CreationInfo={OwnerUid=1000,OwnerGid=1000,Permissions=755}" \
  --tags Key=Name,Value=portfolio-strapi-ap \
  --region us-east-1 \
  --query 'AccessPointId' \
  --output text)

echo "File System ID: $FILE_SYSTEM_ID"
echo "Access Point ID: $ACCESS_POINT_ID"
```

### 7. Update Task Definition

Edit `aws/task-definition.json` and replace:
- `YOUR_ACCOUNT_ID` with your AWS account ID
- `REGION` with your AWS region (e.g., `us-east-1`)
- `fs-XXXXXXXXX` with your EFS File System ID
- `fsap-XXXXXXXXX` with your EFS Access Point ID
- Adjust CPU/memory as needed

### 8. Create ECS Cluster

```bash
aws ecs create-cluster \
  --cluster-name portfolio-cluster \
  --region us-east-1
```

### 9. Create VPC Resources (if needed)

If you don't have a VPC with public subnets, create one or note your existing VPC/subnet IDs.

### 10. Create Application Load Balancer (Optional but recommended)

```bash
# Create ALB
aws elbv2 create-load-balancer \
  --name portfolio-alb \
  --subnets subnet-xxxxx subnet-yyyyy \
  --security-groups sg-xxxxx \
  --region us-east-1

# Create target group
aws elbv2 create-target-group \
  --name portfolio-api-tg \
  --protocol HTTP \
  --port 1337 \
  --vpc-id vpc-xxxxx \
  --target-type ip \
  --health-check-path /_health \
  --region us-east-1

# Create listener
aws elbv2 create-listener \
  --load-balancer-arn arn:aws:elasticloadbalancing:... \
  --protocol HTTP \
  --port 80 \
  --default-actions Type=forward,TargetGroupArn=arn:aws:elasticloadbalancing:...
```

### 11. Create ECS Service

```bash
aws ecs create-service \
  --cluster portfolio-cluster \
  --service-name portfolio-api-service \
  --task-definition portfolio-api \
  --desired-count 1 \
  --launch-type FARGATE \
  --network-configuration "awsvpcConfiguration={subnets=[subnet-xxxxx,subnet-yyyyy],securityGroups=[sg-xxxxx],assignPublicIp=ENABLED}" \
  --load-balancers "targetGroupArn=arn:aws:elasticloadbalancing:...,containerName=portfolio-api,containerPort=1337" \
  --region us-east-1
```

## Deployment

Once setup is complete, deploy updates using:

```bash
chmod +x aws/deploy.sh
./aws/deploy.sh
```

Or manually:

```bash
# Register task definition
aws ecs register-task-definition \
  --cli-input-json file://aws/task-definition.json \
  --region us-east-1

# Update service
aws ecs update-service \
  --cluster portfolio-cluster \
  --service portfolio-api-service \
  --force-new-deployment \
  --region us-east-1
```

## CI/CD Integration

Add this to your GitHub Actions workflow to automatically deploy on push:

```yaml
- name: Deploy to ECS
  env:
    AWS_REGION: us-east-1
  run: |
    aws ecs update-service \
      --cluster portfolio-cluster \
      --service portfolio-api-service \
      --force-new-deployment
```

## Database Considerations

✅ **SQLite with EFS**: The task definition is configured to mount an EFS volume at `/usr/src/app/.tmp` where the SQLite database (`data.db`) is stored. This provides:
- **Persistence**: Data survives container restarts and redeployments
- **Encryption**: Data is encrypted at rest and in transit
- **Backups**: EFS provides automatic backups

### Alternative: Use RDS (PostgreSQL/MySQL)

For higher scalability and multiple concurrent tasks, consider using RDS:

1. Create RDS instance
2. Add environment variable to task definition:
```json
{
  "name": "DATABASE_CLIENT",
  "value": "postgres"
}
```
3. Add database connection secrets to Secrets Manager
4. Reference them in task definition secrets section

## Monitoring

View logs:
```bash
aws logs tail /ecs/portfolio-api --follow --region us-east-1
```

## Costs Estimate

- **ECS Fargate**: ~$15-20/month (0.5 vCPU, 1GB RAM, 24/7)
- **EFS**: ~$0.30/GB/month (standard storage) + data transfer
- **ALB**: ~$16/month + data processing
- **NAT Gateway** (if private subnets): ~$32/month
- **Secrets Manager**: ~$0.40/secret/month (~$2.40 total)
- **CloudWatch Logs**: ~$0.50/GB ingested

**Total estimated cost**: ~$20-40/month (without NAT Gateway)

## Troubleshooting

### Task fails to start
- Check CloudWatch logs: `aws logs tail /ecs/portfolio-api --follow`
- Verify IAM role permissions
- Ensure secrets exist in Secrets Manager
- Check security group allows traffic

### Cannot pull image
- Verify GitHub token has `read:packages` permission
- Check `repositoryCredentials` ARN is correct
- Ensure secret format is: `{"username":"xxx","password":"xxx"}`

### Health check failures
- Verify Strapi exposes `/_health` endpoint
- Check security groups allow internal health checks
- Increase `startPeriod` if app takes longer to start
