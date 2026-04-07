from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    APP_NAME: str = "OpsControl API"
    ARGO_URL: str = "https://argocd-server.argocd.svc"
    ARGO_TOKEN: str = "" # Injected via K8s Secrets or Env
    
    class Config:
        env_file = ".env"

settings = Settings()