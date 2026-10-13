import Seo from '../seo/Seo'
import Footer from '../layout/Footer'
import { site } from '../../data/site'

/** Shared shell for the Privacy and Terms pages. */
export default function LegalPage({ title, path, updated, sections }) {
  return (
    <>
      <Seo title={title} path={path} description={`${title} for ${site.name}.`} />
      <main id="main" tabIndex={-1} className="outline-none">
        <div className="bg-ivory pb-24 pt-[calc(var(--header-h)+5rem)] lg:pb-36 lg:pt-[calc(var(--header-h)+8rem)]">
          <div className="container-wide">
            <div className="mx-auto max-w-3xl">
              <p className="eyebrow mb-6 text-gold-ink">Legal</p>
              <h1 className="display-xl text-burgundy">{title}</h1>
              <p className="mt-6 text-[0.9rem] text-ink-soft">Last updated {updated}</p>

              <div className="mt-16 space-y-14">
                {sections.map((s) => (
                  <section key={s.h} aria-labelledby={`h-${s.h.replace(/\W+/g, '-').toLowerCase()}`}>
                    <h2 id={`h-${s.h.replace(/\W+/g, '-').toLowerCase()}`} className="display-sm mb-4 text-burgundy">
                      {s.h}
                    </h2>
                    <div className="space-y-4 text-[1rem] leading-[1.8] text-ink-soft">
                      {s.p.map((t) => (
                        <p key={t}>{t}</p>
                      ))}
                    </div>
                  </section>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
