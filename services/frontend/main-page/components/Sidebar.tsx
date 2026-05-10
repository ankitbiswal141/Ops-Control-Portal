'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { id: '01', name: 'NEXUS', path: '/' },
  { id: '02', name: 'INFRA', path: '/infra' },
  { id: '03', name: 'LOGS', path: '/logs' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-20 md:w-64 border-r border-zinc-900 flex flex-col z-40 bg-black">
      {/* Brand Logo - Monochromatic Pulse */}
      <div className="p-8 mb-12">
        <div className="h-6 w-6 border-2 border-white flex items-center justify-center rotate-45">
          <div className="h-2 w-2 bg-white animate-pulse" />
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 px-4 space-y-8">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.path} href={item.path} className="group block">
              <div className="flex items-center gap-4">
                <span className={`text-[8px] font-bold ${isActive ? 'text-white' : 'text-zinc-700'}`}>
                  {item.id}
                </span>
                <span className={`text-xs tracking-[0.4em] transition-all duration-300 ${
                  isActive ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'
                }`}>
                  {item.name}
                </span>
              </div>
              {/* Animated underline indicator */}
              <div className={`mt-2 h-[1px] transition-all duration-700 ${
                isActive ? 'w-full bg-white' : 'w-0 bg-zinc-800 group-hover:w-4'
              }`} />
            </Link>
          );
        })}
      </nav>

      {/* System Metadata */}
      <div className="p-8">
        <div className="text-zinc-800 text-[8px] leading-loose uppercase tracking-[0.2em]">
          OS_BUILD: 1.0.42<br />
          EKS_ACTIVE: TRUE
        </div>
      </div>
    </aside>
  );
}