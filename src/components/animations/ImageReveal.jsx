import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { onceInView, prefersReducedMotion } from '../../lib/inview'
import Picture from '../ui/Picture'

const CLIP = { up: 'inset(100% 0 0 0)', down: 'inset(0 0 100% 0)', left: 'inset(0 100% 0 0)', right: 'inset(0 0 0 100%)' }

/**
 * Editorial image mask: the frame opens like a curtain while the photograph settles from a slight zoom.
 * The opening is a CSS transition flipped on entry. With `parallax`, the photograph also drifts inside its
 * frame; that scroll-linked trigger is only created once the image is about to appear.
 */
export default function ImageReveal({ name, sizes, ratio, direction = 'up', parallax = false, eager = false, className = '', imgClassName = '', alt, ...rest }) {
  const frame = useRef(null)
  const inner = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = frame.current
    const pic = inner.current
    el.style.setProperty('--ir-clip', CLIP[direction])
    el.style.setProperty('--ir-scale', parallax ? '1.12' : '1')
    el.classList.add('ir-pre')
    let st = null

    const stop = onceInView(el, () => {
      el.classList.remove('ir-pre')
      el.classList.add('ir-in')
      if (parallax) {
        const tween = gsap.fromTo(pic, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
        st = tween.scrollTrigger
      }
    })
    return () => {
      stop()
      st?.kill()
      el.classList.remove('ir-pre', 'ir-in')
    }
  }, [direction, parallax])

  return (
    <div ref={frame} className={`ir relative overflow-hidden ${className}`} style={ratio ? { aspectRatio: ratio } : undefined} {...rest}>
      <div ref={inner} className="ir-inner absolute inset-0 will-change-transform">
        <Picture name={name} sizes={sizes} eager={eager} alt={alt} className={`h-full w-full object-cover ${imgClassName}`} />
      </div>
    </div>
  )
}
