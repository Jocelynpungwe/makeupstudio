import SectionHeading from '../components/ui/SectionHeading'
import Reveal from '../components/animations/Reveal'
import ImageReveal from '../components/animations/ImageReveal'
import Parallax from '../components/animations/Parallax'

const promises = ['Colour chosen for your undertone', 'Unhurried time in the chair', 'Looks designed around your features']

export default function Welcome() {
  return (
    <section id="welcome" aria-labelledby="welcome-title" className="relative overflow-hidden bg-ivory section-pad">
      {/* a thin gold vertical, the page's first quiet signature */}
      <span aria-hidden="true" className="pointer-events-none absolute left-[var(--gutter)] top-0 hidden h-40 w-px bg-gradient-to-b from-gold to-transparent lg:block" />

      <div className="container-wide">
        <div className="grid grid-cols-12 gap-x-6 gap-y-16 lg:gap-y-0">
          <div className="col-span-12 lg:col-span-7 lg:pt-8">
            <SectionHeading number="01" eyebrow="The atelier" size="display-xl" id="welcome-title">
              More than makeup. <em className="italic-accent text-rose-ink">A{'\u00A0'}form of self-expression.</em>
            </SectionHeading>

            <div className="mt-14 grid gap-10 md:grid-cols-[1.1fr_1fr] lg:mt-20 lg:max-w-[46rem]">
              <Reveal delay={0.1}>
                <p className="lede !max-w-none !text-[clamp(1.1rem,1.4vw,1.3rem)] !text-espresso">
                  Every detail tells a story. From timeless elegance to bold creativity, we bring your vision to life through meticulous craftsmanship and personalized care.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="lede !max-w-none">
                  Colour matched to your undertone, light that flatters your skin, and a calm chair where you are never an afterthought.
                </p>
              </Reveal>
            </div>

            <Reveal as="ul" stagger={0.12} className="mt-16 max-w-[46rem] border-t border-line">
              {promises.map((text, i) => (
                <li key={text} className="flex items-baseline gap-6 border-b border-line py-5">
                  <span className="eyebrow w-8 text-gold-ink">0{i + 1}</span>
                  <span className="font-display text-[clamp(1.05rem,1.5vw,1.3rem)] text-burgundy">{text}</span>
                </li>
              ))}
            </Reveal>
          </div>

          {/* asymmetric photography */}
          <div className="relative col-span-12 mt-4 lg:col-span-5 lg:col-start-8 lg:mt-24">
            <ImageReveal
              name="welcome-portrait-burgundy-glow"
              ratio="4 / 5"
              parallax
              sizes="(min-width: 1024px) 40vw, 92vw"
              className="w-full"
            />
            <Parallax amount={10} className="absolute -bottom-14 -left-4 z-10 w-[42%] md:-left-16 md:w-[38%] lg:-left-28">
              <ImageReveal name="welcome-gold-eyeshadow-headwrap" ratio="1 / 1" direction="right" sizes="(min-width: 1024px) 18vw, 36vw" className="w-full border-[6px] border-ivory shadow-[var(--shadow-lift)]" />
            </Parallax>
            <Parallax amount={14} className="absolute -right-2 -top-12 z-10 hidden w-[24%] md:block lg:-right-10">
              <ImageReveal name="welcome-brushes-gold-holder" ratio="3 / 4" direction="left" sizes="12vw" className="w-full border-[6px] border-ivory" />
            </Parallax>
            <p className="eyebrow mt-20 text-right !text-[0.58rem] !tracking-[0.2em] text-ink-soft/80 lg:mt-24">Inspiration imagery: licensed stock photography</p>
          </div>
        </div>
      </div>
    </section>
  )
}
