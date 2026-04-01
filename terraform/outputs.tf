output "argocd_loadbalancer_url" {
  description = "The URL of the ArgoCD Server"
  value       = "http://${helm_release.argocd.metadata[0].name}.elb.amazonaws.com"
}

output "eks_cluster_name" {
  value = module.eks.cluster_name
}