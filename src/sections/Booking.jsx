import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Clock, LoaderCircle, Mail, MapPin, Phone } from 'lucide-react'
import { site } from '../data/site'
import { addOns, services, timePreferences } from '../data/services'
import { collections } from '../data/content'
import { submitBookingRequest } from '../lib/booking'
import { useBookingSelection } from '../lib/bookingStore'
import { todayISO, validateStep } from '../lib/validation'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'

const STEPS = ['Service', 'When', 'Extras', 'Details', 'Review']

const OPTIONS = [
  ...services.map((s) => ({ id: s.id, name: s.name, note: s.short })),
  ...collections.map((c) => ({ id: `collection-${c.id}`, name: c.name, note: 'Signature collection' })),
]

const blank = { serviceId: '', date: '', time: '', addOns: [], name: '', email: '', phone: '', notes: '', consent: false, website: '' }

function Field({ id, label, error, hint, optional, children }) {
  return (
    <div>
      <label htmlFor={id} className="eyebrow mb-2 flex items-baseline justify-between !text-[0.66rem] text-espresso">
        <span>{label}</span>
        {optional && <span className="normal-case tracking-normal text-ink-soft">Optional</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-2 text-[0.8rem] text-ink-soft">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-2 text-[0.84rem] font-medium text-[#8a2e3d]">
          <span aria-hidden="true">•</span> {error}
        </p>
      )}
    </div>
  )
}

const inputCls = 'w-full border-0 border-b border-espresso/35 bg-transparent px-0 py-3 text-[1.05rem] text-espresso placeholder:text-ink-soft/60 transition-colors focus:border-burgundy focus:outline-none focus:ring-0 aria-[invalid=true]:border-[#8a2e3d]'

