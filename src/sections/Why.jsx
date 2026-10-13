import { Armchair, Brush, Gem, Palette, ScanEye, Sparkles } from 'lucide-react'
import { whyPoints } from '../data/content'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'

const ICONS = { ScanEye, Palette, Sparkles, Gem, Brush, Armchair }

export default function Why() {
  return (
    <section id="why" aria-labelledby="why-title" className="on-dark relative overflow-hidden bg-espresso text-ivory section-pad">
      <span aria-hidden="true" className="pointer-events-none absolute -left-24 bottom-0 select-none font-display text-[26rem] italic leading-none text-ivory/[0.03]">
        A
      </span>
      <div className="container-wide relative">
        <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
          <SectionHeading dark number="08" eyebrow="Why choose us" id="why-title" size="display-xl" className="lg:col-span-8">
            Made with care, <em className="italic-accent text-rose">down to the finish.</em>
          </SectionHeading>
          <Reveal delay={0.2} className="lg:col-span-4">
            <p className="lede">What you can expect when you sit in the chair: considered work, honest guidance and time that is never rushed.</p>
          </Reveal>
        </div>

        <Reveal as="ul" stagger={0.1} className="mt-20 grid gap-x-12 gap-y-14 sm:grid-cols-2 lg:mt-28 lg:grid-cols-3">
          {whyPoints.map((p, i) => {
            const Icon = ICONS[p.icon]
            return (
              <li key={p.title} className="group border-t border-ivory/20 pt-8 transition-colors duration-700 hover:border-gold">
                <div className="mb-8 flex items-center justify-between">
                  <Icon className="h-7 w-7 text-gold" strokeWidth={1.1} aria-hidden="true" />
                  <span className="eyebrow !text-[0.6rem] text-ivory/40">0{i + 1}</span>
                </div>
                <h3 className="display-sm mb-3 text-ivory">{p.title}</h3>
                <p className="max-w-sm text-[0.96rem] leading-relaxed text-ivory/70">{p.body}</p>
              </li>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}
