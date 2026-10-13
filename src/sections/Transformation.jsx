import { useState } from 'react'
import { comparisons } from '../data/content'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'
import BeforeAfter from '../components/ui/BeforeAfter'

export default function Transformation() {
  const [id, setId] = useState(comparisons[0].id)
  const pair = comparisons.find((c) => c.id === id)

  return (
    <section id="transformation" aria-labelledby="transformation-title" className="on-dark relative overflow-hidden bg-burgundy text-ivory section-pad">
      <div aria-hidden="true" className="pointer-events-none absolute -right-40 -top-40 h-[34rem] w-[34rem] rounded-full bg-rose/10 blur-3xl" />
      <div className="container-wide relative">
        <SectionHeading dark number="04" eyebrow="Before & after" id="transformation-title" size="display-xl" lede="Drag to see how a look develops, from prepared skin to the finished glow.">
          The transformation <em className="italic-accent text-rose">experience.</em>
        </SectionHeading>

        <div className="mt-16 grid gap-x-10 gap-y-14 lg:mt-24 lg:grid-cols-12">
          <div className="lg:col-span-4">

            <Reveal delay={0.2}>
              <div role="tablist" aria-label="Choose a comparison" className="border-t border-ivory/20">
                {comparisons.map((c, i) => {
                  const on = c.id === id
                  return (
                    <button
                      key={c.id}
                      role="tab"
                      type="button"
                      id={`tab-${c.id}`}
                      aria-selected={on}
                      aria-controls="comparison-panel"
                      tabIndex={on ? 0 : -1}
                      onClick={() => setId(c.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'ArrowDown' || e.key === 'ArrowRight') setId(comparisons[(i + 1) % comparisons.length].id)
                        if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') setId(comparisons[(i - 1 + comparisons.length) % comparisons.length].id)
                      }}
                      className={`touch-target group flex w-full items-baseline gap-5 border-b border-ivory/20 py-5 text-left transition-colors duration-500 ${on ? 'text-ivory' : 'text-ivory/55 hover:text-ivory'}`}
                    >
                      <span className={`eyebrow ${on ? 'text-gold' : ''}`}>0{i + 1}</span>
                      <span className="flex-1">
                        <span className="display-sm block">{c.label}</span>
                        <span className="mt-1 block text-[0.84rem] opacity-70">{c.title}</span>
                      </span>
                      <span aria-hidden="true" className={`h-px bg-gold transition-all duration-700 [transition-timing-function:var(--ease-expo)] ${on ? 'w-10' : 'w-0'}`} />
                    </button>
                  )
                })}
              </div>
            </Reveal>

            <Reveal delay={0.3} className="mt-10 border border-ivory/20 p-5 text-[0.82rem] leading-relaxed text-ivory/75">
              <p className="eyebrow mb-2 !text-[0.6rem] text-gold">Demonstration only</p>
              These comparisons are stills from licensed stock footage, showing two stages of one makeup session. They are not client results. The studio’s own before and after photographs replace them here.
            </Reveal>
          </div>

          <Reveal className="lg:col-span-8" y={50}>
            <div id="comparison-panel" role="tabpanel" aria-labelledby={`tab-${id}`} className="mx-auto w-full max-w-[36rem] lg:ml-auto lg:mr-0">
              <BeforeAfter key={pair.id} pair={pair} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
