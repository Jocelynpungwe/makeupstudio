/**
 * Editable page content: hero chapters, experience steps, collections, trust points,
 * reviews, FAQ, comparison pairs and the artist profile.
 *
 * The business details here (prices, policies, the artist's story) are invented for a fictional studio.
 * Replace them with the real thing. The reviews are marked as samples on the page for that reason.
 */

/* ----------------------------- hero film chapters ----------------------------- */
export const heroChapters = {
  intro: {
    eyebrow: 'Makeup artistry for Black women',
    title: ['Beauty is in', 'the details.'],
    lede: 'Where artistry meets elegance, and every look is designed to make you feel extraordinary.',
  },
  prep: {
    label: '01 / The Preparation',
    title: ['It begins', 'with skin.'],
  },
  artistry: {
    label: '02 / The Artistry',
    title: ['Crafted with', 'precision.'],
  },
  glow: {
    label: '03 / The Transformation',
    title: ['Designed to', 'be noticed.'],
  },
  reveal: {
    label: '04 / The Reveal',
    title: ['Your face.', 'Your signature.'],
    cta: 'Book your appointment',
  },
}

/* ----------------------------- the experience ----------------------------- */
export const experienceSteps = [
  {
    n: '01',
    title: 'Consultation',
    body: 'We begin by talking. Your occasion, your features, the finish you love and the colours you reach for. Bring inspiration photos if you have them.',
    image: 'experience-consultation-table',
  },
  {
    n: '02',
    title: 'Skin Preparation',
    body: 'Every look is only as good as the skin beneath it. We prepare your canvas so makeup sits smoothly, comfortably and lasts.',
    image: 'experience-vanity-mirror',
  },
  {
    n: '03',
    title: 'Shape & Design',
    body: 'Colour is matched to your undertone and the look is mapped to your features: where to lift, where to soften, where to glow.',
    image: 'experience-complexion-concealer',
  },
  {
    n: '04',
    title: 'Precision Application',
    body: 'Unhurried, detailed work. Base, colour, definition and finishing, built in layers until the look feels like you.',
    image: 'chair-eyes-in-detail',
  },
  {
    n: '05',
    title: 'The Final Reveal',
    body: 'A last look in the mirror, a final refinement, and the moment you see yourself the way you imagined.',
    image: 'experience-final-reveal-smile',
  },
]

/* ----------------------------- signature collections ----------------------------- */
export const collections = [
  {
    id: 'essential',
    name: 'The Essential',
    kicker: 'Timeless',
    body: 'A timeless makeup experience focused on beautifully prepared skin and a quietly polished finish.',
    includes: ['Skin preparation', 'Complexion colour match', 'Soft eyes, cheeks and lips', 'Finishing mist for all-day wear'],
    price: '$120',
    duration: '60 min',
    featured: false,
  },
  {
    id: 'signature',
    name: 'The Signature',
    kicker: 'Featured',
    body: 'An elevated look with premium finishing and a personalised style, designed around your features.',
    includes: ['Everything in The Essential', 'Sculpted definition and highlight', 'Strip lash application', 'Lip colour blend and touch-up kit'],
    price: '$185',
    duration: '90 min',
    featured: true,
  },
  {
    id: 'statement',
    name: 'The Statement',
    kicker: 'Bold',
    body: 'A creative transformation for clients who want something bold, colourful and unforgettable.',
    includes: ['Concept and colour planning from your references', 'Graphic liner, pigment or gem work', 'Statement lashes', 'Bespoke finishing and touch-up kit'],
    price: '$240',
    duration: '2 hours',
    featured: false,
  },
]

/* ----------------------------- why choose ----------------------------- */
export const whyPoints = [
  { icon: 'ScanEye', title: 'Attention to detail', body: 'Blended edges, balanced symmetry, a finish that holds up in person and on camera.' },
  { icon: 'Palette', title: 'Colour true to your undertone', body: 'Shades chosen for the way they look on your skin, not the way they look in the pan.' },
  { icon: 'Sparkles', title: 'Personalised looks', body: 'No templates. Every look is designed around your features, your style and your day.' },
  { icon: 'Gem', title: 'Thoughtful product choices', body: 'Formulas chosen for how they wear, layer and photograph on deeper complexions.' },
  { icon: 'Brush', title: 'Creative artistry', body: 'From polished and natural to graphic and bold, with room for your ideas.' },
  { icon: 'Armchair', title: 'A comfortable experience', body: 'A calm, unhurried chair where you are listened to and never rushed.' },
]

/* ----------------------------- reviews ----------------------------- */
// These are SAMPLE reviews, written to show the layout. Replace each with a genuine client review (with
// permission) and set `sample: false`. The page labels sample reviews so nobody mistakes them for real ones.
export const testimonials = [
  {
    quote: 'I have always had to bring my own foundation to appointments. Amara matched my undertone in two swipes and my skin looked like mine, only lit from within.',
    name: 'Danielle R.',
    detail: 'Soft Glam',
    sample: true,
  },
  {
    quote: 'The trial took the nerves out of my wedding morning. By the time the day came she knew exactly what I wanted, and it was still glowing at the last dance.',
    name: 'Imani T.',
    detail: 'Bridal Makeup',
    sample: true,
  },
  {
    quote: 'I brought a mood board that made other artists nervous. She read it, asked three good questions and made it better. The photographer asked who did my makeup.',
    name: 'Nia B.',
    detail: 'Editorial & Photoshoot',
    sample: true,
  },
]

