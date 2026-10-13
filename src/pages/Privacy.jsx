import LegalPage from '../components/ui/LegalPage'
import { site } from '../data/site'

const sections = [
  {
    h: 'Who we are',
    p: [`${site.legalName}, trading as ${site.name}, is a makeup studio at ${site.location.line1}, ${site.location.city}. This policy explains what information we collect through this website and how we use it.`],
  },
  {
    h: 'Information you give us',
    p: [
      'When you send an appointment request we receive the details you enter: your name, email address, optional phone number, the service you are interested in, your preferred date and time of day, any extras you select, and any note you write.',
      'Please do not include sensitive information, such as payment details or medical records, in the free-text note. If a skin concern or allergy matters to your appointment, describe it briefly and we will talk it through with you directly.',
    ],
  },
  {
    h: 'How we use it',
    p: ['We use your details only to reply to your request, to confirm or adjust your appointment, to send a reminder before it, and to arrange the service you asked about. We do not sell your information and we do not send marketing emails unless you ask to receive them.'],
  },
  {
    h: 'How long we keep it',
    p: ['Request details are kept for up to 24 months so we can look after repeat bookings and answer questions about past appointments. After that they are deleted.'],
  },
  {
    h: 'Where it goes',
    p: ['Appointment requests are delivered to the studio’s booking inbox. We use a standard email and form provider to receive them, and your details are shared with no one else.'],
  },
  {
    h: 'Cookies and analytics',
    p: ['This website does not set advertising cookies and does not use third-party tracking.'],
  },
  {
    h: 'Third-party content',
    p: ['Photography and film on this site are licensed stock from Pexels, shown as inspiration. The people pictured are not clients or staff of the studio. Links to Instagram and other sites are governed by those sites’ own policies.'],
  },
  {
    h: 'Your choices',
    p: [`You can ask to see, correct or delete the information we hold about you at any time by emailing ${site.contact.email}. We reply ${site.contact.replyTime}.`],
  },
]

export default function Privacy() {
  return <LegalPage path="/privacy" title="Privacy Policy" updated={site.legalUpdated} sections={sections} />
}
