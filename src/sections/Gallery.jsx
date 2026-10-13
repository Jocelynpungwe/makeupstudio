import { useLayoutEffect, useMemo, useRef, useState } from 'react'
import { galleryCategories, galleryItems } from '../data/gallery'
import { fullSrc, img } from '../lib/media'
import { onceInView, prefersReducedMotion } from '../lib/inview'
import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'
import Picture from '../components/ui/Picture'
import Button from '../components/ui/Button'
import Lightbox from '../components/ui/Lightbox'

const INITIAL = 15
const labelOf = (id) => galleryCategories.find((c) => c.id === id)?.label

export default function Gallery() {
  const [filter, setFilter] = useState('all')
  const [expanded, setExpanded] = useState(false)
  const [viewer, setViewer] = useState(null)
  const grid = useRef(null)

  const filtered = useMemo(() => (filter === 'all' ? galleryItems : galleryItems.filter((i) => i.category === filter)), [filter])
  const visible = filter === 'all' && !expanded ? filtered.slice(0, INITIAL) : filtered
  const viewerItems = useMemo(() => visible.map((v) => ({ src: fullSrc(v.image), alt: img(v.image)?.alt ?? '', label: labelOf(v.category) })), [visible])

  // Entrance for whatever is on screen, re-run when the filter changes (CSS transition, one shared observer)
  useLayoutEffect(() => {
    if (prefersReducedMotion()) return
    const items = [...grid.current.querySelectorAll('[data-gi]')]
    const stops = items.map((el, i) => {
      el.style.setProperty('--ry', '40px')
      el.style.setProperty('--rd', `${(i % 4) * 0.08}s`)
      el.classList.add('rv-pre')
      return onceInView(el, () => {
        el.classList.remove('rv-pre')
        el.classList.add('rv-in')
      }, '0px 0px -4% 0px')
    })
    return () => {
      stops.forEach((s) => s())
      items.forEach((el) => el.classList.remove('rv-pre', 'rv-in'))
    }
  }, [visible])

  const pick = (id) => {
    setFilter(id)
    setExpanded(false)
  }

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="bg-ivory section-pad">
      <div className="container-wide">
        <div className="grid items-end gap-10 lg:grid-cols-12">
          <SectionHeading number="03" eyebrow="The gallery" id="gallery-title" size="display-xl" className="lg:col-span-8">
            Looks worth <em className="italic-accent text-rose-ink">framing.</em>
          </SectionHeading>
          <Reveal delay={0.2} className="lg:col-span-4">
            <p className="lede">A curated range, from quiet glow to full glamour. Every image here is licensed stock photography shown as inspiration, not the studio’s own client portfolio.</p>
          </Reveal>
        </div>

        {/* filters */}
        <Reveal className="mt-14 border-y border-line">
          <div role="group" aria-label="Filter the gallery by style" className="rail-scroll -mx-[var(--gutter)] flex gap-8 overflow-x-auto px-[var(--gutter)] py-5 sm:mx-0 sm:flex-wrap sm:gap-x-9 sm:px-0">
            {galleryCategories.map((c) => {
              const on = filter === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(c.id)}
                  className={`eyebrow touch-target relative shrink-0 whitespace-nowrap py-2 !tracking-[0.22em] transition-colors duration-500 ${on ? 'text-burgundy' : 'text-ink-soft hover:text-burgundy'}`}
                >
                  {c.label}
                  <span aria-hidden="true" className={`absolute inset-x-0 -bottom-0.5 h-px origin-left bg-burgundy transition-transform duration-700 [transition-timing-function:var(--ease-expo)] ${on ? 'scale-x-100' : 'scale-x-0'}`} />
                </button>
              )
            })}
          </div>
        </Reveal>
        <p className="mt-5 text-[0.82rem] text-ink-soft" aria-live="polite">
          Showing {visible.length} of {filtered.length} {filter === 'all' ? '' : `${labelOf(filter)} `}looks
        </p>

        {/* masonry */}
        <div ref={grid} className="masonry mt-10 columns-2 md:columns-3 xl:columns-4">
          {visible.map((item, i) => {
            return (
              <figure key={item.image} data-gi className="group relative">
                <button
                  type="button"
                  onClick={() => setViewer(i)}
                  data-cursor="view"
                  className="relative block w-full overflow-hidden bg-champagne text-left"
                  style={{ aspectRatio: item.ratio }}
                >
                  <Picture name={item.image} sizes="(min-width: 1280px) 22vw, (min-width: 768px) 30vw, 48vw" className="h-full w-full object-cover transition-transform duration-[1600ms] [transition-timing-function:var(--ease-expo)] group-hover:scale-[1.07]" />
                  <span aria-hidden="true" className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-espresso-deep/80 via-espresso-deep/25 to-transparent px-4 pb-4 pt-16 text-ivory opacity-0 transition-opacity duration-700 group-hover:opacity-100 group-focus-within:opacity-100">
                    <span className="eyebrow !text-[0.58rem]">{labelOf(item.category)}</span>
                    <span className="eyebrow !text-[0.58rem] text-gold">View</span>
                  </span>
                </button>
              </figure>
            )
          })}
        </div>

        {filter === 'all' && !expanded && (
          <div className="mt-6 text-center">
            <Button variant="outline" onClick={() => setExpanded(true)}>
              View all {galleryItems.length} looks
            </Button>
          </div>
        )}
      </div>

      <Lightbox items={viewerItems} index={viewer} onClose={() => setViewer(null)} onChange={setViewer} />
    </section>
  )
}
