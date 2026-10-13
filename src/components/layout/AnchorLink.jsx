import { Link, useLocation } from 'react-router-dom'
import { scrollToId, useLenis } from '../../lib/lenis'

/**
 * Router link that also smooth-scrolls when the target is on the page you are already on.
 * `to` looks like "/#services" or "/privacy".
 */
export default function AnchorLink({ to, onNavigate, children, ...rest }) {
  const { pathname } = useLocation()
  const lenis = useLenis()
  const [path, hash = ''] = to.split('#')

  const onClick = (e) => {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return
    const samePage = (path === '' || path === '/') && pathname === '/'
    if (samePage) {
      e.preventDefault()
      const go = () => {
        scrollToId(hash, lenis)
        window.history.replaceState(null, '', hash ? `/#${hash}` : '/')
      }
      if (onNavigate) {
        // a menu is closing: let it release its scroll lock before we scroll
        onNavigate()
        setTimeout(go, 180)
      } else go()
      return
    }
    onNavigate?.()
  }

  return (
    <Link to={to} onClick={onClick} {...rest}>
      {children}
    </Link>
  )
}
