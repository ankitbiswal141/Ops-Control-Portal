resource "kubernetes_secret" "backend_secret" {
  metadata {
    name      = "argo-secrets"
    namespace = "argocd"
  }

  data = {
    ARGOCD_AUTH_TOKEN = var.argo_token 
  }
  
  depends_on = [helm_release.argocd]
}

resource "helm_release" "argocd" {
  name             = "argocd"
  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  namespace        = "argocd"
  create_namespace = true
  version          = "5.46.7"
  wait             = true
  timeout          = 600

  depends_on = [module.eks]

  set {
    name  = "server.service.type"
    value = "LoadBalancer"
  }
  
  set {
    name  = "server.extraArgs"
    value = "{--insecure}"
  }
}