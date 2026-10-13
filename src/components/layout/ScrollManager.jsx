import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../../lib/gsap'
import { scrollToId, useLenis } from '../../lib/lenis'

/** Handles route changes and /#hash targets, including on first load. */
export default function ScrollManager() {
  const { pathname, hash } = useLocation()
  const lenis = useLenis()

  useEffect(() => {
    const id = hash.replace('#', '')
    // Wait for the section layout (and any pinned spacers) to settle before measuring
    const t = setTimeout(
      () => {
        ScrollTrigger.refresh()
        if (id) scrollToId(id, lenis, { immediate: true })
        else if (lenis) lenis.scrollTo(0, { immediate: true })
        else window.scrollTo(0, 0)
      },
      id ? 350 : 0,
    )
    return () => clearTimeout(t)
    // lenis intentionally excluded: only navigation should trigger a scroll
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, hash])

  return null
}
