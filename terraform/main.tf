terraform {
  required_providers {
    kubectl = {
      source  = "gavinbunney/kubectl"
      version = ">= 1.14.0" # Or your preferred version
    }
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }
}