'use client'

import { useState, useEffect, useTransition } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from './actions'

// Utility remains the same, but the UI evolves
function urlBase64ToUint8Array(base64String: string) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/')
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export default function OpsControlPortal() {
  const [isSupported, setIsSupported] = useState(false)
  const [subscription, setSubscription] = useState<PushSubscription | null>(null)
  const [message, setMessage] = useState('')
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true)
      registerServiceWorker()
    }
  }, [])

  async function registerServiceWorker() {
    try {
      const registration = await navigator.serviceWorker.register('/sw.js', {
        scope: '/',
        updateViaCache: 'none',
      })
      const sub = await registration.pushManager.getSubscription()
      setSubscription(sub)
    } catch (err) {
      console.error('Service Worker registration failed:', err)
    }
  }

  async function handleSubscribe() {
    startTransition(async () => {
      try {
        const registration = await navigator.serviceWorker.ready
        const sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
        })
        setSubscription(sub)
        await subscribeUser(JSON.parse(JSON.stringify(sub)))
      } catch (err) {
        console.error('Subscription failed:', err)
      }
    })
  }

  return (
    <main className="min-h-screen bg-black text-white p-6 font-mono selection:bg-white selection:text-black">
      {/* Header - Jobs Philosophy: Bold Branding */}
      <header className="max-w-4xl mx-auto pt-12 pb-24">
        <h1 className="text-5xl font-black tracking-tighter uppercase mb-2">OpsControl<span className="text-zinc-600">.io</span></h1>
        <div className="flex items-center gap-4 text-[10px] tracking-[0.3em] text-zinc-500 uppercase">
          <span>Status: {subscription ? 'Linked' : 'Disconnected'}</span>
          <span className="h-1 w-1 bg-zinc-800 rounded-full" />
          <span>EKS: Us-East-2</span>
        </div>
      </header>

      <section className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Connection Card - Nothing Aesthetic */}
        <div className="border border-zinc-800 p-8 bg-zinc-950/50 backdrop-blur-md relative group hover:border-white transition-colors duration-700">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-12">01 / Connection</h2>
          
          {!isSupported ? (
            <p className="text-red-500 text-xs">System Incompatibility: Push Unvailable</p>
          ) : subscription ? (
            <div className="space-y-8">
              <p className="text-2xl font-light tracking-tight">Telemetry active.</p>
              <button 
                onClick={() => {
                   subscription?.unsubscribe();
                   setSubscription(null);
                   unsubscribeUser();
                }}
                className="text-[10px] uppercase tracking-widest text-zinc-500 hover:text-white transition-colors underline underline-offset-4"
              >
                Terminate Link
              </button>
            </div>
          ) : (
            <button 
              onClick={handleSubscribe}
              disabled={isPending}
              className="w-full py-4 border border-white bg-white text-black font-bold uppercase text-xs tracking-widest hover:bg-black hover:text-white transition-all duration-300"
            >
              {isPending ? 'Syncing...' : 'Establish Pulse'}
            </button>
          )}
        </div>

        {/* Messaging Card */}
        <div className="border border-zinc-800 p-8 bg-zinc-950/50 backdrop-blur-md relative group hover:border-white transition-colors duration-700">
          <h2 className="text-xs font-bold uppercase tracking-widest text-zinc-500 mb-12">02 / Signal Test</h2>
          
          <div className="flex flex-col space-y-6">
            <input
              type="text"
              placeholder="Signal payload..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="bg-transparent border-b border-zinc-800 py-2 focus:border-white outline-none transition-colors text-sm"
            />
            <button 
              onClick={() => sendNotification(message)}
              className="text-left text-xs uppercase tracking-[0.2em] font-bold text-zinc-400 hover:text-white transition-colors"
            >
              — Trigger Alert
            </button>
          </div>
        </div>

      </section>

      {/* Footer Decoration */}
      <footer className="fixed bottom-8 left-8">
        <p className="text-[10px] text-zinc-800 uppercase tracking-widest rotate-90 origin-left">
          Experimental Build // 2026
        </p>
      </footer>
    </main>
  )
}