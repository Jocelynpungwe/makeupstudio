import { MEDIA } from '../data/media.generated'

/** Responsive attributes for a stock still, from the generated manifest. */
export function img(key) {
  const m = MEDIA[key]
  if (!m) {
    if (import.meta.env.DEV) console.warn(`[media] unknown image key "${key}"`)
    return null
  }
  const largest = m.widths.at(-1)
  return {
    ...m,
    key,
    src: `/media/img/${key}-${largest}.webp`,
    srcSet: m.widths.map((w) => `/media/img/${key}-${w}.webp ${w}w`).join(', '),
    ratio: m.w / m.h,
  }
}

/** Full-size URL, used by the lightbox. */
export const fullSrc = (key) => {
  const m = MEDIA[key]
  return m ? `/media/img/${key}-${m.widths.at(-1)}.webp` : ''
}
