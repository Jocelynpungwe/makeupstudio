import { useLayoutEffect, useRef } from 'react'
import { onceInView, prefersReducedMotion } from '../../lib/inview'

/**
 * Editorial headline: each line rises out of a mask as it nears the viewport.
 * The (heavier) text split happens lazily at that moment, not at mount, so it never joins the
 * page-load work. Reduced motion renders plain, fully visible text.
 */
export default function SplitHeading({ as: Tag = 'h2', className = '', children, delay = 0, ...rest }) {
  const ref = useRef(null)

  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const el = ref.current
    let split = null
    let cancelled = false
    el.classList.add('split-pre') // hidden before first paint, so nothing flashes before the split

    const stop = onceInView(
      el,
      async () => {
        const [{ gsap }, { SplitText }] = await Promise.all([import('../../lib/gsap'), import('../../lib/split')])
        await document.fonts.ready
        if (cancelled) return
        split = SplitText.create(el, {
          type: 'lines',
          mask: 'lines',
          autoSplit: true,
          linesClass: 'split-line',
          onSplit(self) {
            el.classList.remove('split-pre')
            return gsap.from(self.lines, { yPercent: 112, duration: 1.25, ease: 'expo.out', stagger: 0.1, delay })
          },
        })
      },
      '0px 0px 6% 0px',
    )

    return () => {
      cancelled = true
      stop()
      split?.revert()
      el.classList.remove('split-pre')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <Tag ref={ref} className={className} {...rest}>
      {children}
    </Tag>
  )
}
