.PHONY: help build-all run-local clean-containers tf-init tf-plan

help:
	@echo "  OpsControl Management Commands:"
	@echo "  make build-all    - Build Frontend (pnpm) and Backend Docker images"
	@echo "  make run-local    - Spin up the full stack using Docker Compose"
	@echo "  make tf-plan      - Show Terraform infrastructure changes"
	@echo "  make clean        - Stop containers and remove volumes"

build-all:
	@echo "Building Released Forms..."
	docker-compose build

run-local:
	@echo "Starting local development environment..."
	docker-compose up -d

tf-init:
	@echo "Initializing Terraform..."
	cd terraform && terraform init

tf-plan:
	@echo "Planning Infrastructure..."
	cd terraform && terraform plan -var-file="terraform.tfvars"

clean:
	@echo "Cleaning up..."
	docker-compose down -v