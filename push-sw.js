/*
 * Push handlers for the generated service worker.
 *
 * vite-plugin-pwa generates the worker (precaching, auto-update) and pulls this
 * file in with `importScripts`, so the app keeps Workbox's own update logic and
 * only gains the two events push needs. Plain JS, not bundled: it runs inside
 * the worker exactly as written.
 *
 * The payload comes from the `send-reminders` Edge Function as
 * { title, body, url, tag }. Every field is optional, so a push with an empty
 * body still shows a sensible Hebrew reminder.
 */

self.addEventListener('push', (event) => {
  let data = {}
  try {
    data = event.data ? event.data.json() : {}
  } catch {
    data = { body: event.data ? event.data.text() : undefined }
  }

  event.waitUntil(
    self.registration.showNotification(data.title || 'Wellbeing', {
      body: data.body || 'איך את/ה מרגיש/ה היום? הדיווח לוקח חצי דקה.',
      icon: 'icon-192.png',
      badge: 'icon-192.png',
      lang: 'he',
      dir: 'rtl',
      // One reminder at a time: a newer one replaces an unread older one.
      tag: data.tag || 'checkin-reminder',
      data: { url: data.url || './#/checkin' },
    }),
  )
})

self.addEventListener('notificationclick', (event) => {
  event.notification.close()
  const target = new URL(
    (event.notification.data && event.notification.data.url) || './#/checkin',
    self.registration.scope,
  ).href

  // Reuse an open app window when there is one, rather than stacking tabs.
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((windows) => {
      for (const client of windows) {
        if ('focus' in client) {
          if ('navigate' in client) client.navigate(target)
          return client.focus()
        }
      }
      return self.clients.openWindow(target)
    }),
  )
})
