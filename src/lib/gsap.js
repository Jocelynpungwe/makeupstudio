import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

gsap.defaults({ ease: 'expo.out', duration: 1.1 })
ScrollTrigger.config({ ignoreMobileResize: true })

export { gsap, ScrollTrigger }

/** Run `fn` only when the visitor has not asked for reduced motion; cleans itself up with the context. */
export const MOTION_OK = '(prefers-reduced-motion: no-preference)'
export const MOTION_REDUCED = '(prefers-reduced-motion: reduce)'
