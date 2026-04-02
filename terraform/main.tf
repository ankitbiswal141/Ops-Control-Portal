terraform {
  backend "s3" {
    bucket         = "my-terraform-state-bucket" # Create this manually once
    key            = "ops-portal/terraform.tfstate"
    region         = "us-east-1"
    dynamodb_table = "terraform-lock"            # Optional: Prevents concurrent runs
  }

  required_providers {
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = ">= 1.14.0"
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.0"
    }
    helm = {
      source  = "hashicorp/helm"
      version = "~> 2.0"
    }
  }
}

provider "aws" {
  region = var.aws_region
}