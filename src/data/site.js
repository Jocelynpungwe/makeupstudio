/**
 * Studio details. NOTE: this is an invented, internally consistent business profile for a fictional Toronto studio
 * (the phone number is in the reserved 555-01xx fiction range). Replace any of it with the real thing.
 */
export const site = {
  name: 'Maison Amara',
  descriptor: 'Makeup Atelier',
  tagline: 'Luxury makeup artistry in Toronto',
  description:
    'Luxury makeup atelier in Toronto: soft glam, full glam, bridal and editorial makeup, with colour matched to your skin and undertone. Request your appointment online.',
  url: 'https://www.maisonamara.ca',
  founder: 'Amara Collins',
  legalName: 'Maison Amara Studio Inc.',
  founded: 2018,

  contact: {
    email: 'hello@maisonamara.ca',
    phone: '+1 (416) 555-0142',
    // false until a booking endpoint or real inbox is connected: the form then says honestly that nothing was sent
    inboxConnected: false,
    replyTime: 'within one business day',
  },

  instagram: {
    handle: '@maisonamara.studio',
    url: 'https://www.instagram.com/maisonamara.studio/',
  },

  location: {
    line1: '412 Queen Street West, Suite 204',
    city: 'Toronto, ON M5V 2A8',
    street: '412 Queen Street West, Suite 204',
    locality: 'Toronto',
    region: 'ON',
    postcode: 'M5V 2A8',
    country: 'CA',
    note: 'Private studio on the second floor, a short walk from the streetcar. Paid street parking and a public lot next door.',
  },

  hours: [
    { days: 'Tuesday to Friday', time: '10:00 am to 6:00 pm', schema: ['Tu', 'We', 'Th', 'Fr'], opens: '10:00', closes: '18:00' },
    { days: 'Saturday', time: '8:00 am to 4:00 pm', schema: ['Sa'], opens: '08:00', closes: '16:00' },
    { days: 'Sunday and Monday', time: 'Bridal and on-location bookings only' },
  ],

  // LocalBusiness structured data is only published when this is true. It is OFF because this profile is fictional.
  business: {
    verified: false,
    type: 'BeautySalon',
    priceRange: '$$',
    geo: { latitude: 43.6487, longitude: -79.3969 },
  },

  pricing: {
    currency: 'CAD',
    note: 'All prices are in Canadian dollars (CAD) and exclude HST.',
  },

  booking: {
    // Set VITE_BOOKING_ENDPOINT in .env to POST requests to a form service or your own backend.
    endpoint: import.meta.env.VITE_BOOKING_ENDPOINT || '',
  },

  nav: [
    { label: 'Home', to: '/#top' },
    { label: 'Services', to: '/#services' },
    { label: 'Gallery', to: '/#gallery' },
    { label: 'About', to: '/#about' },
    { label: 'Contact', to: '/#contact' },
  ],

  legalUpdated: 'October 2026',
}
