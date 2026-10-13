import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { useFinePointer, useReducedMotion } from '../../hooks/useMedia'

/**
 * A quiet follower ring for desktop mouse users only. The native cursor is never hidden, so
 * nothing about usability changes. It names the action over images ("View") and sliders ("Drag").
 */
export default function Cursor() {
  const fine = useFinePointer()
  const reduced = useReducedMotion()
  const ring = useRef(null)

  useEffect(() => {
    if (!fine || reduced) return
    const el = ring.current
    const x = gsap.quickTo(el, 'x', { duration: 0.55, ease: 'power3' })
    const y = gsap.quickTo(el, 'y', { duration: 0.55, ease: 'power3' })

    const move = (e) => {
      x(e.clientX)
      y(e.clientY)
      el.dataset.visible = 'true'
    }
    const over = (e) => {
      const t = e.target.closest?.('[data-cursor], a, button, [role="slider"], input, textarea, label')
      const kind = t?.dataset?.cursor
      if (kind) {
        el.dataset.state = 'link'
        el.textContent = kind === 'view' ? 'View' : kind === 'drag' ? 'Drag' : ''
      } else {
        el.dataset.state = t ? 'hover' : ''
        el.textContent = ''
      }
    }
    const leave = () => (el.dataset.visible = 'false')

    window.addEventListener('pointermove', move, { passive: true })
    document.addEventListener('pointerover', over, { passive: true })
    document.documentElement.addEventListener('pointerleave', leave)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
    }
  }, [fine, reduced])

  if (!fine || reduced) return null
  return <div ref={ring} className="cursor-ring" aria-hidden="true" data-visible="false" />
}
