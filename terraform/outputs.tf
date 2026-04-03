output "argocd_loadbalancer_url" {
  description = "The URL of the ArgoCD Server"
  value       = "http://${helm_release.argocd.metadata[0].name}.elb.amazonaws.com"
}

output "cluster_name" {
  value = module.eks.cluster_name
}

output "argocd_url" {
  value = data.kubernetes_service.argocd_server.status[0].load_balancer[0].ingress[0].hostname
}

data "kubernetes_service" "argocd_server" {
  metadata {
    name      = "argocd-server"
    namespace = "argocd"
  }
  depends_on = [helm_release.argocd]
}