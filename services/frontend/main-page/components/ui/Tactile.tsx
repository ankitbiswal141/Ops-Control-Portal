// services/frontend/main-page/components/ui/Tactile.tsx
export const Card = ({ title, children, status }: any) => (
  <div className="border border-[#262626] bg-black p-6 relative group hover:border-white transition-colors duration-500">
    <div className="flex justify-between items-start mb-8">
      <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#666] group-hover:text-white transition-colors">
        {title}
      </h3>
      <div className={`h-2 w-2 rounded-full ${status === 'healthy' ? 'bg-white' : 'bg-[#ff0000]'} animate-pulse`} />
    </div>
    {children}
  </div>
);

export const TactileButton = ({ onClick, label, loading }: any) => (
  <button 
    onClick={onClick}
    disabled={loading}
    className="w-full py-4 border border-white bg-white text-black font-black uppercase tracking-tighter hover:bg-black hover:text-white transition-all active:scale-[0.98] disabled:opacity-50"
  >
    {loading ? "Processing..." : label}
  </button>
);