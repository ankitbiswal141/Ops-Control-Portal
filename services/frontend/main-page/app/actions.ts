'use server'

import webpush from 'web-push'

// These should be validated via a schema (e.g., Zod) in a real app
webpush.setVapidDetails(
  'mailto:ops-admin@example.com',
  process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
  process.env.VAPID_PRIVATE_KEY!
)

/**
 * BUG FIX: Removed the global 'let subscription' variable.
 * Server Actions are stateless. Subscriptions MUST be stored in a database.
 */

export async function subscribeUser(sub: PushSubscription) {
  // TODO: Implement Database Persistence
  // Example: await db.insert(pushSubscriptions).values({ payload: JSON.stringify(sub) })
  console.log('User subscribed:', sub)
  return { success: true }
}

export async function unsubscribeUser() {
  // TODO: Remove from Database
  // Example: await db.delete(pushSubscriptions).where(eq(pushSubscriptions.userId, currentUser.id))
  return { success: true }
}

export async function sendNotification(message: string) {
  // TODO: Fetch the subscription from your DB based on the target user
  // For demonstration, this remains a placeholder, but it must query your storage.
  
  try {
    // This would typically loop through stored subscriptions in your DB
    /*
    await webpush.sendNotification(
      storedSub,
      JSON.stringify({
        title: 'Ops Alert',
        body: message,
        icon: '/icon.png',
      })
    )
    */
    return { success: true }
  } catch (error) {
    console.error('Error sending push notification:', error)
    return { success: false, error: 'Failed to send notification' }
  }
}