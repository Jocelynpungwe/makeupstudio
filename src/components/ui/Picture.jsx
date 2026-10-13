import { img } from '../../lib/media'

/**
 * Responsive still from the generated manifest: WebP srcset, intrinsic size (no layout shift),
 * dominant-colour placeholder, lazy by default.
 */
export default function Picture({ name, sizes = '100vw', className = '', eager = false, alt, style, ...rest }) {
  const m = img(name)
  if (!m) return null
  return (
    <img
      src={m.src}
      srcSet={m.srcSet}
      sizes={sizes}
      width={m.w}
      height={m.h}
      alt={alt ?? m.alt}
      loading={eager ? 'eager' : 'lazy'}
      decoding="async"
      fetchPriority={eager ? 'high' : undefined}
      className={className}
      style={{ backgroundColor: m.color, objectPosition: m.pos, ...style }}
      {...rest}
    />
  )
}
