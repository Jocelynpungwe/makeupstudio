import { useEffect } from 'react'
import { site } from '../../data/site'

const setMeta = (selector, attr, value) => {
  const el = document.head.querySelector(selector)
  if (el) el.setAttribute(attr, value)
}

/**
 * Per-page title and description, plus LocalBusiness structured data that is only emitted once the
 * studio has confirmed real details (site.business.verified). No fabricated business data is ever published.
 */
export default function Seo({ title, description, path = '/', noindex = false }) {
  useEffect(() => {
    const fullTitle = title ? `${title} | ${site.name}` : `${site.name} | ${site.tagline}`
    const desc = description || site.description
    const url = `${site.url}${path}`
    document.title = fullTitle
    setMeta('meta[name="description"]', 'content', desc)
    setMeta('link[rel="canonical"]', 'href', url)
    setMeta('meta[property="og:title"]', 'content', fullTitle)
    setMeta('meta[property="og:description"]', 'content', desc)
    setMeta('meta[property="og:url"]', 'content', url)

    let robots = document.head.querySelector('meta[name="robots"]')
    if (noindex) {
      if (!robots) {
        robots = document.createElement('meta')
        robots.name = 'robots'
        document.head.appendChild(robots)
      }
      robots.content = 'noindex, follow'
    } else robots?.remove()
  }, [title, description, path, noindex])

  if (!site.business.verified || path !== '/') return null

  const data = {
    '@context': 'https://schema.org',
    '@type': site.business.type,
    name: site.name,
    description: site.description,
    url: site.url,
    email: site.contact.email,
    telephone: site.contact.phone,
    image: `${site.url}/og-image.jpg`,
    ...(site.business.priceRange ? { priceRange: site.business.priceRange } : {}),
    address: { '@type': 'PostalAddress', streetAddress: site.location.street, addressLocality: site.location.locality, addressRegion: site.location.region, postalCode: site.location.postcode, addressCountry: site.location.country },
    openingHoursSpecification: site.hours.filter((h) => h.schema).map((h) => ({ '@type': 'OpeningHoursSpecification', dayOfWeek: h.schema, opens: h.opens, closes: h.closes })),
    sameAs: [site.instagram.url],
    ...(site.business.geo ? { geo: { '@type': 'GeoCoordinates', ...site.business.geo } } : {}),
  }
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
}
