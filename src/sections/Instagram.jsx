import { useRef } from 'react'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { site } from '../data/site'
import { instagramPosts } from '../data/gallery'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'
import Picture from '../components/ui/Picture'
import Button from '../components/ui/Button'
import { InstagramIcon } from '../components/ui/icons'

/**
 * An Instagram-inspired strip. It is a curated static gallery of inspiration images,
 * clearly labelled as such. It is NOT a live feed and does not pretend to be one.
 */
export default function Instagram() {
  const rail = useRef(null)
  const drag = useRef({ down: false, x: 0, left: 0, moved: false })

  const scrollBy = (dir) => rail.current?.scrollBy({ left: dir * Math.min(rail.current.clientWidth * 0.8, 720), behavior: 'smooth' })

  return (
    <section id="instagram" aria-labelledby="instagram-title" className="bg-ivory section-pad !pb-0 overflow-hidden">
      <div className="container-wide">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <SectionHeading number="11" eyebrow={site.instagram.handle} id="instagram-title" size="display-xl">
              Follow the <em className="italic-accent text-rose-ink">artistry.</em>
            </SectionHeading>
          </div>
          <Reveal delay={0.2} className="lg:col-span-4 lg:justify-self-end">
            <p className="lede mb-8">A curated strip of inspiration. It is a static gallery of stock imagery, not a live Instagram feed.</p>
            <Button href={site.instagram.url} variant="outline">
              <span className="inline-flex items-center gap-3">
                <InstagramIcon /> Follow on Instagram
              </span>
            </Button>
          </Reveal>
        </div>
      </div>

      <div className="relative mt-16 lg:mt-24">
        <div
          ref={rail}
          className="rail-scroll flex cursor-grab snap-x snap-mandatory gap-4 overflow-x-auto px-[var(--gutter)] pb-2 active:cursor-grabbing sm:gap-6"
          data-cursor="drag"
          data-lenis-prevent
          onPointerDown={(e) => {
            if (e.pointerType !== 'mouse') return
            drag.current = { down: true, x: e.clientX, left: rail.current.scrollLeft, moved: false }
          }}
          onPointerMove={(e) => {
            const s = drag.current
            if (!s.down) return
            const dx = e.clientX - s.x
            if (Math.abs(dx) > 4) s.moved = true
            rail.current.scrollLeft = s.left - dx
          }}
          onPointerUp={() => (drag.current.down = false)}
          onPointerLeave={() => (drag.current.down = false)}
          tabIndex={0}
          role="region"
          aria-label="Inspiration gallery, scrollable"
        >
          {instagramPosts.map((name, i) => (
            <a
              key={name}
              href={site.instagram.url}
              target="_blank"
              rel="noopener noreferrer"
              draggable="false"
              onClick={(e) => drag.current.moved && e.preventDefault()}
              className="group relative block w-[68vw] shrink-0 snap-start overflow-hidden bg-champagne sm:w-[34vw] lg:w-[22vw] xl:w-[18vw]"
              style={{ aspectRatio: '4 / 5.4' }}
              aria-label={`Open Instagram, inspiration image ${i + 1}`}
            >
              <Picture name={name} sizes="(min-width: 1024px) 22vw, 68vw" draggable="false" className="h-full w-full object-cover transition-transform duration-[1600ms] [transition-timing-function:var(--ease-expo)] group-hover:scale-[1.06]" />
              <span className="pointer-events-none absolute inset-0 grid place-items-center bg-burgundy/55 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                <InstagramIcon className="h-8 w-8 text-ivory" strokeWidth={1.2} />
              </span>
            </a>
          ))}
          <span className="w-[var(--gutter)] shrink-0" aria-hidden="true" />
        </div>

        <div className="container-wide mt-8 flex items-center justify-between pb-10">
          <p className="eyebrow !text-[0.58rem] !tracking-[0.18em] text-ink-soft">Inspiration imagery: licensed stock photography</p>
          <div className="flex gap-3">
            <button type="button" onClick={() => scrollBy(-1)} aria-label="Scroll gallery left" className="icon-btn touch-target">
              <ArrowLeft className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <button type="button" onClick={() => scrollBy(1)} aria-label="Scroll gallery right" className="icon-btn touch-target">
              <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
