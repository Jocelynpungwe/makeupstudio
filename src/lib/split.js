import { gsap } from './gsap'
import { SplitText } from 'gsap/SplitText'

// SplitText only powers headings below the fold, so it stays out of the first-paint bundle.
gsap.registerPlugin(SplitText)

export { SplitText }
