import requests
from app.core.config import settings

class ArgoService:
    @staticmethod
    def sync_application(app_name: str):
        """Logic to communicate with ArgoCD REST API"""
        url = f"{settings.ARGO_URL}/api/v1/applications/{app_name}/sync"
        headers = {"Authorization": f"Bearer {settings.ARGO_TOKEN}"}
        
        try:
            response = requests.post(url, headers=headers, timeout=10, verify=False)
            response.raise_for_status()
            return response.json()
        except requests.exceptions.RequestException as e:
            # We log this or raise a custom exception
            raise Exception(f"ArgoCD Sync Failed: {str(e)}")