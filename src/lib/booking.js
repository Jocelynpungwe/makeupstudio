import { site } from '../data/site'

/**
 * Appointment REQUEST adapter. This never claims a booking is confirmed.
 *
 * Integration points (pick one, no UI changes needed):
 *   1. VITE_BOOKING_ENDPOINT   POST JSON to Formspree, Basin, Netlify Forms function, or your own API.
 *   2. Replace the body of `submitBookingRequest` with a scheduling provider call (Calendly, Acuity, Square).
 *
 * Returns { mode } so the UI can tell the truth about what happened:
 *   'sent'  the request reached your endpoint
 *   'mailto' the visitor's email app was opened with the request pre-filled
 *   'demo'  no endpoint or inbox is connected yet: nothing was sent
 */
export async function submitBookingRequest(payload) {
  const { endpoint } = site.booking

  if (endpoint) {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ ...payload, submittedAt: new Date().toISOString(), source: 'website-request-form' }),
    })
    if (!res.ok) throw new Error(`Request failed (${res.status})`)
    return { mode: 'sent' }
  }

  if (site.contact.inboxConnected) {
    const lines = [
      `Service: ${payload.serviceName}`,
      `Preferred date: ${payload.date}`,
      `Preferred time: ${payload.timeLabel}`,
      payload.addOns.length ? `Add-ons: ${payload.addOns.join(', ')}` : null,
      '',
      `Name: ${payload.name}`,
      `Email: ${payload.email}`,
      payload.phone ? `Phone: ${payload.phone}` : null,
      '',
      payload.notes || '',
    ].filter((l) => l !== null)
    const href = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Appointment request: ${payload.serviceName}`)}&body=${encodeURIComponent(lines.join('\n'))}`
    window.location.href = href
    return { mode: 'mailto' }
  }

  await new Promise((r) => setTimeout(r, 1100))
  return { mode: 'demo' }
}
