import { Check } from 'lucide-react'
import { collections } from '../data/content'
import { bookingStore } from '../lib/bookingStore'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'
import Button from '../components/ui/Button'
import ServiceMeta from '../components/ui/ServiceMeta'

const SKIN = {
  light: 'bg-ivory text-espresso border border-line',
  featured: 'on-dark bg-burgundy text-ivory',
  deep: 'on-dark bg-espresso text-ivory',
}

export default function Collections() {
  const skinOf = (c) => (c.featured ? SKIN.featured : c.id === 'statement' ? SKIN.deep : SKIN.light)

  return (
    <section id="collections" aria-labelledby="collections-title" className="bg-champagne-soft section-pad">
      <div className="container-wide">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading align="center" number="06" eyebrow="Signature collections" id="collections-title" size="display-xl" lede="Three ways to be made up, from timeless to unforgettable. Choose the one that matches your moment.">
            Choose your <em className="italic-accent text-rose-ink">finish.</em>
          </SectionHeading>
        </div>

        <Reveal stagger={0.14} className="mt-20 grid items-end gap-6 lg:mt-28 lg:grid-cols-3 lg:gap-0">
          {collections.map((c, i) => (
            <article
              key={c.id}
              aria-labelledby={`col-${c.id}`}
              className={`relative flex flex-col px-8 py-10 sm:px-12 sm:py-14 ${skinOf(c)} ${c.featured ? 'z-10 lg:-my-10 lg:py-24 lg:shadow-[var(--shadow-lift)]' : 'lg:py-16'} ${i === 2 ? 'lg:min-h-[44rem]' : 'lg:min-h-[40rem]'}`}
            >
              {c.featured && <span className="eyebrow absolute left-0 right-0 top-0 bg-gold py-2.5 text-center !text-[0.62rem] text-espresso-deep">Featured collection</span>}
              <p className={`eyebrow ${c.featured ? 'mt-6 text-gold' : 'text-gold-ink'} ${c.id === 'statement' ? '!text-gold' : ''}`}>{`0${i + 1} · ${c.kicker}`}</p>
              <h3 id={`col-${c.id}`} className="display-lg mt-5 mb-6">
                {c.name}
              </h3>
              <p className={`leading-relaxed ${c.featured || c.id === 'statement' ? 'text-ivory/85' : 'text-ink-soft'}`}>{c.body}</p>

              <ul className="mt-9 space-y-3.5 border-t border-current/15 pt-8">
                {c.includes.map((line) => (
                  <li key={line} className="flex items-start gap-3.5 text-[0.95rem] leading-snug">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <ServiceMeta price={c.price} duration={c.duration} className="mt-auto border-t border-current/15 pt-8" />
              <Button to="/#booking" onClick={() => bookingStore.selectService('collection-' + c.id)} variant={c.featured ? 'gold' : c.id === 'statement' ? 'light' : 'primary'} className="mt-9 w-full">
                Book {c.name}
              </Button>
            </article>
          ))}
        </Reveal>

        <p className="mx-auto mt-14 max-w-xl text-center text-[0.82rem] leading-relaxed text-ink-soft">Prices shown are for one person and exclude add-ons. Your exact quote and timing are confirmed when we reply to your request.</p>
      </div>
    </section>
  )
}
