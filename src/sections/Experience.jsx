import { useEffect, useRef, useState } from 'react'
import { experienceSteps as steps } from '../data/content'
import { useMediaQuery, useReducedMotion } from '../hooks/useMedia'
import { ScrollTrigger } from '../lib/gsap'
import SectionHeading from '../components/ui/SectionHeading'
import ImageReveal from '../components/animations/ImageReveal'
import Reveal from '../components/animations/Reveal'
import Picture from '../components/ui/Picture'

const EASE = '[transition-timing-function:var(--ease-expo)]'

function Heading() {
  return (
    <SectionHeading number="05" eyebrow="The experience" id="experience-title" size="display-lg">
      Your moment of <em className="italic-accent text-rose-ink">beauty.</em>
    </SectionHeading>
  )
}

/** Desktop: a pinned stage. Scroll advances the appointment one step at a time. */
function Pinned() {
  const section = useRef(null)
  const fill = useRef(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: section.current,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const i = Math.min(steps.length - 1, Math.floor(self.progress * steps.length * 0.999))
        setActive((cur) => (cur === i ? cur : i))
        fill.current?.style.setProperty('--p', self.progress.toFixed(3))
      },
    })
    return () => st.kill()
  }, [])

  return (
    <section ref={section} id="experience" aria-labelledby="experience-title" className="relative bg-ivory" style={{ height: `${steps.length * 100 + 40}svh` }}>
      {/* the full process, in order, for assistive tech */}
      <div className="sr-only">
        <h2 id="experience-title">Your moment of beauty: the appointment, step by step</h2>
        <ol>
          {steps.map((s) => (
            <li key={s.n}>
              <strong>{s.title}.</strong> {s.body}
            </li>
          ))}
        </ol>
      </div>

      <div className="sticky top-0 flex h-[100svh] min-h-[600px] items-center overflow-hidden" aria-hidden="true">
        <div className="container-wide grid w-full grid-cols-12 items-center gap-x-8">
          <div className="relative col-span-6 flex h-[min(78svh,50rem)] flex-col justify-between pt-[var(--header-h)]">
            <div className="display-lg text-burgundy">
              <span className="eyebrow mb-6 flex items-center gap-4 text-gold-ink">
                <span>05</span>
                <span className="h-px w-10 bg-gold-ink/60" />
                <span className="text-ink-soft">The experience</span>
              </span>
              Your moment of <em className="italic-accent text-rose-ink">beauty.</em>
            </div>

            <div className="relative h-[min(40svh,22rem)]">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  className={`absolute inset-x-0 bottom-0 transition-[opacity,transform] duration-[1100ms] ${EASE}`}
                  style={{ opacity: i === active ? 1 : 0, transform: `translateY(${(i - active) * 56}px)` }}
                >
                  <span className="pointer-events-none absolute -top-[0.42em] left-[-0.04em] select-none font-display text-[clamp(5.5rem,10.5vw,9.5rem)] leading-none text-transparent [-webkit-text-stroke:1.3px_rgb(185_154_107/0.75)]" style={{ fontVariationSettings: '"opsz" 96' }}>
                    {s.n}
                  </span>
                  <div className="relative pt-[clamp(3.5rem,6.5vw,6rem)]">
                    <h3 className="display-md mb-5 text-burgundy">{s.title}</h3>
                    <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative col-span-5 col-start-8 pt-[var(--header-h)]">
            <div className="relative mx-auto aspect-[4/5] h-[min(70svh,44rem)] max-w-full overflow-hidden bg-champagne">
              {steps.map((s, i) => (
                <div
                  key={s.n}
                  className={`absolute inset-0 transition-[clip-path] duration-[1300ms] ${EASE}`}
                  style={{ clipPath: i === active ? 'inset(0 0 0 0)' : i < active ? 'inset(0 0 100% 0)' : 'inset(100% 0 0 0)' }}
                >
                  <div className={`h-full w-full transition-transform duration-[1800ms] ${EASE}`} style={{ transform: i === active ? 'scale(1)' : 'scale(1.18)' }}>
                    <Picture name={s.image} sizes="40vw" className="h-full w-full object-cover" />
                  </div>
                </div>
              ))}
              <span className="eyebrow absolute bottom-4 left-4 bg-espresso-deep/70 px-3 py-2 !text-[0.56rem] text-ivory">Inspiration imagery</span>
            </div>

            <div ref={fill} className="mx-auto mt-6 flex max-w-full items-center justify-between gap-4" style={{ width: 'min(70svh * 0.8, 100%)' }}>
              <span className="eyebrow text-ink-soft">
                {steps[active].n} <span>/ 0{steps.length}</span>
              </span>
              <span className="relative h-px flex-1 bg-line">
                <span className="absolute inset-y-0 left-0 w-full origin-left bg-gold-ink" style={{ transform: 'scaleX(var(--p, 0))' }} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/** Phones and reduced motion: the same story as a calm vertical sequence, no pinning. */
function Stacked() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="bg-ivory section-pad">
      <div className="container-wide">
        <Heading />
        <ol className="mt-16 grid gap-y-20 lg:mt-24 lg:gap-y-28">
          {steps.map((s, i) => (
            <li key={s.n} className={`grid items-center gap-x-12 gap-y-8 lg:grid-cols-12 ${i % 2 ? 'lg:[&>*:first-child]:order-2' : ''}`}>
              <ImageReveal name={s.image} ratio="4 / 5" sizes="(min-width: 1024px) 40vw, 92vw" className="w-full lg:col-span-5" />
              <Reveal className="lg:col-span-6 lg:col-start-7">
                <span className="font-display text-[clamp(3.5rem,11vw,6.5rem)] leading-none text-transparent [-webkit-text-stroke:1.2px_rgb(185_154_107/0.8)]" aria-hidden="true">
                  {s.n}
                </span>
                <h3 className="display-md -mt-4 mb-4 text-burgundy">{s.title}</h3>
                <p className="max-w-md text-[1.02rem] leading-relaxed text-ink-soft">{s.body}</p>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

export default function Experience() {
  const wide = useMediaQuery('(min-width: 1024px) and (min-height: 640px)')
  const reduced = useReducedMotion()
  return wide && !reduced ? <Pinned /> : <Stacked />
}
