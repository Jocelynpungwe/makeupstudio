import { useState } from 'react'
import { Plus } from 'lucide-react'
import { faqs } from '../data/content'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'

export default function Faq() {
  const [open, setOpen] = useState(0)

  return (
    <section id="faq" aria-labelledby="faq-title" className="bg-champagne-soft section-pad">
      <div className="container-wide">
        <div className="grid gap-x-16 gap-y-14 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <SectionHeading number="12" eyebrow="Questions" id="faq-title" size="display-lg" lede="The things clients ask most. Anything else, send us a message with your request.">
                Frequently <em className="italic-accent text-rose-ink">asked.</em>
              </SectionHeading>
            </div>
          </div>

          <Reveal className="lg:col-span-8">
            <div className="border-t border-burgundy/30">
              {faqs.map((f, i) => {
                const on = open === i
                return (
                  <div key={f.q} className="border-b border-burgundy/20">
                    <h3>
                      <button
                        type="button"
                        id={`faq-q-${i}`}
                        aria-expanded={on}
                        aria-controls={`faq-a-${i}`}
                        onClick={() => setOpen(on ? -1 : i)}
                        className="group flex w-full items-start justify-between gap-8 py-6 text-left sm:py-7"
                      >
                        <span className="font-display text-[clamp(1.05rem,1.6vw,1.35rem)] leading-snug text-burgundy transition-transform duration-700 [transition-timing-function:var(--ease-expo)] group-hover:translate-x-1.5">{f.q}</span>
                        <span className="mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full border border-burgundy/30 text-burgundy transition-colors duration-500 group-hover:bg-burgundy group-hover:text-ivory" aria-hidden="true">
                          <Plus className={`h-4 w-4 transition-transform duration-500 ${on ? 'rotate-45' : ''}`} strokeWidth={1.5} />
                        </span>
                      </button>
                    </h3>
                    <div id={`faq-a-${i}`} role="region" aria-labelledby={`faq-q-${i}`} className="accordion-panel" data-open={on}>
                      <div>
                        <p className="max-w-2xl pb-8 text-[1.02rem] leading-[1.8] text-ink-soft">{f.a}</p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
