import { StatCard } from "@/components/StatCard";
import { SyncButton } from "@/components/SyncButton";
import { Activity, ShieldCheck, Zap, LayoutGrid } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="border-b border-border bg-surface/50 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <LayoutGrid className="text-brand" size={24} />
            <span className="font-bold text-lg tracking-tight">OPS-CONTROL</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-green-500"></span> 
              EKS: ACTIVE
            </span>
            <span className="border-l border-border h-4"></span>
            <span>v2.4.0-STABLE</span>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-12">
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-extrabold mb-2">Infrastructure Overview</h2>
          <p className="text-slate-500">Monitor cluster health and manage deployment lifecycles across production nodes.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <StatCard 
            label="Cluster Reliability" 
            value="99.98%" 
            subtext="Avg. uptime over last 30 days" 
            icon={<Zap size={18}/>}
            trendColor="text-emerald-400"
          />
          <StatCard 
            label="Active Deployments" 
            value="42" 
            subtext="Running pods across 3 namespaces" 
            icon={<Activity size={18}/>}
            trendColor="text-brand"
          />
          <StatCard 
            label="Security Posture" 
            value="SECURE" 
            subtext="Latest Trivy scan: 0 critical vulnerabilities" 
            icon={<ShieldCheck size={18}/>}
            trendColor="text-purple-400"
          />
        </div>

        {/* Management Console */}
        <div className="bg-surface border border-border rounded-2xl p-8 md:p-12">
          <div className="max-w-3xl">
            <h3 className="text-2xl font-bold mb-4">Manual GitOps Reconciliation</h3>
            <p className="text-slate-400 text-lg mb-8 leading-relaxed">
              Use this control to force an immediate synchronization between the GitHub repository 
              and the Kubernetes cluster state via ArgoCD. Use primarily for emergency patches or 
              bypassing standard polling intervals.
            </p>
            <SyncButton />
          </div>
        </div>
      </main>
    </div>
  );
}