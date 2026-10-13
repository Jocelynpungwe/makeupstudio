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

        <Reveal stagger={0.14} className="mx-auto mt-14 grid max-w-[62rem] items-end gap-5 lg:mt-20 lg:grid-cols-3 lg:gap-0">
          {collections.map((c, i) => (
            <article
              key={c.id}
              aria-labelledby={`col-${c.id}`}
              className={`relative flex flex-col px-6 py-8 sm:px-8 sm:py-9 ${skinOf(c)} ${c.featured ? 'z-10 lg:-my-7 lg:py-14 lg:shadow-[var(--shadow-lift)]' : 'lg:py-11'} ${i === 2 ? 'lg:min-h-[33rem]' : 'lg:min-h-[30rem]'}`}
            >
              {c.featured && <span className="eyebrow absolute left-0 right-0 top-0 bg-gold py-2.5 text-center !text-[0.62rem] text-espresso-deep">Featured collection</span>}
              <p className={`eyebrow ${c.featured ? 'mt-6 text-gold' : 'text-gold-ink'} ${c.id === 'statement' ? '!text-gold' : ''}`}>{`0${i + 1} · ${c.kicker}`}</p>
              <h3 id={`col-${c.id}`} className="display-md mt-4 mb-4">
                {c.name}
              </h3>
              <p className={`text-[0.92rem] leading-relaxed ${c.featured || c.id === 'statement' ? 'text-ivory/85' : 'text-ink-soft'}`}>{c.body}</p>

              <ul className="mt-6 space-y-2.5 border-t border-current/15 pt-6">
                {c.includes.map((line) => (
                  <li key={line} className="flex items-start gap-3 text-[0.88rem] leading-snug">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" strokeWidth={1.6} aria-hidden="true" />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>

              <ServiceMeta price={c.price} duration={c.duration} className="mt-auto border-t border-current/15 pt-6" />
              <Button to="/#booking" onClick={() => bookingStore.selectService('collection-' + c.id)} variant={c.featured ? 'gold' : c.id === 'statement' ? 'light' : 'primary'} className="mt-6 w-full">
                Book {c.name}
              </Button>
            </article>
          ))}
        </Reveal>

        <p className="mx-auto mt-12 max-w-xl text-center text-[0.82rem] leading-relaxed text-ink-soft">Prices are in Canadian dollars, before HST, for one person and exclude add-ons. Your exact quote and timing are confirmed when we reply to your request.</p>
      </div>
    </section>
  )
}
