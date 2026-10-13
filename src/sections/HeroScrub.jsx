import { Fragment, useEffect, useRef } from 'react'
import { heroChapters as C } from '../data/content'
import { SEQUENCE_MEDIA, useHeroMode } from '../hooks/useMedia'
import { createHeroEngine } from '../lib/heroEngine'
import Button from '../components/ui/Button'

// Reduced motion shows the finished frame. Everyone else sees the permanent poster layer from index.html (#boot).
const STILL = { wide: '/media/hero/hero-ending-1920.webp', tall: '/media/hero/hero-ending-mobile.webp' }

const Lines = ({ lines, className = '', delayStep = 0.2 }) =>
  lines.map((line, i) => (
    <Fragment key={line}>
      <span className={`hero-line ${className}`}>
        <span style={{ '--th': i * delayStep }}>{line}</span>
      </span>
      {' '}
    </Fragment>
  ))

/**
 * THE SIGNATURE: a full-screen film that plays forward as you scroll down and backward as you scroll up.
 *  video     desktop + landscape tablets: scroll-scrubbed 1080p/720p film
 *  sequence  phones + portrait tablets: optimised frame sequence on canvas, cropped for portrait
 *  static    reduced motion: a composed still, no scroll hijack
 * The page is complete and beautiful in every mode, including when the film never loads.
 */
