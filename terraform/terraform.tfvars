# AWS Infrastructure Configuration
aws_region   = "us-east-1"
project_name = "ops-control-portal"

# EKS Cluster Settings
cluster_version = "1.27"

# Instance type -> Recommended at least 8gb of RAM for smooth experience
instance_types  = ["Replace this with your instance type"]
node_count      = 2

# ArgoCD Configuration
# These match the values in your k8s/argocd-app.yaml
argocd_namespace = "argocd"
repo_url         = "https://github.com/your-username/ops-control-portal.git"