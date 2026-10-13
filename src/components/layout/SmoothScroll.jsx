import { useEffect, useMemo, useState } from 'react'
import Lenis from 'lenis'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import { LenisContext } from '../../lib/lenis'

/**
 * Smooth scrolling that stays out of the way: native on touch, off entirely for reduced motion,
 * and wired into ScrollTrigger so every pinned or scrubbed section reads the same scroll value.
 */
export default function SmoothScroll({ children }) {
  const [lenis, setLenis] = useState(null)

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    let instance = null
    let tick = null

    const start = () => {
      if (instance) return
      instance = new Lenis({
        duration: 1.15,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      })
      instance.on('scroll', ScrollTrigger.update)
      tick = (time) => instance.raf(time * 1000)
      gsap.ticker.add(tick)
      gsap.ticker.lagSmoothing(0)
      window.__lenis = instance // exposed for debugging and automated tests
      setLenis(instance)
    }

    const stop = () => {
      if (!instance) return
      gsap.ticker.remove(tick)
      instance.destroy()
      instance = null
      delete window.__lenis
      setLenis(null)
    }

    const apply = () => (mql.matches ? stop() : start())
    apply()
    mql.addEventListener('change', apply)

    // Pause every looping CSS animation while the tab is hidden
    const onVisibility = () => document.body.classList.toggle('paused', document.hidden)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      mql.removeEventListener('change', apply)
      document.removeEventListener('visibilitychange', onVisibility)
      stop()
    }
  }, [])

  const value = useMemo(() => lenis, [lenis])
  return <LenisContext.Provider value={value}>{children}</LenisContext.Provider>
}
