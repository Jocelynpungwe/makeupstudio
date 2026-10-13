import { Link } from 'react-router-dom'
import { site } from '../../data/site'
import { services } from '../../data/services'
import AnchorLink from './AnchorLink'
import Wordmark from '../ui/Wordmark'
import { InstagramIcon } from '../ui/icons'

const YEAR = new Date().getFullYear()

function Col({ title, children }) {
  return (
    <div>
      <h2 className="eyebrow mb-6 !font-semibold text-gold">{title}</h2>
      {children}
    </div>
  )
}

export default function Footer() {
  const link = 'link-underline py-1 text-[0.95rem] text-ivory/75 transition-colors hover:text-ivory'
  return (
    <footer id="footer" className="on-dark relative overflow-hidden bg-espresso-deep text-ivory">
      <div className="container-wide pb-10 pt-24 lg:pt-32">
        <div className="grid gap-x-12 gap-y-16 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Wordmark size="lg" />
            <p className="mt-8 max-w-sm text-[1rem] leading-relaxed text-ivory/70">Luxury makeup artistry for Black women. Colour matched to your skin, looks designed around you, and time that is never rushed.</p>
            <AnchorLink to="/#booking" className="eyebrow link-underline mt-9 inline-block !text-gold">
              Request an appointment
            </AnchorLink>
          </div>

          <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:col-span-8 lg:grid-cols-3">
            <Col title="Services">
              <ul className="flex flex-col">
                {services.slice(0, 6).map((s) => (
                  <li key={s.id}>
                    <AnchorLink to="/#services" className={link}>
                      {s.name}
                    </AnchorLink>
                  </li>
                ))}
                <li>
                  <AnchorLink to="/#booking" className={`${link} !text-gold`}>
                    Book now
                  </AnchorLink>
                </li>
              </ul>
            </Col>

            <Col title="Contact">
              <address className="flex flex-col gap-1 not-italic text-[0.95rem] text-ivory/75">
                <a href={`mailto:${site.contact.email}`} className={link}>
                  {site.contact.email}
                </a>
                <a href={`tel:${site.contact.phone.replace(/[^+\d]/g, '')}`} className={link}>
                  {site.contact.phone}
                </a>
                <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className={`${link} inline-flex items-center gap-2`}>
                  <InstagramIcon /> {site.instagram.handle}
                </a>
                <span className="mt-4 leading-relaxed">
                  {site.location.line1}
                  <br />
                  {site.location.city}
                </span>
              </address>
            </Col>

            <Col title="Hours">
              <ul className="flex flex-col gap-3 text-[0.95rem] text-ivory/75">
                {site.hours.map((h) => (
                  <li key={h.days} className="flex flex-col">
                    <span className="text-ivory">{h.days}</span>
                    <span>{h.time}</span>
                  </li>
                ))}
              </ul>
            </Col>
          </div>
        </div>

        <div className="hairline mt-20" />

        <div className="mt-8 flex flex-col gap-6 text-[0.8rem] text-ivory/55 lg:flex-row lg:items-start lg:justify-between">
          <div className="max-w-2xl space-y-3 leading-relaxed">
            <p>© {YEAR} {site.name}. All rights reserved.</p>
            <p>
              Photography and film are licensed stock from{' '}
              <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer" className="underline underline-offset-4 hover:text-ivory">
                Pexels
              </a>
              , shown as inspiration. The people pictured are not clients or staff of this studio and do not endorse it.
            </p>
          </div>
          <nav aria-label="Legal" className="flex gap-8">
            <Link to="/privacy" className="link-underline py-1 hover:text-ivory">
              Privacy Policy
            </Link>
            <Link to="/terms" className="link-underline py-1 hover:text-ivory">
              Terms &amp; Conditions
            </Link>
          </nav>
        </div>
      </div>
      <div aria-hidden="true" data-word={site.name} className="ghost-word" />
    </footer>
  )
}