export default function HeroScrub() {
  const mode = useHeroMode()
  const sectionRef = useRef(null)
  const stageRef = useRef(null)
  const videoRef = useRef(null)
  const canvasRef = useRef(null)
  const ringRef = useRef(null)
  const bandRefs = useRef([])
  const railRefs = useRef([])

  // tell the page which hero is live: reduced motion hides the HTML poster and shows its own still
  useEffect(() => {
    document.documentElement.dataset.heroMode = mode
    return () => delete document.documentElement.dataset.heroMode
  }, [mode])

  useEffect(() => {
    if (mode === 'static') return
    const engine = createHeroEngine({
      mode,
      section: sectionRef.current,
      stage: stageRef.current,
      video: videoRef.current,
      canvas: canvasRef.current,
      poster: document.querySelector('#boot img'),
      bandEls: bandRefs.current,
      railEls: railRefs.current,
      ringEl: ringRef.current,
    })
    return () => engine.destroy()
  }, [mode])

  const isStatic = mode === 'static'
  const heroHeight = mode === 'sequence' ? '700svh' : '1000svh'
  const setBand = (i) => (el) => (bandRefs.current[i] = el)

  return (
    <section
      id="hero"
      ref={sectionRef}
      aria-label="Introduction"
      className="on-dark relative"
      style={{ height: isStatic ? 'auto' : heroHeight }}
    >
      <div ref={stageRef} className={`${isStatic ? 'relative' : 'sticky top-0'} h-[100svh] min-h-[560px] overflow-hidden`}>
        {/* media: the permanent poster sits behind (index.html #boot); the film or frame sequence fades in above it */}
        <div className="hero-media absolute inset-0" aria-hidden="true">
          {isStatic && (
            <picture>
              <source media={SEQUENCE_MEDIA} srcSet={STILL.tall} />
              <img src={STILL.wide} alt="" width="1920" height="1080" fetchPriority="high" decoding="async" className="!object-cover" />
            </picture>
          )}
          {mode === 'video' && <video ref={videoRef} className="hero-live" muted playsInline preload="none" tabIndex={-1} />}
          {mode === 'sequence' && <canvas ref={canvasRef} className="hero-live" width="540" height="960" />}
        </div>
        <div className="hero-vignette" aria-hidden="true" />

        {isStatic ? (
          <div className="absolute inset-0 flex flex-col justify-end px-[var(--gutter)] pb-[clamp(4rem,10vh,7rem)]">
            <p className="eyebrow mb-6 text-gold">{C.intro.eyebrow}</p>
            <h1 className="display-hero uppercase text-ivory">{C.intro.title.join(' ')}</h1>
            <p className="lede mt-7 max-w-md">{C.intro.lede}</p>
            <div className="mt-9">
              <Button to="/#booking" variant="gold">
                {C.reveal.cta}
              </Button>
            </div>
          </div>
        ) : (
          <>
            <p className="sr-only">A short film follows a makeup application in four chapters as you scroll: the preparation, the artistry, the transformation and the reveal.</p>

            {/* chapter 0: the opening hook */}
            <div ref={setBand(0)} className="hero-band" data-fx="rise" style={{ '--o': 1, '--k': 0 }}>
              <p className="eyebrow hero-fade mb-6 text-gold" style={{ '--th': 0.1 }}>
                {C.intro.eyebrow}
              </p>
              <h1 className="display-hero max-w-[15ch] uppercase text-ivory">
                <Lines lines={C.intro.title} delayStep={0.16} />
              </h1>
              <p className="lede hero-fade mt-7 max-w-[30rem] !text-ivory/90" style={{ '--th': 0.55 }}>
                {C.intro.lede}
              </p>

              {/* scroll cue: lives with the opening beat and fades with it */}
              <div className="absolute bottom-[clamp(3.2rem,9vh,6.5rem)] right-[var(--gutter)] hidden flex-col items-center gap-4 sm:flex" aria-hidden="true">
                <span className="eyebrow [writing-mode:vertical-rl] !tracking-[0.4em]">Scroll</span>
                <span className="scroll-cue-line" />
              </div>
            </div>

            {/* chapter 1: the preparation */}
            <div ref={setBand(1)} className="hero-band" data-fx="rise" style={{ visibility: 'hidden' }}>
              <p className="eyebrow hero-label mb-6 text-gold">{C.prep.label}</p>
              <h2 className="display-lg uppercase text-ivory">
                <Lines lines={C.prep.title} />
              </h2>
            </div>

            {/* chapter 2: the artistry, a liner stroke wipe */}
            <div ref={setBand(2)} className="hero-band" data-fx="wipe" style={{ visibility: 'hidden' }}>
              <p className="eyebrow hero-label mb-6 text-gold">{C.artistry.label}</p>
              <h2 className="display-hero uppercase text-ivory">
                <Lines lines={C.artistry.title} delayStep={0.14} />
              </h2>
            </div>

            {/* chapter 3: the transformation, blooms toward the lens */}
            <div ref={setBand(3)} className="hero-band" data-fx="bloom" style={{ visibility: 'hidden' }}>
              <p className="eyebrow hero-label mb-6 text-gold">{C.glow.label}</p>
              <h2 className="display-hero uppercase text-ivory">
                <Lines lines={C.glow.title} delayStep={0.14} />
              </h2>
            </div>

            {/* chapter 4: the reveal + the one call to action */}
            <div ref={setBand(4)} className="hero-band" data-fx="rise" style={{ visibility: 'hidden' }}>
              <p className="eyebrow hero-label mb-6 text-gold">{C.reveal.label}</p>
              <h2 className="display-hero uppercase text-ivory">
                <Lines lines={C.reveal.title} delayStep={0.14} />
              </h2>
              <div className="hero-fade mt-9" style={{ '--th': 0.62 }}>
                <Button to="/#booking" variant="gold">
                  {C.reveal.cta}
                </Button>
              </div>
            </div>

            {/* chapter rail */}
            <ol className="pointer-events-none absolute right-[var(--gutter)] top-1/2 hidden -translate-y-1/2 flex-col gap-5 md:flex" aria-hidden="true">
              {['01', '02', '03', '04'].map((n, i) => (
                <li key={n} ref={(el) => (railRefs.current[i] = el)} data-active="false" className="group flex items-center justify-end gap-3 text-ivory/45 transition-colors duration-500 data-[active=true]:text-ivory">
                  <span className="eyebrow !text-[0.6rem] opacity-0 transition-opacity duration-500 group-data-[active=true]:opacity-100">{n}</span>
                  <span className="block h-px w-6 bg-current transition-[width,background-color] duration-700 [transition-timing-function:var(--ease-expo)] group-data-[active=true]:w-12 group-data-[active=true]:bg-gold" />
                </li>
              ))}
            </ol>

            {/* loading ring + honest credit */}
            <div className="absolute bottom-4 left-[var(--gutter)] right-[var(--gutter)] flex items-center gap-4 text-ivory/70">
              <span className="eyebrow !text-[0.56rem] !tracking-[0.2em] text-ivory/55">Film: licensed stock footage, shown for illustration</span>
              <span data-ring className="flex items-center gap-2 transition-opacity duration-700 data-[done=true]:opacity-0" data-done="false">
                <svg className="hero-ring h-4 w-4 -rotate-90" viewBox="0 0 48 48" aria-hidden="true">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeOpacity="0.25" strokeWidth="3" />
                  <circle ref={ringRef} cx="24" cy="24" r="20" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="126" style={{ strokeDashoffset: 'var(--ld, 126)' }} />
                </svg>
                <span className="eyebrow !text-[0.56rem]">Loading film</span>
              </span>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
