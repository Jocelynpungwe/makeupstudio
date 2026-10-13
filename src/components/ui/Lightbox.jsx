import { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useLenis } from '../../lib/lenis'

/**
 * Full-screen image viewer. A real dialog: focus moves in and returns, Tab is trapped,
 * Escape closes, arrow keys and swipe navigate, and neighbouring images are preloaded.
 * items: [{ src, alt, label }]
 */
export default function Lightbox({ items, index, onClose, onChange }) {
  const open = index !== null && index >= 0 && index < items.length
  const lenis = useLenis()
  const closeRef = useRef(null)
  const dialogRef = useRef(null)
  const live = useRef({ index, items, onChange, onClose })
  useEffect(() => {
    live.current = { index, items, onChange, onClose }
  })
  const touch = useRef(null)

  useEffect(() => {
    if (!open) return
    const opener = document.activeElement
    lenis?.stop()
    const prev = document.documentElement.style.overflow
    document.documentElement.style.overflow = 'hidden'
    closeRef.current?.focus()

    const step = (d) => {
      const { index: i, items: list, onChange: ch } = live.current
      ch((i + d + list.length) % list.length)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') live.current.onClose()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'Tab') {
        const f = [...dialogRef.current.querySelectorAll('button:not([disabled])')]
        const first = f[0]
        const last = f.at(-1)
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('keydown', onKey)
      document.documentElement.style.overflow = prev
      lenis?.start()
      opener?.focus?.({ preventScroll: true })
    }
  }, [open, lenis])

  // preload neighbours so next/prev feel instant
  useEffect(() => {
    if (!open) return
    ;[index - 1, index + 1].forEach((i) => {
      const it = items[(i + items.length) % items.length]
      if (it) new Image().src = it.src
    })
  }, [open, index, items])

  if (!open) return null
  const item = items[index]
  const go = (d) => onChange((index + d + items.length) % items.length)

  return createPortal(
    <div ref={dialogRef} role="dialog" aria-modal="true" aria-label="Image viewer" className="on-dark lb-enter fixed inset-0 z-[150] flex flex-col bg-espresso-deep text-ivory">
      <div className="flex items-center justify-between px-[var(--gutter)] py-5">
        <p className="eyebrow !tracking-[0.3em]" aria-live="polite">
          {String(index + 1).padStart(2, '0')} <span className="opacity-40">/ {String(items.length).padStart(2, '0')}</span>
          {item.label && <span className="ml-5 hidden text-gold sm:inline">{item.label}</span>}
        </p>
        <button ref={closeRef} type="button" onClick={onClose} className="icon-btn icon-btn-light touch-target" aria-label="Close viewer">
          <X className="h-5 w-5" strokeWidth={1.4} />
        </button>
      </div>

      <div
        className="relative flex min-h-0 flex-1 items-center justify-center px-4 sm:px-20"
        onPointerDown={(e) => (touch.current = e.clientX)}
        onPointerUp={(e) => {
          if (touch.current === null) return
          const dx = e.clientX - touch.current
          touch.current = null
          if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1)
        }}
        style={{ touchAction: 'pan-y' }}
      >
        <button type="button" onClick={() => go(-1)} className="icon-btn icon-btn-light touch-target absolute left-2 top-1/2 z-10 -translate-y-1/2 sm:left-6" aria-label="Previous image">
          <ChevronLeft className="h-5 w-5" strokeWidth={1.4} />
        </button>
        <img key={item.src} src={item.src} alt={item.alt} className="lb-img max-h-full max-w-full select-none object-contain" draggable="false" />
        <button type="button" onClick={() => go(1)} className="icon-btn icon-btn-light touch-target absolute right-2 top-1/2 z-10 -translate-y-1/2 sm:right-6" aria-label="Next image">
          <ChevronRight className="h-5 w-5" strokeWidth={1.4} />
        </button>
      </div>

      <p className="px-[var(--gutter)] py-5 text-center text-sm text-ivory/70">{item.alt}</p>
    </div>,
    document.body,
  )
}
