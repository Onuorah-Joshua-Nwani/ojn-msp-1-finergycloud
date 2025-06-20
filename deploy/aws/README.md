# AWS Microservices Deployment

This directory outlines how to deploy the FinergyCloud project on AWS using a microservices approach.

## Architecture
- **Backend**: Flask app containerized and deployed on AWS Fargate.
- **Frontend**: React app served from a separate container on Fargate or from an S3 bucket with CloudFront.
- **Database**: PostgreSQL provided by Amazon RDS.

An Application Load Balancer routes traffic to the backend and frontend services. Each component can scale independently.

## Steps
1. Build and push Docker images to Amazon Elastic Container Registry (ECR).
2. Create an ECS cluster with Fargate capacity.
3. Define separate task definitions and services for the backend and frontend.
4. Configure an RDS PostgreSQL instance and expose `DATABASE_URL` to the backend task.
5. Use an Application Load Balancer to route requests to the appropriate service.

This approach allows the project to grow by adding more microservices as needed without impacting existing components.
