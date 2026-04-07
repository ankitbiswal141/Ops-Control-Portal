# OpsControl: Enterprise Developer Portal & GitOps Engine

OpsControl is a cloud-native internal developer platform (IDP) designed to bridge the gap between application development and infrastructure management. It provides a centralized dashboard for triggering manual GitOps synchronizations via ArgoCD, monitoring cluster health, and automating deployment lifecycles.

---

## Tech Stack & Architecture

### **Core Infrastructure**
* **IaC:** Terraform (Modular AWS VPC, EKS, Helm, & Kubectl providers)
* **Orchestration:** Kubernetes (EKS)
* **GitOps:** ArgoCD (App-of-Apps pattern)
* **CI/CD:** GitHub Actions (Multi-stage Docker builds & manifest patching)

### **Application Layer**
* **Frontend:** Next.js 14 (App Router), TypeScript, TailwindCSS, pnpm
* **Backend:** FastAPI (Python v3.12), Pydantic (Type safety), Modular Service Architecture
* **Server:** Nginx (Static asset delivery for Next.js "Released Form")

---

## Project Structure
```text
.
├── .github/workflows/          # CI/CD Pipelines
├── backend/                    # Modular FastAPI Engine
│   ├── app/                    # Core logic, Services, Schemas
│   └── Dockerfile              # Multi-stage Python build  
├── frontend/main-page/         # Next.js 14 Dashboard
│   ├── Dockerfile              # Nginx-based production image
│   └── next.config.mjs         # Static export configuration
├── deployment/                 # Kubernetes & Orchestration manifests.
│   ├── cloud/                  # Cloud-specific resources (Staging/Production).
│   │   └── argocd-app.yaml     # GitOps Config: Defines the ArgoCD Application that
│   └── local/                  # Local development manifests (DockerCompose, Kind configs)
├── terraform/                  # Infrastructure as Code
└── Makefile                    # Developer shortcuts

```

---

## Getting Started

### Local Development (via Docker Compose)

Spin up the full stack locally , via Docker Compose

```bash
make build-all
make run-local
```

Access the portal at : http://localhost


### Cloud Deployment (via AWS EKS)

1. Initialize Terraform
```bash
cd terraform && terraform init
```

2. Deploy Infrastructure:
```bash
terraform apply -var-file="terraform.tfvars"
```

3. ArgoCD will automatically bootstrap the application using the k8s/argocd-app.yaml manifest.

---

## Key Features
* <b>Zero-Trust Dockerization:</b> All containers run as non-root users (appuser)
* <b>Multi-Stage Builds:</b> Minimized attack surface and production image sizes (<50MB).
* <b>Modular Backend:</b> Decoupled service layer for ArgoCD API communication.
* <b>Declarative Infrastructure:</b> 100% of the stack, including ArgoCD configuration, is defined as code.
