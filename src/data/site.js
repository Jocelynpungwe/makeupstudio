/**
 * Studio details. NOTE: this is an invented, internally consistent business profile for a fictional studio
 * (the phone number is in the reserved 555-01xx fiction range). Replace any of it with the real thing.
 */
export const site = {
  name: 'Maison Amara',
  descriptor: 'Makeup Atelier',
  tagline: 'Luxury makeup artistry for Black women',
  description:
    'Luxury makeup atelier in Atlanta for Black women: soft glam, full glam, bridal and editorial makeup, with colour matched to your skin and undertone. Request your appointment online.',
  url: 'https://www.maisonamara.studio',
  founder: 'Amara Collins',
  legalName: 'Maison Amara Studio LLC',
  founded: 2018,

  contact: {
    email: 'hello@maisonamara.studio',
    phone: '+1 (404) 555-0142',
    // false until a booking endpoint or real inbox is connected: the form then says honestly that nothing was sent
    inboxConnected: false,
    replyTime: 'within one business day',
  },

  instagram: {
    handle: '@maisonamara.studio',
    url: 'https://www.instagram.com/maisonamara.studio/',
  },

  location: {
    line1: '1420 Magnolia Court, Suite 204',
    city: 'Atlanta, GA 30309',
    street: '1420 Magnolia Court, Suite 204',
    locality: 'Atlanta',
    region: 'GA',
    postcode: '30309',
    country: 'US',
    note: 'Private studio on the second floor. Free parking behind the building.',
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
    geo: { latitude: 33.7981, longitude: -84.3855 },
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
