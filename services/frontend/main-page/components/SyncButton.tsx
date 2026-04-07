"use client";
import { useState } from 'react';
import { RefreshCw } from 'lucide-react';

export const SyncButton = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/sync`, {
        method: 'POST',
      });
      if (!response.ok) throw new Error("Sync Failed");
      alert("Success: ArgoCD Reconciliation Triggered");
    } catch (err) {
      console.error(err);
      alert("Error: Backend Unreachable (Check Python API)");
    } finally {
      setIsSyncing(false);
    }
  };

  return (
    <button
      onClick={handleSync}
      disabled={isSyncing}
      className="flex items-center gap-2 bg-brand hover:bg-blue-600 disabled:bg-slate-700 text-white font-bold py-3 px-8 rounded-lg transition-all active:scale-95"
    >
      <RefreshCw className={`${isSyncing ? 'animate-spin' : ''}`} size={20} />
      {isSyncing ? "COMMUNICATING..." : "FORCE GITOPS SYNC"}
    </button>
  );
};