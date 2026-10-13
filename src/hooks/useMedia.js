import { useSyncExternalStore } from 'react'

/** Live `matchMedia` as a tear-free external store. */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (notify) => {
      const mql = window.matchMedia(query)
      mql.addEventListener('change', notify)
      return () => mql.removeEventListener('change', notify)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}

export const useReducedMotion = () => useMediaQuery('(prefers-reduced-motion: reduce)')
export const useFinePointer = () => useMediaQuery('(hover: hover) and (pointer: fine)')

/**
 * The hero is decided live, not once at load. These gates match the CSS media queries
 * on the poster <picture> so a visitor never downloads an asset the layout then hides.
 *   static   reduced motion: composed poster, no film, no scroll hijack
 *   sequence phones, portrait tablets, short landscape phones: optimised frame sequence
 *   video    desktop and landscape tablets: scroll-scrubbed film
 */
export const SEQUENCE_GATES = [
  '(max-width: 720px)',
  '(orientation: portrait) and (max-width: 1024px)',
  '(orientation: portrait) and (pointer: coarse)',
  '(orientation: landscape) and (pointer: coarse) and (max-height: 560px)',
]
export const SEQUENCE_MEDIA = SEQUENCE_GATES.join(', ')

const REDUCED = '(prefers-reduced-motion: reduce)'

function heroMode() {
  if (window.matchMedia(REDUCED).matches) return 'static'
  if (SEQUENCE_GATES.some((q) => window.matchMedia(q).matches)) return 'sequence'
  return 'video'
}

export function useHeroMode() {
  return useSyncExternalStore(
    (notify) => {
      const lists = [REDUCED, ...SEQUENCE_GATES].map((q) => window.matchMedia(q))
      lists.forEach((m) => m.addEventListener('change', notify))
      return () => lists.forEach((m) => m.removeEventListener('change', notify))
    },
    heroMode,
    () => 'video',
  )
}
