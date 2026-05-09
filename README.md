# OpsControl: Enterprise Developer Portal & GitOps Engine (V2.0)

OpsControl is a cloud-native **Internal Developer Platform (IDP)** designed to bridge the gap between application development and infrastructure orchestration. It provides a centralized control plane for triggering manual GitOps synchronizations via **ArgoCD**, monitoring cluster health, and automating complex deployment lifecycles.

---

## 🏗️ Architectural Evolution (Microservices)

Originally built as a monolith, OpsControl has evolved into a **Decoupled 3-Tier Microservices Architecture** to ensure high availability and independent scalability:

* **Presentation Tier:** Next.js 14 (App Router) served via hardened Nginx instances.
* **Application Tier:** Distributed FastAPI Microservices (Python v3.12) with Pydantic-driven type safety.
* **Data & State Tier:** (Roadmap) Persistent PostgreSQL state for deployment auditing.
* **Networking:** AWS Load Balancer Controller managing traffic via a unified **Ingress/ALB** strategy.

---

## 🛠️ Tech Stack

### **Core Infrastructure**
* **IaC:** Terraform (Modular AWS VPC, EKS, Helm, & Kubectl providers).
* **Orchestration:** Kubernetes (EKS) with Horizontal Pod Autoscaling (HPA).
* **GitOps:** ArgoCD (Utilizing the **App-of-Apps** pattern).
* **Security:** Aqua Security **Trivy** (Vulnerability Scanning) & Non-root container execution.

### **Application Layer**
* **Frontend:** Next.js 14, TypeScript, TailwindCSS, pnpm.
* **Backend:** FastAPI, Pydantic, Modular Service Architecture.
* **CI/CD:** GitHub Actions (Path-aware triggers & Automated manifest patching).

---

## 📂 Project Structure

```text
.
├── .github/workflows/        # CI/CD Pipelines (Security & GitOps Sync)
├── services/                 # Decoupled Microservices
│   ├── backend/              # Modular FastAPI Engine
│   │   ├── app/              # Core logic, Services, Schemas
│   │   └── Dockerfile        # Multi-stage Python build
│   └── frontend/             # Next.js 14 Dashboard
│       ├── Dockerfile        # Nginx-based production image
│       └── next.config.mjs   # Static export configuration
├── k8s/                      # GitOps "Source of Truth" (Kustomize)
│   ├── base/                 # Common manifests
│   └── overlays/             # Environment-specific patches (Cloud vs Local)
├── terraform/                # Infrastructure as Code (IaC)
└── Makefile                  # Developer productivity shortcuts

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
