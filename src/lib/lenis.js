import { createContext, useContext } from 'react'

export const LenisContext = createContext(null)
export const useLenis = () => useContext(LenisContext)

/** Ask the page to mount everything below the film right now (anchor links, hash loads, interaction). */
export const requestBelowFold = () => window.dispatchEvent(new Event('atelier:mount-below'))

/** Scroll to an element id (or the top) using Lenis when present, native otherwise. Waits for lazily-mounted sections. */
export function scrollToId(id, lenis, { immediate = false, tries = 0 } = {}) {
  const el = !id || id === 'top' ? null : document.getElementById(id)
  if (id && id !== 'top' && !el) {
    if (tries === 0) requestBelowFold()
    if (tries < 90) requestAnimationFrame(() => scrollToId(id, lenis, { immediate, tries: tries + 1 }))
    return
  }
  if (!el) {
    if (lenis) lenis.scrollTo(0, { immediate, duration: 1.4 })
    else window.scrollTo({ top: 0 })
    return
  }
  // html { scroll-padding-top } already reserves room for the fixed header, and Lenis honours it,
  // so the target section lands that far below the top. Do not add a second offset.
  const pad = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0
  if (lenis) {
    lenis.scrollTo(el, {
      immediate,
      duration: 1.6,
      // A late font swap or lazily-mounted section can reflow content above the target while we travel.
      // Check where we landed and nudge it back into place.
      onComplete: () => {
        if (Math.abs(el.getBoundingClientRect().top - pad) > 6) lenis.scrollTo(el, { immediate: true })
      },
    })
  } else window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - pad })
}
