const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const PHONE = /^[+()\d][\d\s().+-]{6,}$/

export const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

/** Per-step validation. Returns { field: message }. Empty object means the step is valid. */
export function validateStep(step, d) {
  const e = {}
  if (step === 0) {
    if (!d.serviceId) e.serviceId = 'Please choose a service to continue.'
  }
  if (step === 1) {
    if (!d.date) e.date = 'Please choose a preferred date.'
    else if (d.date < todayISO()) e.date = 'Please choose today or a future date.'
    if (!d.time) e.time = 'Please choose a preferred time of day.'
  }
  if (step === 3) {
    if (d.name.trim().length < 2) e.name = 'Please enter your name.'
    if (!d.email.trim()) e.email = 'Please enter your email so we can reply.'
    else if (!EMAIL.test(d.email.trim())) e.email = 'That email address does not look right. Please check it.'
    if (d.phone.trim() && !PHONE.test(d.phone.trim())) e.phone = 'Please enter a valid phone number, or leave it blank.'
    if (d.notes.length > 600) e.notes = 'Please keep your note under 600 characters.'
    if (!d.consent) e.consent = 'Please confirm you understand this is a request, not a confirmed appointment.'
  }
  return e
}
