import { ArrowRight } from 'lucide-react'
import AnchorLink from '../layout/AnchorLink'

const VARIANTS = {
  primary: 'btn-primary',
  gold: 'btn-gold',
  outline: 'btn-outline',
  light: 'btn-light',
}

/**
 * One button for everything. Pass `to` for in-site (hash-aware) links, `href` for external ones,
 * otherwise it renders a real <button>.
 */
export default function Button({ to, href, variant = 'primary', size, arrow = true, className = '', children, onClick, ...rest }) {
  const cls = `btn ${VARIANTS[variant]} ${size === 'sm' ? 'btn-sm' : ''} ${arrow ? 'btn-with-chip' : ''} ${className}`
  const content = (
    <>
      <span>{children}</span>
      {arrow && (
        <span className="btn-chip" aria-hidden="true">
          <ArrowRight strokeWidth={1.8} />
        </span>
      )}
    </>
  )

  if (to) {
    return (
      <AnchorLink to={to} className={cls} onNavigate={onClick} {...rest}>
        {content}
      </AnchorLink>
    )
  }
  if (href) {
    const external = /^https?:/.test(href)
    return (
      <a href={href} className={cls} onClick={onClick} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} {...rest}>
        {content}
      </a>
    )
  }
  return (
    <button type="button" className={cls} onClick={onClick} {...rest}>
      {content}
    </button>
  )
}
