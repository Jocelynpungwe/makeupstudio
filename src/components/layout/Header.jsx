import { useCallback, useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { site } from '../../data/site'
import AnchorLink from './AnchorLink'
import Button from '../ui/Button'
import Wordmark from '../ui/Wordmark'
import MobileMenu from './MobileMenu'
import { scrollToId, useLenis } from '../../lib/lenis'

/**
 * Transparent over the film, then a refined solid bar. The bar's colour follows what is behind it:
 * espresso while the film is on screen, ivory once the page below begins.
 */
export default function Header() {
  const { pathname } = useLocation()
  const lenis = useLenis()
  const [scrolled, setScrolled] = useState(false)
  const [overHero, setOverHero] = useState(pathname === '/')
  const [open, setOpen] = useState(false)
  const close = useCallback(() => setOpen(false), [])

  useEffect(() => {
    let raf = 0
    const read = () => {
      raf = 0
      const hero = document.getElementById('hero')
      setScrolled(window.scrollY > 24)
      setOverHero(!!hero && hero.getBoundingClientRect().bottom > 80)
    }
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(read)
    }
    read()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [pathname])

  const dark = overHero // light text on a dark background
  const solid = scrolled
  const bg = !solid ? 'bg-transparent border-transparent' : dark ? 'bg-espresso-deep/95 border-ivory/10' : 'bg-ivory border-line'
  const text = dark ? 'text-ivory' : 'text-espresso'

  return (
    <>
      <header className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,color] duration-500 ${bg} ${text} ${dark ? 'on-dark' : ''}`}>
        <div className="container-wide flex h-[var(--header-h)] items-center justify-between gap-6">
          <Link to="/#top" onClick={(e) => { if (pathname === '/') { e.preventDefault(); scrollToId('top', lenis); window.history.replaceState(null, '', '/') } }} className="relative z-[101] shrink-0">
            <Wordmark />
          </Link>

          <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex">
            {site.nav.map((item) => (
              <AnchorLink key={item.label} to={item.to} className="eyebrow link-underline !font-semibold !tracking-[0.24em] py-2">
                {item.label}
              </AnchorLink>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Button to="/#booking" variant={dark ? 'gold' : 'primary'} size="sm" arrow={false} className="">
              Book now
            </Button>
            <button
              type="button"
              className="touch-target relative z-[101] flex h-11 w-11 items-center justify-center lg:hidden"
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? 'Close menu' : 'Open menu'}
              onClick={() => setOpen((v) => !v)}
            >
              <span aria-hidden="true" className="relative block h-3.5 w-7">
                <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${open ? 'top-1/2 rotate-45' : 'top-0'}`} />
                <span className={`absolute left-0 h-px w-full bg-current transition-all duration-500 ${open ? 'top-1/2 -rotate-45' : 'bottom-0'}`} />
              </span>
            </button>
          </div>
        </div>
      </header>
      <MobileMenu open={open} onClose={close} />
    </>
  )
}
