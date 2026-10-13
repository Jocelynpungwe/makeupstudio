import { useLayoutEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'
import { onceInView, prefersReducedMotion } from '../../lib/inview'

/** Slow vertical drift tied to scroll. The scroll-linked trigger is created only when the element is close. */
export default function Parallax({ as: Tag = 'div', amount = 8, className = '', children, ...rest }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    let st = null
    const stop = onceInView(
      el,
      () => {
        const tween = gsap.fromTo(el, { yPercent: -amount }, { yPercent: amount, ease: 'none', scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom top', scrub: true } })
        st = tween.scrollTrigger
      },
      '0px 0px 40% 0px',
    )
    return () => {
      stop()
      st?.kill()
      gsap.set(el, { clearProps: 'transform' })
    }
  }, [amount])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
