/**
 * Services, with starting prices and typical durations (invented for this fictional studio).
 * Leave `price` or `duration` empty and the site shows "To be confirmed" instead.
 */
export const services = [
  {
    id: 'soft-glam',
    name: 'Soft Glam',
    image: 'service-soft-glam',
    short: 'Skin that looks like skin, only better. Even, luminous and quietly polished.',
    long: 'A refined, wearable finish for everyday moments and occasions. Complexion colour-matched to your undertone, soft definition, and a glow that photographs and lives well.',
    price: 'From $95',
    duration: '60 min',
  },
  {
    id: 'full-glam',
    name: 'Full Glam',
    image: 'service-full-glam',
    short: 'Sculpted, lifted and camera-ready, with rich colour and defined eyes.',
    long: 'For nights out, birthdays and big entrances. Dimensional contour and highlight, expressive eyes with lashes, and a finish designed to last through the evening.',
    price: 'From $135',
    duration: '75 min',
  },
  {
    id: 'bridal',
    name: 'Bridal Makeup',
    image: 'service-bridal-makeup',
    short: 'Your wedding-day look, planned in advance and finished in comfort.',
    long: 'A look designed around you, your dress and your day. We plan it together at a trial, refine it, and make sure you feel like yourself, elevated. Includes lashes and a touch-up kit.',
    price: 'From $260',
    duration: '90 min',
  },
  {
    id: 'bridal-party',
    name: 'Bridal Party & Groups',
    image: 'service-bridal-party',
    short: 'Coordinated looks for the people who stand beside you.',
    long: 'Each person matched to their own skin, features and style, so the whole party looks cohesive without looking identical. Groups of four or more are scheduled with a second artist.',
    price: 'From $90 per person',
    duration: '45 to 60 min each',
  },
  {
    id: 'editorial',
    name: 'Editorial & Photoshoot',
    image: 'service-editorial',
    short: 'Makeup designed for lenses and lighting.',
    long: 'Precision, texture and colour built to photograph beautifully, from campaign concepts to personal brand shoots. On-set touch-ups can be added for longer days.',
    price: 'From $190',
    duration: '90 to 120 min',
  },
  {
    id: 'lesson',
    name: 'Makeup Lesson',
    image: 'service-makeup-lesson',
    short: 'A guided one-to-one session built around your face.',
    long: 'Learn your shades, your techniques and the tools worth owning, so you can recreate your look with confidence. You leave with a personal shade and product list.',
    price: '$165',
    duration: '2 hours',
  },
  {
    id: 'lash-brow',
    name: 'Lash & Brow Finishing',
    image: 'service-lash-brow',
    short: 'Frame the face with shaped brows and finishing eye detail.',
    long: 'The details that complete a look: brow definition, strip lash placement and precise eye finishing. Can be booked on its own or added to any service.',
    price: 'From $40',
    duration: '30 min',
  },
  {
    id: 'trial',
    name: 'Trial & Consultation',
    image: 'service-trial-consultation',
    short: 'Test a look before the day, and refine it until it is right.',
    long: 'We talk colour, finish and feel, try the look on your skin, and adjust. Ideal before a wedding, shoot or milestone event. The fee is credited toward your booking if you reserve within 30 days.',
    price: '$115',
    duration: '75 min',
  },
]

export const addOns = [
  { id: 'lashes', label: 'Lash application', note: '+$25' },
  { id: 'skin-prep', label: 'Extended skin preparation', note: '+$30, 15 extra minutes' },
  { id: 'touch-up-kit', label: 'Touch-up kit for the day', note: '+$20' },
  { id: 'on-location', label: 'On-location service', note: '+$75 within 40 km of Toronto' },
  { id: 'extra-person', label: 'Additional person', note: 'From $90 each' },
]

export const timePreferences = [
  { id: 'morning', label: 'Morning' },
  { id: 'midday', label: 'Midday' },
  { id: 'afternoon', label: 'Afternoon' },
  { id: 'evening', label: 'Evening' },
  { id: 'flexible', label: 'Flexible' },
]
