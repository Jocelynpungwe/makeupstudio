import LegalPage from '../components/ui/LegalPage'
import { site } from '../data/site'

const sections = [
  {
    h: 'Using this website',
    p: [`By using this website you agree to these terms. ${site.legalName}, trading as ${site.name}, may update the site and these terms from time to time. These terms are governed by the laws of the Province of Ontario and the federal laws of Canada that apply there.`],
  },
  {
    h: 'Appointment requests',
    p: [
      'The request form on this site sends a request. It is not a booking. An appointment is confirmed only when the studio replies to you to confirm the date, time, service and price.',
      'Preferred dates and times of day are preferences, not reserved slots. Availability is never guaranteed until we confirm it.',
    ],
  },
  {
    h: 'Prices and payment',
    p: [
      'Prices shown on this site are in Canadian dollars. They are starting prices for one person and exclude add-ons and HST. Your exact quote is confirmed with your appointment.',
      'A $50 deposit holds your date and is credited toward your service. The remaining balance is due on the day.',
    ],
  },
  {
    h: 'Cancellations and changes',
    p: [
      'You can reschedule free of charge with at least 48 hours’ notice. Cancellations inside 48 hours forfeit the deposit.',
      'Please arrive on time. If you are more than 20 minutes late we may need to shorten the look or reschedule, and the deposit may be forfeited. Bridal bookings are covered by the terms in your confirmation email.',
    ],
  },
  {
    h: 'Health, skin and allergies',
    p: ['Please tell us about any skin conditions, allergies or sensitivities before your appointment so we can adapt the service. We may offer a patch test for new products, and we can decline or stop a service if it is not safe for your skin.'],
  },
  {
    h: 'Imagery and content',
    p: [
      'Photography and film on this site are licensed stock from Pexels and are shown as inspiration. They are not the studio’s own client portfolio, and the people pictured do not endorse this studio.',
      'The text, layout and design of this site belong to the studio. Please do not copy them without permission.',
    ],
  },
  {
    h: 'Limits of liability',
    p: ['We take great care with every service, but to the fullest extent permitted by law the studio is not liable for indirect or consequential losses. Nothing in these terms limits any right you have that cannot be limited by law.'],
  },
  {
    h: 'Contact',
    p: [`Questions about these terms can be sent to ${site.contact.email}, or by post to ${site.legalName}, ${site.location.line1}, ${site.location.city}.`],
  },
]

export default function Terms() {
  return <LegalPage path="/terms" title="Terms & Conditions" updated={site.legalUpdated} sections={sections} />
}
