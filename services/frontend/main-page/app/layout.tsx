// services/frontend/main-page/app/layout.tsx
import "./globals.css";
import { JetBrains_Mono } from "next/font/google";

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
      <body className="bg-black text-white antialiased font-mono selection:bg-white selection:text-black">
        {/* The "Device" Frame */}
        <div className="fixed inset-0 border-[12px] border-black pointer-events-none z-50" />
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}