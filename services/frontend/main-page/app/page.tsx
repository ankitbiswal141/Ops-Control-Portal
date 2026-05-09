'use client'

import { useState, useEffect, useTransition } from 'react'
import { subscribeUser, unsubscribeUser, sendNotification } from './actions'

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

function PushNotificationManager() {
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

  async function subscribeToPush() {
    startTransition(async () => {
      try {
        const registration = await navigator.serviceWorker.ready
        const sub = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(
            process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
          ),
        })
        setSubscription(sub)
        // Serialize properly for the Server Action
        await subscribeUser(JSON.parse(JSON.stringify(sub)))
      } catch (err) {
        console.error('Failed to subscribe:', err)
        alert('Notification permission denied or subscription failed.')
      }
    })
  }

  async function unsubscribeFromPush() {
    startTransition(async () => {
      await subscription?.unsubscribe()
      setSubscription(null)
      await unsubscribeUser()
    })
  }

  if (!isSupported) {
    return (
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-red-700">Push notifications are not supported in this browser.</p>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4">
      <h3 className="text-xl font-bold text-slate-900">Ops Control Notifications</h3>
      {subscription ? (
        <div className="space-y-4">
          <p className="text-green-600 font-medium">✓ Active Subscription</p>
          <button 
            disabled={isPending}
            onClick={unsubscribeFromPush}
            className="px-4 py-2 bg-slate-200 hover:bg-slate-300 rounded text-slate-800 disabled:opacity-50 transition"
          >
            Disable Alerts
          </button>
          <div className="flex flex-col space-y-2">
            <input
              type="text"
              placeholder="Test alert message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="border p-2 rounded"
            />
            <button 
              onClick={() => sendNotification(message)}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Send Test Alert
            </button>
          </div>
        </div>
      ) : (
        <button 
          disabled={isPending}
          onClick={subscribeToPush}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
        >
          {isPending ? 'Connecting...' : 'Enable Push Notifications'}
        </button>
      )}
    </div>
  )
}

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center">
      <PushNotificationManager />
    </main>
  )
}