import { useRef, useState } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { testimonials } from '../data/content'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'

/**
 * Large editorial quotes. The copy in src/data/content.js is SAMPLE text and is labelled as such on the
 * page until each entry is replaced with a real review and `sample` is set to false.
 */
export default function Testimonials() {
  const [i, setI] = useState(0)
  const [dir, setDir] = useState(1)
  const start = useRef(null)
  const t = testimonials[i]
  const go = (d) => {
    setDir(d)
    setI((cur) => (cur + d + testimonials.length) % testimonials.length)
  }

  return (
    <section id="reviews" aria-labelledby="reviews-title" className="relative overflow-hidden bg-ivory section-pad">
      <div className="container-wide">
        <SectionHeading number="09" eyebrow="Client love" id="reviews-title" size="display-md">
          Kind words, <em className="italic-accent text-rose-ink">in their own voices.</em>
        </SectionHeading>

        <Reveal className="relative mx-auto mt-16 max-w-5xl text-center lg:mt-24">
          <svg aria-hidden="true" viewBox="0 0 80 60" className="mx-auto mb-8 h-10 w-12 text-gold">
            <path fill="currentColor" d="M0 60V33C0 13 11 2 30 0v10C20 12 16 19 16 27h14v33zm45 0V33C45 13 56 2 75 0v10C65 12 61 19 61 27h14v33z" />
          </svg>

          <div
            aria-live="polite"
            onPointerDown={(e) => (start.current = e.clientX)}
            onPointerUp={(e) => {
              if (start.current === null) return
              const dx = e.clientX - start.current
              start.current = null
              if (Math.abs(dx) > 60) go(dx < 0 ? 1 : -1)
            }}
            style={{ touchAction: 'pan-y' }}
          >
            <figure key={i} className="quote-in m-0" style={{ '--dir': dir }}>
              <blockquote className="font-display text-[clamp(1.3rem,2.5vw,2.2rem)] italic leading-[1.3] tracking-[-0.01em] text-burgundy text-balance">“{t.quote}”</blockquote>
              <figcaption className="mt-10 flex flex-col items-center gap-1">
                <span className="eyebrow text-espresso">{t.name}</span>
                <span className="text-[0.85rem] text-ink-soft">{t.detail}</span>
                {t.sample && <span className="eyebrow mt-4 border border-gold-ink/50 px-3 py-1.5 !text-[0.58rem] text-gold-ink">Sample review</span>}
              </figcaption>
            </figure>
          </div>

          <div className="mt-14 flex items-center justify-center gap-8">
            <button type="button" onClick={() => go(-1)} aria-label="Previous review" className="icon-btn touch-target">
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-3" role="tablist" aria-label="Choose a review">
              {testimonials.map((_, n) => (
                <button key={n} role="tab" aria-selected={n === i} aria-label={`Review ${n + 1} of ${testimonials.length}`} onClick={() => { setDir(n > i ? 1 : -1); setI(n) }} className="touch-target grid h-8 w-8 place-items-center">
                  <span className={`block h-px transition-all duration-700 [transition-timing-function:var(--ease-expo)] ${n === i ? 'w-9 bg-burgundy' : 'w-4 bg-burgundy/30'}`} />
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(1)} aria-label="Next review" className="icon-btn touch-target">
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
