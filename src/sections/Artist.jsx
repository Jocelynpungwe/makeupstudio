import { artistProfile as a } from '../data/content'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'
import ImageReveal from '../components/animations/ImageReveal'
import Button from '../components/ui/Button'

/** Every fact here is an editable placeholder (src/data/content.js). No credentials or experience are claimed. */
export default function Artist() {
  return (
    <section id="about" aria-labelledby="artist-title" className="bg-ivory section-pad">
      <div className="container-wide">
        <div className="grid items-start gap-x-16 gap-y-16 lg:grid-cols-12">
          <div className="relative lg:col-span-5">
            {/* offset gold frame behind the portrait */}
            <span aria-hidden="true" className="absolute -bottom-5 -right-5 top-5 left-5 border border-gold" />
            <ImageReveal name="artist-portrait-placeholder" ratio="4 / 5" eager sizes="(min-width: 1024px) 38vw, 92vw" parallax className="relative z-[1] w-full" />
            <p className="eyebrow relative z-[1] mt-8 !text-[0.58rem] !tracking-[0.18em] text-ink-soft">Portrait: licensed stock photograph, to be replaced with the artist’s own</p>
          </div>

          <div className="lg:col-span-6 lg:col-start-7 lg:pt-6">
            <SectionHeading number="07" eyebrow="Meet your makeup artist" id="artist-title" size="display-xl">
              The artist behind <em className="italic-accent text-rose-ink">the details.</em>
            </SectionHeading>

            <Reveal delay={0.1} className="mt-12">
              <p className="display-sm italic text-burgundy">{a.name}</p>
              <p className="eyebrow mt-2 text-gold-ink">{a.role}</p>
              <p className="mt-7 max-w-xl text-[1.05rem] leading-[1.85] text-ink-soft">{a.story}</p>
            </Reveal>

            <Reveal as="dl" stagger={0.08} className="mt-12 border-t border-line">
              {a.fields.map((f) => (
                <div key={f.label} className="grid gap-x-8 gap-y-1 border-b border-line py-5 sm:grid-cols-[11rem_1fr]">
                  <dt className="eyebrow pt-1 text-gold-ink">{f.label}</dt>
                  <dd className="text-[0.98rem] leading-relaxed text-ink-soft">{f.value}</dd>
                </div>
              ))}
            </Reveal>

            <Reveal delay={0.1} className="mt-12">
              <Button to="/#booking" variant="outline">
                Book a consultation
              </Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
