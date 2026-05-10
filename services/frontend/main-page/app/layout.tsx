// services/frontend/main-page/app/layout.tsx
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";
import Sidebar from '@/components/Sidebar';

const mono = JetBrains_Mono({ 
  subsets: ["latin"], 
  variable: "--font-mono",
  weight: ["400", "700", "800"] 
});

export const metadata = {
  title: "OpsControl | v1.0",
  description: "Essentialist Engineering Portal",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${mono.variable}`}>
      <body className="bg-black text-white antialiased font-mono selection:bg-white selection:text-black overflow-x-hidden">
        <div className="fixed inset-0 border-[12px] border-black pointer-events-none z-50 shadow-[inset_0_0_40px_rgba(0,0,0,0.9)]" />
        
        <div className="min-h-screen flex">
          <Sidebar />
          <div className="flex-1 flex flex-col min-w-0 relative">
            <div className="absolute top-0 left-0 w-full h-[1px] bg-zinc-800 z-10" />
            <main className="flex-1 overflow-y-auto pt-12">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  );
}