/* ----------------------------- FAQ ----------------------------- */
export const faqs = [
  {
    q: 'How long does a makeup appointment take?',
    a: 'Soft Glam takes about an hour and Full Glam about 75 minutes. Bridal makeup is 90 minutes per person, and a Statement look takes two hours. We confirm your exact time when we reply to your request.',
  },
  {
    q: 'How should I prepare for my appointment?',
    a: 'Arrive with a clean, moisturised face and wear a top that does not need to be pulled over your head. Bring inspiration photos and any products you love. If you have a skin reaction to any ingredient, tell us when you request your appointment.',
  },
  {
    q: 'Do you work with deeper skin tones?',
    a: 'Yes. This studio’s work is centred on Black women, from complexion matching and undertone-true colour to finishes that look luminous rather than ashy or heavy.',
  },
  {
    q: 'How long will my makeup last?',
    a: 'Most looks last eight to ten hours, and we finish every look with a setting mist and a plan for your day. The Signature and Statement collections include a touch-up kit for longer events.',
  },
  {
    q: 'Do you offer custom looks, and can I bring inspiration photos?',
    a: 'Absolutely. Inspiration photos are welcome, and every look is adapted to your features and skin. Bold and creative requests are encouraged.',
  },
  {
    q: 'What is your cancellation policy?',
    a: 'A $50 deposit holds your date and is credited toward your service. You can reschedule free of charge with 48 hours’ notice. Cancellations inside 48 hours forfeit the deposit, and bridal bookings are covered by the terms in your confirmation email.',
  },
  {
    q: 'Do you accept walk-ins or travel to clients?',
    a: 'Appointments are by request so every client has unhurried time. We travel for weddings, shoots and events within 25 miles of Atlanta for a $75 travel fee, and further by arrangement.',
  },
]

/* ----------------------------- before / after ----------------------------- */
// DEMONSTRATION STAGES from licensed stock footage (one session per pair). Not client results.
// To use real client photos, replace `before` / `after` with your own images (any size ratio ~4:3).
export const comparisons = [
  {
    id: 'skin',
    label: 'Skin & Glow',
    title: 'From prepped to polished',
    note: 'Stages of a single stock-footage session.',
    before: { src: '/media/stages/stage-skin-before.webp', src700: '/media/stages/stage-skin-before-700.webp', alt: 'Black woman in a patterned headwrap while the makeup artist is mid-application, skin still matte' },
    after: { src: '/media/stages/stage-skin-after.webp', src700: '/media/stages/stage-skin-after-700.webp', alt: 'The same woman once the look is finished, with glowing skin and a glossy lip' },
    w: 1400,
    h: 1050,
  },
  {
    id: 'eyes',
    label: 'Brows & Eyes',
    title: 'From bare to defined',
    note: 'Stages of a single stock-footage session.',
    before: { src: '/media/stages/stage-eyes-before.webp', src700: '/media/stages/stage-eyes-before-700.webp', alt: 'Close-up of a Black client’s eye and brow while the brow is being shaped, with bare lids' },
    after: { src: '/media/stages/stage-eyes-after.webp', src700: '/media/stages/stage-eyes-after-700.webp', alt: 'The same eye area finished, with a defined brow, shimmer on the lid and a warm blush' },
    w: 1400,
    h: 1050,
  },
]

/* ----------------------------- the artist ----------------------------- */
export const artistProfile = {
  name: 'Amara Collins',
  role: 'Founder & lead makeup artist',
  fields: [
    { label: 'Background', value: 'Grew up in her mother’s beauty shop in Atlanta, then spent seven years freelancing across bridal, editorial and backstage work before opening the atelier in 2018.' },
    { label: 'Specialisation', value: 'Soft glam, bridal makeup and editorial work on deeper skin tones, with a particular love of luminous, true-to-undertone complexions.' },
    { label: 'Philosophy', value: 'Makeup should look like your skin on its best day. Colour is matched to your undertone, never forced over it, and nobody leaves the chair feeling rushed.' },
    { label: 'Training', value: 'Hands-on training under working bridal and editorial artists, plus ongoing masterclasses in colour theory for deeper skin tones.' },
    { label: 'Experience', value: 'Over twelve years behind the brush, with more than two hundred weddings and a long list of shoots.' },
  ],
  story:
    'Amara fell in love with makeup watching clients walk into her mother’s shop on Saturday mornings and leave standing taller. She opened Maison Amara so that every Black woman could sit in a chair where her undertone is understood, her ideas are heard and the result looks unmistakably like her.',
}
