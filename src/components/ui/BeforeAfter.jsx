import { useCallback, useLayoutEffect, useRef, useState } from 'react'
import { MoveHorizontal } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import { onceInView, prefersReducedMotion } from '../../lib/inview'

const clamp = (v) => Math.min(100, Math.max(0, v))

// the "you can drag me" sweep plays once per visit, not every time the pair changes
let teased = false

/**
 * Comparison slider. Pointer events with capture (mouse, touch and pen), vertical page scroll preserved
 * on touch, and a real ARIA slider for keyboard and screen reader users.
 * pair: { before: {src, src700, alt}, after: {...}, w, h, label }
 */
export default function BeforeAfter({ pair }) {
  const [pos, setPos] = useState(50)
  const box = useRef(null)
  const dragging = useRef(false)
  const touched = useRef(false)

  const fromEvent = useCallback((e) => {
    const r = box.current.getBoundingClientRect()
    return clamp(((e.clientX - r.left) / r.width) * 100)
  }, [])

  // one gentle teaser sweep the first time it is seen, so people discover it is draggable
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const o = { v: 50 }
    let tl = null
    const stop = onceInView(
      box.current,
      () => {
        if (touched.current || teased) return
        teased = true
        tl = gsap
          .timeline({ onUpdate: () => !touched.current && setPos(o.v) })
          .to(o, { v: 24, duration: 1.1, ease: 'power2.inOut' })
          .to(o, { v: 74, duration: 1.5, ease: 'power2.inOut' })
          .to(o, { v: 50, duration: 1, ease: 'power2.inOut' })
      },
      '0px 0px -25% 0px',
    )
    return () => {
      stop()
      tl?.kill()
    }
  }, [])

  const onKeyDown = (e) => {
    const step = e.shiftKey ? 10 : 3
    const map = { ArrowLeft: -step, ArrowDown: -step, ArrowRight: step, ArrowUp: step, PageDown: -15, PageUp: 15 }
    if (e.key === 'Home') setPos(0)
    else if (e.key === 'End') setPos(100)
    else if (e.key in map) setPos((p) => clamp(p + map[e.key]))
    else return
    touched.current = true
    e.preventDefault()
  }

  return (
    <figure className="m-0">
      <div
        ref={box}
        className="relative w-full cursor-ew-resize select-none overflow-hidden bg-espresso-deep"
        style={{ aspectRatio: `${pair.w} / ${pair.h}`, touchAction: 'pan-y' }}
        data-cursor="drag"
        onPointerDown={(e) => {
          touched.current = true
          dragging.current = true
          e.currentTarget.setPointerCapture(e.pointerId)
          setPos(fromEvent(e))
        }}
        onPointerMove={(e) => dragging.current && setPos(fromEvent(e))}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
      >
        <img src={pair.after.src} srcSet={`${pair.after.src700} 700w, ${pair.after.src} 1400w`} sizes="(min-width: 1024px) 40rem, 94vw" alt={pair.after.alt} width={pair.w} height={pair.h} className="absolute inset-0 h-full w-full object-cover" draggable="false" loading="lazy" decoding="async" />
        <img
          src={pair.before.src}
          srcSet={`${pair.before.src700} 700w, ${pair.before.src} 1400w`}
          sizes="(min-width: 1024px) 40rem, 94vw"
          alt={pair.before.alt}
          width={pair.w}
          height={pair.h}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          draggable="false"
          loading="lazy"
          decoding="async"
        />

        <span className={`eyebrow pointer-events-none absolute bottom-4 left-4 bg-espresso-deep/75 px-3 py-2 !text-[0.58rem] text-ivory transition-opacity duration-500 ${pos < 16 ? 'opacity-0' : ''}`}>Before</span>
        <span className={`eyebrow pointer-events-none absolute bottom-4 right-4 bg-espresso-deep/75 px-3 py-2 !text-[0.58rem] text-ivory transition-opacity duration-500 ${pos > 84 ? 'opacity-0' : ''}`}>After</span>

        {/* handle */}
        <div className="pointer-events-none absolute inset-y-0 w-px bg-ivory" style={{ left: `${pos}%` }} aria-hidden="true" />
        <div
          role="slider"
          tabIndex={0}
          aria-label="Before and after comparison"
          aria-orientation="horizontal"
          aria-valuemin={0}
          aria-valuemax={100}
          aria-valuenow={Math.round(pos)}
          aria-valuetext={`${Math.round(pos)} percent of the before image showing`}
          onKeyDown={onKeyDown}
          className="ba-handle-ring absolute top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-burgundy text-ivory outline-offset-4"
          style={{ left: `${pos}%` }}
        >
          <MoveHorizontal className="h-5 w-5" strokeWidth={1.4} aria-hidden="true" />
        </div>
      </div>
      <figcaption className="mt-4 text-[0.8rem] leading-relaxed text-ivory/70">
        Drag the handle, or focus it and use the arrow keys. <span className="text-ivory/90">{pair.note}</span>
      </figcaption>
    </figure>
  )
}
