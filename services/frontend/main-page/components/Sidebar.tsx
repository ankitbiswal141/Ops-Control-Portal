'use client'
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: '01. Nexus', path: '/' },
  { name: '02. Infrastructure', path: '/infra' },
  { name: '03. Logs', path: '/logs' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <nav className="fixed left-0 top-0 h-full w-20 md:w-64 border-r border-zinc-900 bg-black flex flex-col p-8 z-40">
      <div className="mb-24">
        <div className="h-8 w-8 bg-white rounded-full flex items-center justify-center">
          <div className="h-4 w-4 bg-black rounded-full" />
        </div>
      </div>
      
      <div className="flex-1 space-y-12">
        {navItems.map((item) => (
          <Link key={item.path} href={item.path} className="group block">
            <span className={`text-[10px] block mb-2 tracking-[0.3em] uppercase transition-colors ${
              pathname === item.path ? 'text-white' : 'text-zinc-600 group-hover:text-zinc-400'
            }`}>
              {item.name}
            </span>
            <div className={`h-[1px] transition-all duration-500 ${
              pathname === item.path ? 'w-full bg-white' : 'w-0 bg-zinc-800 group-hover:w-8'
            }`} />
          </Link>
        ))}
      </div>
      
      <div className="text-zinc-800 text-[8px] uppercase tracking-widest leading-loose">
        OpsControl System<br/>Build v1.0.42
      </div>
    </nav>
  );
}