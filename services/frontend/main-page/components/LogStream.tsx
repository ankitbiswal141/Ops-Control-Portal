'use client'
import { useState, useEffect } from 'react';

export default function LogStream() {
  const [logs, setLogs] = useState<{id: number, msg: string, time: string}[]>([]);

  // Simulate incoming GitOps logs
  useEffect(() => {
    const messages = [
      "Initializing EKS Handshake...",
      "Fetching manifests from /deployment/cloud",
      "ArgoCD Sync triggered for 'ops-control-system'",
      "Pod 'ops-backend-7f89' health check: PASSED",
      "Network Load Balancer state: ACTIVE"
    ];

    const interval = setInterval(() => {
      setLogs(prev => [
        { id: Date.now(), msg: messages[Math.floor(Math.random() * messages.length)], time: new Date().toLocaleTimeString() },
        ...prev.slice(0, 14)
      ]);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="border border-zinc-900 bg-zinc-950 p-4 font-mono text-[10px] h-[400px] overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-8 bg-gradient-to-b from-zinc-950 to-transparent z-10" />
      <div className="space-y-2 opacity-80">
        {logs.map((log) => (
          <div key={log.id} className="flex gap-4 border-l border-zinc-800 pl-4 hover:border-white transition-colors">
            <span className="text-zinc-600">[{log.time}]</span>
            <span className="text-zinc-300 uppercase tracking-tight">{log.msg}</span>
          </div>
        ))}
      </div>
    </div>
  );
}