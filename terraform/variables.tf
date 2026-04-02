variable "aws_region" {
  type    = string
  default = "us-east-2"
}

variable "project_name" {
  type    = string
  default = "ops-control-portal"
}

variable "cluster_version" {
  type    = string
  default = "1.30"
}

variable "instance_types" {
  type    = list(string)
  default = ["m7i-flex.large"]
}

variable "node_count" {
  type    = number
  default = 2
}

variable "argocd_namespace" {
  type    = string
  default = "argocd"
}

variable "repo_url" {
  type        = string
  description = "https://github.com/ankitbiswal141/Ops-Control-Portal.git"
}