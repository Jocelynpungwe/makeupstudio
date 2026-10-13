import { useEffect, useState } from 'react'
import { ScrollTrigger } from '../lib/gsap'
import Welcome from './Welcome'
import Services from './Services'
import Gallery from './Gallery'
import Transformation from './Transformation'
import Experience from './Experience'
import Collections from './Collections'
import Artist from './Artist'
import Why from './Why'
import Testimonials from './Testimonials'
import Booking from './Booking'
import Instagram from './Instagram'
import Faq from './Faq'
import FinalCta from './FinalCta'

const SECTIONS = [Welcome, Services, Gallery, Transformation, Experience, Collections, Artist, Why, Testimonials, Booking, Instagram, Faq, FinalCta]

/**
 * Everything after the film. It mounts one section per idle slice (so no single long task), or all at once
 * the moment it is needed: an anchor link, a #hash, or the visitor's first interaction.
 */
export default function Below({ immediate = false, onDone }) {
  const [count, setCount] = useState(immediate ? SECTIONS.length : 0)
  const done = count >= SECTIONS.length

  useEffect(() => {
    if (done) onDone?.()
  }, [done, onDone])

  useEffect(() => {
    if (done) return
    const all = () => setCount(SECTIONS.length)
    window.addEventListener('atelier:mount-below', all)
    // Not on the first wheel or touch: that would stall the film. A keypress (End, PageDown) or being
    // a few screens into the film means they are heading down, so finish the job.
    window.addEventListener('keydown', all, { once: true })
    const onScroll = () => window.scrollY > window.innerHeight * 2.5 && all()
    window.addEventListener('scroll', onScroll, { passive: true })

    const idle = window.requestIdleCallback || ((cb) => setTimeout(() => cb({ timeRemaining: () => 8 }), 90))
    const cancel = window.cancelIdleCallback || clearTimeout
    const handle = idle(() => setCount((c) => Math.min(SECTIONS.length, c + 1)), { timeout: 600 })
    return () => {
      window.removeEventListener('atelier:mount-below', all)
      window.removeEventListener('keydown', all)
      window.removeEventListener('scroll', onScroll)
      cancel(handle)
    }
  }, [count, done])

  // measure scroll triggers once the last section is in and the fonts are settled
  useEffect(() => {
    if (!done) return
    const t = setTimeout(() => ScrollTrigger.refresh(), 250)
    document.fonts?.ready.then(() => ScrollTrigger.refresh())
    return () => clearTimeout(t)
  }, [done])

  return (
    <>
      {SECTIONS.slice(0, count).map((Section, i) => (
        <Section key={i} />
      ))}
    </>
  )
}
