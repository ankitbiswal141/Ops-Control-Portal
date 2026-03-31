from pydantic import BaseModel
from typing import Optional

class SyncRequest(BaseModel):
    app_name: str = "notification-engine" # The app name in ArgoCD
    revision: Optional[str] = "HEAD"

class SyncResponse(BaseModel):
    status: str
    message: str
    operation_id: Optional[str] = None