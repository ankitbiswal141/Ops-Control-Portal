# OpsControl V2 Management
.PHONY: setup-infra build-local dev-logs

# Tier 1: Infrastructure
setup-infra:
	@echo "Initializing Remote State..."
	cd terraform/bootstrap && terraform init && terraform apply -auto-approve

# Tier 2: Development
build-local:
	docker-compose build
	docker-compose up -d

dev-logs:
	docker-compose logs -f

# Tier 3: Cleanup
clean:
	docker-compose down
	find . -name "*.tfstate*" -delete