export default function Booking() {
  const [step, setStep] = useState(0)
  const [d, setD] = useState(blank)
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [result, setResult] = useState(null)
  const headingRef = useRef(null)
  const formRef = useRef(null)
  const mounted = useRef(false)
  const selection = useBookingSelection()

  const set = (patch) => setD((cur) => ({ ...cur, ...patch }))
  const service = OPTIONS.find((o) => o.id === d.serviceId)
  const timeLabel = timePreferences.find((t) => t.id === d.time)?.label ?? ''

  // "Request this service" buttons elsewhere on the page pre-select here and move straight to "When"
  useEffect(() => {
    if (!selection.nonce) return
    setStatus('idle')
    if (selection.serviceId) {
      set({ serviceId: selection.serviceId })
      setStep(1)
    } else setStep(0)
    setErrors({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selection.nonce])

  // move focus to the new step's heading (not on first paint) so keyboard and screen reader users follow along
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true
      return
    }
    headingRef.current?.focus({ preventScroll: true })
  }, [step, status])

  const next = () => {
    const e = validateStep(step, d)
    setErrors(e)
    if (Object.keys(e).length) {
      requestAnimationFrame(() => formRef.current?.querySelector('[aria-invalid="true"], [data-invalid="true"]')?.focus())
      return
    }
    setStep((s) => Math.min(STEPS.length - 1, s + 1))
  }
  const back = () => {
    setErrors({})
    setStep((s) => Math.max(0, s - 1))
  }

  const submit = async (ev) => {
    ev.preventDefault()
    if (step < STEPS.length - 1) return next()
    // re-validate everything the visitor entered before sending
    for (const s of [0, 1, 3]) {
      const e = validateStep(s, d)
      if (Object.keys(e).length) {
        setErrors(e)
        setStep(s)
        return
      }
    }
    if (d.website) return setStatus('success') // honeypot: bots get a silent dead end
    setStatus('submitting')
    try {
      const res = await submitBookingRequest({
        serviceId: d.serviceId,
        serviceName: service?.name ?? '',
        date: d.date,
        time: d.time,
        timeLabel,
        addOns: d.addOns.map((id) => addOns.find((a) => a.id === id)?.label).filter(Boolean),
        name: d.name.trim(),
        email: d.email.trim(),
        phone: d.phone.trim(),
        notes: d.notes.trim(),
      })
      setResult(res)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setD(blank)
    setStep(0)
    setErrors({})
    setStatus('idle')
    setResult(null)
  }

  const prettyDate = useMemo(() => (d.date ? new Date(`${d.date}T12:00:00`).toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : ''), [d.date])
  const err = (k) => errors[k]
  const describe = (k, hint) => [err(k) ? `${k}-error` : null, hint && !err(k) ? `${k}-hint` : null].filter(Boolean).join(' ') || undefined

  return (
    <section id="booking" aria-labelledby="booking-title" className="relative bg-champagne-soft section-pad">
      <div className="container-wide">
        <div className="grid gap-x-16 gap-y-16 lg:grid-cols-12">
          {/* left: the promise */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading number="10" eyebrow="Appointments" id="booking-title" size="display-lg" lede="Tell us what you have in mind. This is an appointment request, not an instant booking: we reply to confirm availability, timing and details.">
                Request your <em className="italic-accent text-rose-ink">appointment.</em>
              </SectionHeading>

              <Reveal as="ol" stagger={0.1} className="mt-12 max-w-md space-y-5 border-t border-burgundy/25 pt-8">
                {['Send your request in a few quick steps.', `We reply ${site.contact.replyTime} to confirm availability and your estimated time.`, 'Your appointment is only confirmed once we have replied.'].map((t, i) => (
                  <li key={t} className="flex gap-5 text-[0.98rem] leading-snug text-ink-soft">
                    <span className="eyebrow mt-0.5 text-gold-ink">0{i + 1}</span>
                    {t}
                  </li>
                ))}
              </Reveal>

              <Reveal id="contact" className="mt-12 space-y-4 text-[0.95rem]">
                <a href={`mailto:${site.contact.email}`} className="link-underline inline-flex items-center gap-3 text-espresso">
                  <Mail className="h-4 w-4 text-gold-ink" strokeWidth={1.5} aria-hidden="true" /> {site.contact.email}
                </a>
                <br />
                <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`} className="link-underline inline-flex items-center gap-3 text-espresso">
                  <Phone className="h-4 w-4 text-gold-ink" strokeWidth={1.5} aria-hidden="true" /> {site.contact.phone}
                </a>
                <p className="flex items-start gap-3 text-ink-soft">
                  <MapPin className="mt-1 h-4 w-4 shrink-0 text-gold-ink" strokeWidth={1.5} aria-hidden="true" />
                  <span>
                    {site.location.line1}, {site.location.city}
                  </span>
                </p>
                <p className="flex items-start gap-3 text-ink-soft">
                  <Clock className="mt-1 h-4 w-4 shrink-0 text-gold-ink" strokeWidth={1.5} aria-hidden="true" />
                  <span>{site.hours[0].days}, {site.hours[0].time}</span>
                </p>
                <p className="text-[0.8rem] leading-relaxed text-ink-soft/90">{site.location.note}</p>
              </Reveal>
            </div>
          </div>

          {/* right: the form */}
          <div className="lg:col-span-7">
            <Reveal y={50}>
              <div className="border border-espresso/15 bg-ivory p-6 shadow-[var(--shadow-lift)] sm:p-10 lg:p-14">
                {status === 'success' ? (
                  <div role="status" className="py-6 text-center sm:py-10">
                    <span className="mx-auto mb-8 grid h-16 w-16 place-items-center rounded-full border border-gold text-gold-ink">
                      <Check className="h-7 w-7" strokeWidth={1.3} aria-hidden="true" />
                    </span>
                    <h3 ref={headingRef} tabIndex={-1} className="display-md mb-5 text-burgundy outline-none">
                      {result?.mode === 'demo' ? 'Demo mode: nothing was sent' : result?.mode === 'mailto' ? 'Your request is ready to send' : 'Request received'}
                    </h3>
                    <p className="mx-auto max-w-md text-[1rem] leading-relaxed text-ink-soft">
                      {result?.mode === 'sent' && `Thank you, ${d.name.split(' ')[0] || 'there'}. We have your request for ${service?.name}. It is not a confirmed appointment yet: we will reply by email to confirm availability and details.`}
                      {result?.mode === 'mailto' && 'Your email app should have opened with your request filled in. Please press send there to complete it. Your appointment is only confirmed once we reply.'}
                      {(!result || result.mode === 'demo') && 'This website is not connected to a booking inbox yet, so your request was not delivered. The studio can connect one in minutes (see the README), and then requests will arrive by email.'}
                    </p>
                    <button type="button" onClick={reset} className="eyebrow link-underline mt-10 text-burgundy">
                      Start another request
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={submit} noValidate aria-labelledby="booking-form-title">
                    <p className="sr-only" aria-live="polite">
                      Step {step + 1} of {STEPS.length}: {STEPS[step]}
                    </p>

                    {/* progress */}
                    <ol className="mb-10 flex items-center gap-2 sm:gap-3" aria-label="Progress">
                      {STEPS.map((label, i) => (
                        <li key={label} className="flex flex-1 items-center gap-2 sm:gap-3" aria-current={i === step ? 'step' : undefined}>
                          <span className={`eyebrow !text-[0.62rem] transition-colors ${i === step ? 'text-burgundy' : i < step ? 'text-gold-ink' : 'text-ink-soft/55'}`}>
                            {i < step ? <Check className="inline h-3.5 w-3.5" aria-label="completed" /> : `0${i + 1}`}
                            <span className="ml-2 hidden sm:inline">{label}</span>
                          </span>
                          {i < STEPS.length - 1 && <span className={`h-px flex-1 transition-colors duration-700 ${i < step ? 'bg-gold-ink' : 'bg-line'}`} aria-hidden="true" />}
                        </li>
                      ))}
                    </ol>

                    {step > 0 && service && (
                      <p className="mb-8 flex items-center justify-between gap-4 border-b border-line pb-4 text-[0.92rem]">
                        <span>
                          <span className="eyebrow mr-3 !text-[0.6rem] text-ink-soft">Requesting</span>
                          <span className="font-display text-[1.15rem] text-burgundy">{service.name}</span>
                        </span>
                        <button type="button" onClick={() => setStep(0)} className="eyebrow link-underline !text-[0.6rem] text-burgundy">
                          Change
                        </button>
                      </p>
                    )}

                    <h3 id="booking-form-title" ref={headingRef} tabIndex={-1} className="display-md mb-8 text-burgundy outline-none">
                      {['What would you like?', 'When suits you?', 'Anything to add?', 'How can we reach you?', 'Review and send'][step]}
                    </h3>

                    {/* STEP 1 */}
                    {step === 0 && (
                      <fieldset>
                        <legend className="sr-only">Choose a service</legend>
                        <div role="radiogroup" aria-describedby={err('serviceId') ? 'serviceId-error' : undefined} className="border-t border-line">
                          {OPTIONS.map((o) => {
                            const on = d.serviceId === o.id
                            return (
                              <label key={o.id} className={`group flex cursor-pointer items-center gap-5 border-b border-line py-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-burgundy ${on ? 'bg-champagne/50' : 'hover:bg-champagne/30'} px-3 sm:px-4`}>
                                <input type="radio" name="service" value={o.id} checked={on} onChange={() => set({ serviceId: o.id })} aria-invalid={!!err('serviceId')} data-invalid={!!err('serviceId')} className="peer sr-only" />
                                <span aria-hidden="true" className={`grid h-5 w-5 shrink-0 place-items-center rounded-full border transition-colors ${on ? 'border-burgundy bg-burgundy text-ivory' : 'border-espresso/40'}`}>
                                  {on && <Check className="h-3 w-3" strokeWidth={2.5} />}
                                </span>
                                <span className="flex-1">
                                  <span className="block font-display text-[1.2rem] text-burgundy">{o.name}</span>
                                  <span className="block text-[0.82rem] text-ink-soft">{o.note}</span>
                                </span>
                              </label>
                            )
                          })}
                        </div>
                        {err('serviceId') && <p id="serviceId-error" className="mt-3 text-[0.86rem] font-medium text-[#8a2e3d]">• {err('serviceId')}</p>}
                      </fieldset>
                    )}

                    {/* STEP 2 */}
                    {step === 1 && (
                      <div className="grid gap-9">
                        <Field id="date" label="Preferred date" error={err('date')} hint="Your preferred date only. We confirm availability when we reply.">
                          <input id="date" type="date" min={todayISO()} value={d.date} onChange={(e) => set({ date: e.target.value })} aria-invalid={!!err('date')} aria-describedby={describe('date', true)} className={inputCls} />
                        </Field>
                        <fieldset>
                          <legend className="eyebrow mb-3 !text-[0.66rem] text-espresso">Preferred time of day</legend>
                          <div className="flex flex-wrap gap-3" role="radiogroup" aria-describedby={err('time') ? 'time-error' : undefined}>
                            {timePreferences.map((t) => {
                              const on = d.time === t.id
                              return (
                                <label key={t.id} className={`touch-target cursor-pointer border px-5 py-3 text-[0.9rem] transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-burgundy ${on ? 'border-burgundy bg-burgundy text-ivory' : 'border-espresso/25 hover:border-burgundy'}`}>
                                  <input type="radio" name="time" value={t.id} checked={on} onChange={() => set({ time: t.id })} aria-invalid={!!err('time')} data-invalid={!!err('time')} className="sr-only" />
                                  {t.label}
                                </label>
                              )
                            })}
                          </div>
                          {err('time') && <p id="time-error" className="mt-3 text-[0.86rem] font-medium text-[#8a2e3d]">• {err('time')}</p>}
                          <p className="mt-3 text-[0.8rem] text-ink-soft">These are preferences, not booked slots.</p>
                        </fieldset>
                      </div>
                    )}

                    {/* STEP 3 */}
                    {step === 2 && (
                      <fieldset>
                        <legend className="mb-5 text-[0.95rem] text-ink-soft">Optional extras. Pricing is confirmed when we reply.</legend>
                        <div className="border-t border-line">
                          {addOns.map((a) => {
                            const on = d.addOns.includes(a.id)
                            return (
                              <label key={a.id} className={`flex cursor-pointer items-center gap-5 border-b border-line px-3 py-4 transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-burgundy sm:px-4 ${on ? 'bg-champagne/50' : 'hover:bg-champagne/30'}`}>
                                <input type="checkbox" checked={on} onChange={() => set({ addOns: on ? d.addOns.filter((x) => x !== a.id) : [...d.addOns, a.id] })} className="peer sr-only" />
                                <span aria-hidden="true" className={`grid h-5 w-5 shrink-0 place-items-center border transition-colors ${on ? 'border-burgundy bg-burgundy text-ivory' : 'border-espresso/40'}`}>
                                  {on && <Check className="h-3 w-3" strokeWidth={2.5} />}
                                </span>
                                <span className="flex-1">
                                  <span className="block font-display text-[1.15rem] text-burgundy">{a.label}</span>
                                  <span className="block text-[0.8rem] text-ink-soft">{a.note}</span>
                                </span>
                              </label>
                            )
                          })}
                        </div>
                      </fieldset>
                    )}

                    {/* STEP 4 */}
                    {step === 3 && (
                      <div className="grid gap-8">
                        <div className="grid gap-8 sm:grid-cols-2">
                          <Field id="name" label="Your name" error={err('name')}>
                            <input id="name" name="name" autoComplete="name" value={d.name} onChange={(e) => set({ name: e.target.value })} aria-invalid={!!err('name')} aria-describedby={describe('name')} className={inputCls} />
                          </Field>
                          <Field id="email" label="Email" error={err('email')}>
                            <input id="email" name="email" type="email" inputMode="email" autoComplete="email" value={d.email} onChange={(e) => set({ email: e.target.value })} aria-invalid={!!err('email')} aria-describedby={describe('email')} className={inputCls} />
                          </Field>
                        </div>
                        <Field id="phone" label="Phone" optional error={err('phone')}>
                          <input id="phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" value={d.phone} onChange={(e) => set({ phone: e.target.value })} aria-invalid={!!err('phone')} aria-describedby={describe('phone')} className={inputCls} />
                        </Field>
                        <Field id="notes" label="Special requests" optional error={err('notes')} hint="Skin concerns, allergies, the occasion, inspiration you love. Up to 600 characters.">
                          <textarea id="notes" name="notes" rows={4} maxLength={620} value={d.notes} onChange={(e) => set({ notes: e.target.value })} aria-invalid={!!err('notes')} aria-describedby={describe('notes', true)} className={`${inputCls} resize-y`} />
                        </Field>
                        {/* honeypot: real visitors never see or reach this */}
                        <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                          <label>
                            Website
                            <input tabIndex={-1} autoComplete="off" value={d.website} onChange={(e) => set({ website: e.target.value })} />
                          </label>
                        </div>
                        <div>
                          <label className="flex cursor-pointer items-start gap-4 has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-4 has-[:focus-visible]:outline-burgundy">
                            <input type="checkbox" checked={d.consent} onChange={(e) => set({ consent: e.target.checked })} aria-invalid={!!err('consent')} data-invalid={!!err('consent')} aria-describedby={err('consent') ? 'consent-error' : undefined} className="peer sr-only" />
                            <span aria-hidden="true" className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center border transition-colors ${d.consent ? 'border-burgundy bg-burgundy text-ivory' : 'border-espresso/40'}`}>
                              {d.consent && <Check className="h-3 w-3" strokeWidth={2.5} />}
                            </span>
                            <span className="text-[0.9rem] leading-relaxed text-ink-soft">I understand this is an appointment request, not a confirmed booking, and that my details will be used only to reply to it.</span>
                          </label>
                          {err('consent') && <p id="consent-error" className="mt-3 text-[0.86rem] font-medium text-[#8a2e3d]">• {err('consent')}</p>}
                        </div>
                      </div>
                    )}

                    {/* STEP 5 */}
                    {step === 4 && (
                      <div>
                        <dl className="border-t border-line text-[0.95rem]">
                          {[
                            ['Service', service?.name],
                            ['Preferred date', prettyDate],
                            ['Time of day', timeLabel],
                            ['Extras', d.addOns.length ? d.addOns.map((id) => addOns.find((a) => a.id === id)?.label).join(', ') : 'None'],
                            ['Name', d.name],
                            ['Email', d.email],
                            ['Phone', d.phone || 'Not provided'],
                            ['Notes', d.notes || 'None'],
                          ].map(([k, v]) => (
                            <div key={k} className="grid gap-1 border-b border-line py-3.5 sm:grid-cols-[9rem_1fr]">
                              <dt className="eyebrow pt-0.5 !text-[0.62rem] text-gold-ink">{k}</dt>
                              <dd className="break-words text-espresso">{v}</dd>
                            </div>
                          ))}
                        </dl>
                        {status === 'error' && (
                          <p role="alert" className="mt-6 border border-[#8a2e3d]/40 bg-[#8a2e3d]/5 p-4 text-[0.9rem] text-[#6e2230]">
                            We could not send your request just now. Please try again, or email us at {site.contact.email}. Your details are still here.
                          </p>
                        )}
                      </div>
                    )}

                    {/* nav */}
                    <div className="mt-12 flex flex-col-reverse items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between">
                      {step > 0 ? (
                        <button type="button" onClick={back} className="touch-target inline-flex items-center gap-2.5 self-start py-2 text-[0.9rem] font-semibold text-espresso transition-colors hover:text-burgundy" disabled={status === 'submitting'}>
                          <span className="grid h-8 w-8 place-items-center rounded-full border border-espresso/25" aria-hidden="true">
                            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={1.8} />
                          </span>
                          Back
                        </button>
                      ) : (
                        <span />
                      )}
                      <button type="submit" disabled={status === 'submitting'} className={`btn btn-primary w-full sm:w-auto disabled:cursor-wait disabled:opacity-80 ${status === 'submitting' ? '' : 'btn-with-chip'}`}>
                        {status === 'submitting' ? (
                          <>
                            <LoaderCircle className="h-4 w-4 animate-spin" aria-hidden="true" /> <span>Sending</span>
                          </>
                        ) : (
                          <>
                            <span>{step === STEPS.length - 1 ? 'Send request' : 'Continue'}</span>
                            <span className="btn-chip" aria-hidden="true">
                              <ArrowRight strokeWidth={1.8} />
                            </span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
