import SplitHeading from '../components/animations/SplitHeading'
import Reveal from '../components/animations/Reveal'
import Parallax from '../components/animations/Parallax'
import Picture from '../components/ui/Picture'
import Button from '../components/ui/Button'

/** A dramatic full-width close: a gold-lit macro, a burgundy wash and the second chance to book. */
export default function FinalCta() {
  return (
    <section id="reserve" aria-labelledby="cta-title" className="on-dark relative isolate flex min-h-[100svh] items-center overflow-hidden bg-espresso-deep text-ivory">
      <Parallax amount={9} className="absolute -inset-y-[12%] inset-x-0 -z-20" aria-hidden="true">
        <Picture name="gold-hour-profile-glow" sizes="100vw" className="h-full w-full object-cover" style={{ objectPosition: '50% 38%' }} />
      </Parallax>
      <div aria-hidden="true" className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(62_29_41/0.94)_0%,rgb(62_29_41/0.7)_42%,rgb(34_25_23/0.25)_100%)]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-espresso-deep to-transparent" />

      <div className="container-wide relative py-32">
        <Reveal className="mb-8 flex items-center gap-4">
          <span className="h-px w-10 bg-gold" aria-hidden="true" />
          <span className="eyebrow text-gold">Reserve your moment</span>
        </Reveal>
        <SplitHeading id="cta-title" className="display-xl uppercase text-ivory">
          <span className="block">A little luxury.</span>
          <em className="italic-accent block normal-case text-rose">Just for you.</em>
        </SplitHeading>
        <Reveal delay={0.2} className="mt-10 max-w-md">
          <p className="lede !text-ivory/85">Beautiful makeup is more than a detail. It is a statement.</p>
          <div className="mt-10">
            <Button to="/#booking" variant="gold">
              Reserve your moment
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
