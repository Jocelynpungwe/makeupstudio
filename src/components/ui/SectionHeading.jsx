import SplitHeading from '../animations/SplitHeading'
import Reveal from '../animations/Reveal'

/**
 * Section opener: numbered eyebrow with a gold rule, a split-text headline and an optional lede.
 * `children` is the headline (use <em className="italic-accent"> for the italic emphasis).
 */
export default function SectionHeading({ eyebrow, number, lede, align = 'left', dark = false, size = 'display-lg', as = 'h2', id, className = '', children }) {
  const center = align === 'center'
  return (
    <div className={`${center ? 'mx-auto text-center' : ''} ${dark ? 'on-dark' : ''} ${className}`}>
      {(eyebrow || number) && (
        <Reveal className={`mb-7 flex items-center gap-4 ${center ? 'justify-center' : ''}`}>
          {number && <span className={`eyebrow ${dark ? 'text-gold' : 'text-gold-ink'}`}>{number}</span>}
          <span className={`h-px w-10 ${dark ? 'bg-gold' : 'bg-gold-ink/60'}`} aria-hidden="true" />
          {eyebrow && <span className={`eyebrow ${dark ? 'text-ivory/80' : 'text-ink-soft'}`}>{eyebrow}</span>}
        </Reveal>
      )}
      <SplitHeading as={as} id={id} className={`${size} text-balance ${dark ? 'text-ivory' : 'text-burgundy'}`}>
        {children}
      </SplitHeading>
      {lede && (
        <Reveal delay={0.15} className={`lede mt-8 ${center ? 'mx-auto' : ''}`}>
          <p>{lede}</p>
        </Reveal>
      )}
    </div>
  )
}
