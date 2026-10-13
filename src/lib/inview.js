/**
 * One shared IntersectionObserver per margin. Observing costs almost nothing and, unlike measuring with
 * ScrollTrigger at mount, never forces a layout. Entrances are cheap CSS transitions flipped by a class.
 */
const observers = new Map()

function observerFor(margin) {
  let entry = observers.get(margin)
  if (!entry) {
    const callbacks = new WeakMap()
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (!e.isIntersecting) continue
          const cb = callbacks.get(e.target)
          io.unobserve(e.target)
          callbacks.delete(e.target)
          cb?.(e.target)
        }
      },
      { rootMargin: margin, threshold: 0 },
    )
    entry = { io, callbacks }
    observers.set(margin, entry)
  }
  return entry
}

/** Run `cb(el)` once, the first time `el` comes within `margin` of the viewport. Returns a cleanup. */
export function onceInView(el, cb, margin = '0px 0px -8% 0px') {
  const { io, callbacks } = observerFor(margin)
  callbacks.set(el, cb)
  io.observe(el)
  return () => {
    callbacks.delete(el)
    io.unobserve(el)
  }
}

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches
