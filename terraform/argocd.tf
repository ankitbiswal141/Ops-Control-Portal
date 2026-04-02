# 1. Install ArgoCD via Helm
resource "helm_release" "argocd" {
  name             = "argocd"
  repository       = "https://argoproj.github.io/argo-helm"
  chart            = "argo-cd"
  namespace        = "argocd"
  create_namespace = true
  version          = "5.46.7"

  # Expose ArgoCD via LoadBalancer for our Python Backend to reach it
  set {
    name  = "server.service.type"
    value = "LoadBalancer"
  }
  
  # Disable TLS for the API for easier internal communication (optional for dev)
  set {
    name  = "server.extraArgs"
    value = "{--insecure}"
  }
}

# 2. Bootstrapping the "Ops-Portal" Application
# This tells ArgoCD to watch /k8s folder immediately

data "local_file" "argocd_app" {
  filename = "${path.module}/../k8s/argocd-app.yaml"
}

resource "kubectl_manifest" "argocd_app_bootstrap" {
  provider  = kubectl.kubectl
  yaml_body = data.local_file.argocd_app.content
  
  depends_on = [helm_release.argocd]
}