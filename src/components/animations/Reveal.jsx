import { useLayoutEffect, useRef } from 'react'
import { onceInView, prefersReducedMotion } from '../../lib/inview'

/**
 * Soft fade-up when scrolled into view. With `stagger`, the direct children enter in sequence.
 * It is a CSS transition flipped by one shared IntersectionObserver: no per-element layout reads.
 * Reduced-motion visitors never get the hidden state, so nothing is ever left invisible.
 */
export default function Reveal({ as: Tag = 'div', y = 34, delay = 0, stagger = 0, start = '0px 0px -8% 0px', className = '', children, ...rest }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    el.style.setProperty('--ry', `${y}px`)
    if (stagger) Array.from(el.children).forEach((c, i) => c.style.setProperty('--rd', `${delay + i * stagger}s`))
    else el.style.setProperty('--rd', `${delay}s`)
    el.classList.add('rv-pre')
    const stop = onceInView(
      el,
      () => {
        el.classList.remove('rv-pre')
        el.classList.add('rv-in')
      },
      start,
    )
    return () => {
      stop()
      el.classList.remove('rv-pre', 'rv-in')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tag ref={ref} data-rv={stagger ? 'stagger' : undefined} className={className} {...rest}>
      {children}
    </Tag>
  )
}
