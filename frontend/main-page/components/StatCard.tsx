import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
  subtext: string;
  icon: React.ReactNode;
  trendColor: string;
}

export const StatCard = ({ label, value, subtext, icon, trendColor }: StatCardProps) => (
  <div className="bg-surface border border-border p-5 rounded-xl shadow-sm transition-all hover:border-slate-700">
    <div className="flex items-center gap-3 text-slate-400 text-xs font-bold tracking-widest uppercase mb-4">
      <span className="p-2 bg-slate-800 rounded-lg text-blue-400">{icon}</span>
      {label}
    </div>
    <div className={`text-3xl font-mono font-bold ${trendColor} mb-1`}>
      {value}
    </div>
    <div className="text-slate-500 text-xs">{subtext}</div>
  </div>
);