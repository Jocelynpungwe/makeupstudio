import { useState } from 'react'
import { Plus } from 'lucide-react'
import { useMediaQuery } from '../hooks/useMedia'
import { services } from '../data/services'
import { bookingStore } from '../lib/bookingStore'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'
import Picture from '../components/ui/Picture'
import Button from '../components/ui/Button'
import ServiceMeta from '../components/ui/ServiceMeta'

/**
 * An editorial index rather than a card grid. On desktop, hovering or focusing a service swaps the
 * sticky photograph and its details. On touch screens each row opens inline.
 */
export default function Services() {
  const [active, setActive] = useState(0)
  const [openMobile, setOpenMobile] = useState(0)
  const desktop = useMediaQuery('(min-width: 1024px)')
  const current = services[active]

  return (
    <section id="services" aria-labelledby="services-title" className="bg-champagne-soft section-pad">
      <div className="container-wide">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16">
          {/* sticky preview, desktop only */}
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <SectionHeading number="02" eyebrow="Our services" id="services-title" size="display-lg" lede="Eight ways to begin. Every service starts with a conversation and ends with a look that feels like you.">
                Makeup, <em className="italic-accent text-rose-ink">tailored</em> to every occasion.
              </SectionHeading>

              <div className="mt-14 hidden lg:block">
                <div className="relative aspect-[4/5] w-full max-w-[28rem] overflow-hidden bg-champagne" aria-hidden="true">
                  {services.map((s, i) => (
                    <div key={s.id} className="absolute inset-0 transition-[opacity,transform] duration-[900ms] [transition-timing-function:var(--ease-expo)]" style={{ opacity: i === active ? 1 : 0, transform: i === active ? 'scale(1)' : 'scale(1.06)' }}>
                      <Picture name={s.image} sizes="28rem" className="h-full w-full object-cover" />
                    </div>
                  ))}
                  <span className="eyebrow absolute bottom-4 left-4 bg-espresso-deep/70 px-3 py-2 !text-[0.56rem] text-ivory">Inspiration imagery</span>
                </div>
                <div key={current.id} className="mt-8 max-w-[28rem] animate-[fade-up_0.8s_var(--ease-expo)_both]">
                  <p className="text-[0.98rem] leading-relaxed text-ink-soft">{current.long}</p>
                  <ServiceMeta price={current.price} duration={current.duration} className="mt-7 border-t border-line pt-6 text-burgundy" />
                  <Button to="/#booking" onClick={() => bookingStore.selectService(current.id)} className="mt-8">
                    Request {current.name}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* the index */}
          <div className="col-span-12 lg:col-span-7">
            <Reveal as="ul" stagger={0.06} className="border-t border-burgundy/30">
              {services.map((s, i) => {
                const isOpen = openMobile === i
                const isActive = active === i
                return (
                  <li key={s.id} className="border-b border-burgundy/20">
                    <button
                      type="button"
                      className="group flex w-full items-start gap-5 py-6 text-left sm:gap-8 sm:py-8 lg:py-9"
                      {...(desktop ? {} : { 'aria-expanded': isOpen, 'aria-controls': `service-panel-${s.id}` })}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      onClick={() => {
                        setActive(i)
                        if (!desktop) setOpenMobile(isOpen ? -1 : i)
                      }}
                    >
                      <span className="eyebrow mt-3 w-7 shrink-0 text-gold-ink sm:mt-4">0{i + 1}</span>
                      <span className="flex-1">
                        <span className={`display-md block transition-[color,transform] duration-700 [transition-timing-function:var(--ease-expo)] lg:group-hover:translate-x-2 ${isActive ? 'text-burgundy lg:translate-x-2' : 'text-burgundy/80 lg:text-burgundy/55'}`}>{s.name}</span>
                        <span className="mt-2 block max-w-[34rem] text-[0.95rem] leading-relaxed text-ink-soft">{s.short}</span>
                      </span>
                      <span className="mt-3 grid h-9 w-9 shrink-0 place-items-center rounded-full border border-burgundy/30 text-burgundy transition-[transform,background-color,color] duration-500 group-hover:bg-burgundy group-hover:text-ivory lg:hidden" aria-hidden="true">
                        <Plus className={`h-4 w-4 transition-transform duration-500 ${isOpen ? 'rotate-45' : ''}`} strokeWidth={1.5} />
                      </span>
                    </button>

                    {/* inline details: touch screens only (desktop uses the sticky preview) */}
                    <div id={`service-panel-${s.id}`} className="accordion-panel lg:hidden" data-open={isOpen} role="region" aria-label={`${s.name} details`}>
                      <div>
                        <div className="grid gap-6 pb-9 sm:grid-cols-[14rem_1fr]">
                          <div className="aspect-[4/5] overflow-hidden bg-champagne sm:aspect-[3/4]">
                            <Picture name={s.image} sizes="(min-width: 640px) 14rem, 90vw" className="h-full w-full object-cover" />
                          </div>
                          <div>
                            <p className="text-[0.98rem] leading-relaxed text-ink-soft">{s.long}</p>
                            <ServiceMeta price={s.price} duration={s.duration} className="mt-6 border-t border-line pt-5 text-burgundy" />
                            <Button to="/#booking" onClick={() => bookingStore.selectService(s.id)} className="mt-7 w-full sm:w-auto">
                              Request this service
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                )
              })}
            </Reveal>
            <p className="mt-6 text-[0.8rem] text-ink-soft">Prices are in Canadian dollars, before HST, and are starting prices for one person. Your exact quote and timing are confirmed when we reply to your request.</p>
          </div>
        </div>
      </div>
    </section>
  )
}
