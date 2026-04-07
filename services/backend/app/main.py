from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from app.schemas import SyncRequest, SyncResponse
from app.services.argo_service import ArgoService

app = FastAPI(title="OpsControl Backend")

# Standard CORS setup for Next.js
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/v1/sync", response_model=SyncResponse)
async def trigger_sync(payload: SyncRequest):
    try:
        result = ArgoService.sync_application(payload.app_name)
        return SyncResponse(
            status="SUCCESS",
            message=f"Sync initiated for {payload.app_name}",
            operation_id=result.get("metadata", {}).get("uid")
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))