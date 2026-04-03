resource "kubernetes_secret" "backend_secret" {
  metadata {
    name      = "argo-secrets"
    namespace = "argocd"
  }

  data = {
    ARGOCD_AUTH_TOKEN = var.argo_token 
  }

  # Wait for Helm to create the 'argocd' namespace first!
  depends_on = [helm_release.argocd]
}