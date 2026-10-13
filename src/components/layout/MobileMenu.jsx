import { useEffect, useRef, useState } from 'react'
import { ArrowUpRight, Clock, Mail, MapPin, Phone, X } from 'lucide-react'
import { site } from '../../data/site'
import { useLenis } from '../../lib/lenis'
import AnchorLink from './AnchorLink'
import Button from '../ui/Button'
import Picture from '../ui/Picture'
import Wordmark from '../ui/Wordmark'
import { InstagramIcon } from '../ui/icons'

/**
 * Side drawer. A real dialog: inert while closed, focus moves in on open and back to the toggle on close,
 * Tab is trapped, Escape and the scrim close it, and page scroll is locked while it is open.
 */
export default function MobileMenu({ open, onClose }) {
  const ref = useRef(null)
  const closeRef = useRef(null)
  const lenis = useLenis()
  const [seen, setSeen] = useState(false) // mount the banner photo only once the drawer has been opened
  if (open && !seen) setSeen(true)

  useEffect(() => {
    if (!open) return
    lenis?.stop()
    const prevOverflow = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    const toggle = document.querySelector('[aria-controls="mobile-menu"]')
    const root = ref.current
    const focusables = () => [...root.querySelectorAll('a[href], button:not([disabled])')]
    const t = setTimeout(() => closeRef.current?.focus(), 80)

    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
      if (e.key !== 'Tab') return
      const items = focusables()
      const first = items[0]
      const last = items.at(-1)
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(t)
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = prevOverflow
      lenis?.start()
      toggle?.focus?.({ preventScroll: true })
    }
  }, [open, lenis, onClose])

  const stagger = (i, base = 220) => ({
    transform: open ? 'translateY(0)' : 'translateY(18px)',
    opacity: open ? 1 : 0,
    transitionDelay: open ? `${base + i * 60}ms` : '0ms',
  })
  const rise = 'transition-[transform,opacity] duration-[900ms] [transition-timing-function:var(--ease-expo)]'
  const hours = site.hours[0]

  return (
    <>
      {/* scrim */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className={`fixed inset-0 z-[109] bg-espresso-deep/70 transition-[opacity,visibility] duration-500 lg:hidden ${open ? 'visible opacity-100' : 'invisible opacity-0'}`}
      />

      <div
        id="mobile-menu"
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        inert={!open}
        aria-hidden={!open}
        className={`on-dark fixed bottom-0 right-0 top-0 z-[110] flex w-[min(90vw,25rem)] flex-col overflow-y-auto bg-burgundy-deep text-ivory shadow-[-30px_0_60px_-30px_rgb(0_0_0/0.6)] transition-[transform,visibility] duration-[700ms] [transition-timing-function:var(--ease-expo)] lg:hidden ${
          open ? 'visible translate-x-0' : 'invisible translate-x-full'
        }`}
        style={{ height: '100dvh' }}
      >
        {/* top bar */}
        <div className="flex h-[var(--header-h)] shrink-0 items-center justify-between px-6">
          <Wordmark />
          <button ref={closeRef} type="button" onClick={onClose} aria-label="Close menu" className="icon-btn icon-btn-light touch-target">
            <X className="h-5 w-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* photograph */}
        <div className="relative mx-6 mt-1 h-36 shrink-0 overflow-hidden rounded-[1.1rem]" aria-hidden="true">
          {seen && <Picture name="gold-hour-profile-glow" sizes="25rem" className="h-full w-full object-cover" style={{ objectPosition: '50% 30%' }} />}
          <div className="absolute inset-0 bg-gradient-to-t from-burgundy-deep/85 via-burgundy-deep/20 to-transparent" />
          <p className="absolute bottom-3.5 left-4 right-4 font-display text-[1.05rem] italic leading-tight text-ivory">Luxury makeup artistry for Black women.</p>
        </div>

        {/* links */}
        <nav aria-label="Mobile" className="mt-5 px-6">
          <ul>
            {site.nav.map((item, i) => (
              <li key={item.label} className={`border-t border-ivory/12 last:border-b ${rise}`} style={stagger(i)}>
                <AnchorLink to={item.to} onNavigate={onClose} className="touch-target group flex items-center justify-between py-[0.95rem]">
                  <span className="flex items-baseline gap-4">
                    <span className="eyebrow w-5 !text-[0.6rem] text-gold" aria-hidden="true">
                      0{i + 1}
                    </span>
                    <span className="font-display text-[1.7rem] leading-none tracking-[-0.01em]">{item.label}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-gold/70 transition-transform duration-500 [transition-timing-function:var(--ease-expo)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5" strokeWidth={1.4} aria-hidden="true" />
                </AnchorLink>
              </li>
            ))}
          </ul>
        </nav>

        {/* call to action + studio details */}
        <div className={`mt-auto px-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] pt-7 ${rise}`} style={stagger(site.nav.length, 260)}>
          <Button to="/#booking" variant="gold" onClick={onClose} className="w-full justify-between">
            Book your appointment
          </Button>

          <div className="mt-6 space-y-2.5 text-[0.85rem] text-ivory/75">
            <p className="flex items-start gap-3">
              <Clock className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} aria-hidden="true" />
              <span>
                {hours.days}, {hours.time}
              </span>
            </p>
            <p className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.4} aria-hidden="true" />
              <span>
                {site.location.line1}, {site.location.city}
              </span>
            </p>
          </div>

          <div className="mt-5 flex items-center gap-3">
            <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`} aria-label={`Call ${site.contact.phone}`} className="icon-btn icon-btn-light touch-target">
              <Phone className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.4} />
            </a>
            <a href={`mailto:${site.contact.email}`} aria-label={`Email ${site.contact.email}`} className="icon-btn icon-btn-light touch-target">
              <Mail className="h-[1.1rem] w-[1.1rem]" strokeWidth={1.4} />
            </a>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" aria-label={`Instagram ${site.instagram.handle}`} className="icon-btn icon-btn-light touch-target">
              <InstagramIcon className="h-[1.1rem] w-[1.1rem]" />
            </a>
            <span className="ml-auto text-[0.78rem] text-ivory/55">{site.instagram.handle}</span>
          </div>
        </div>
      </di