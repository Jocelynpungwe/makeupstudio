/**
 * Inspiration gallery. These are licensed stock photographs (Pexels License), shown as INSPIRATION.
 * They are not the studio's own portfolio. Replace with real client work by adding images to
 * public/media and updating the `image` keys (see README, "Swapping in your own photography").
 */
export const galleryCategories = [
  { id: 'all', label: 'All' },
  { id: 'soft-glam', label: 'Soft Glam' },
  { id: 'bridal', label: 'Bridal' },
  { id: 'editorial', label: 'Editorial' },
  { id: 'colour', label: 'Bold & Colour' },
  { id: 'gold', label: 'Gold Hour' },
  { id: 'lips-eyes', label: 'Lips & Eyes' },
  { id: 'skin', label: 'Skin & Glow' },
  { id: 'behind', label: 'Behind the Chair' },
]

const item = (category, image, ratio) => ({ category, image, ratio })

// Ratios give the masonry its editorial rhythm; images are cropped with object-fit: cover
export const galleryItems = [
  item('editorial', 'editorial-bold-blush-lips', '4 / 5'),
  item('bridal', 'bridal-studio-veil', '3 / 4'),
  item('gold', 'gold-hour-profile-glow', '4 / 6'),
  item('lips-eyes', 'lips-bold-red-statement-hoops', '1 / 1'),
  item('colour', 'colour-rainbow-eyeshadow', '4 / 5'),
  item('behind', 'chair-eyes-in-detail', '3 / 4'),
  item('soft-glam', 'glow-updo-radiant-skin', '4 / 6'),
  item('skin', 'skin-berry-blush-lip', '4 / 5'),
  item('bridal', 'bridal-lace-gown-veil', '4 / 6'),
  item('lips-eyes', 'lips-red-lipstick-application', '1 / 1'),
  item('gold', 'gold-eyes-amber-backdrop', '3 / 4'),
  item('editorial', 'editorial-sequin-top-studio', '4 / 5'),
  item('colour', 'colour-gold-lip-eyeshadow', '3 / 4'),
  item('behind', 'chair-orange-eyeshadow-brush', '4 / 5'),
  item('soft-glam', 'softglam-studio-portrait', '4 / 5'),
  item('skin', 'skin-even-tone-close-up', '3 / 4'),
  item('lips-eyes', 'lips-afro-gloss-touch', '4 / 6'),
  item('bridal', 'bridal-robe-bouquet', '4 / 5'),
  item('editorial', 'editorial-red-light', '3 / 4'),
  item('gold', 'gold-sculptural-earrings', '4 / 5'),
  item('colour', 'colour-glitter-teal-light', '4 / 6'),
  item('behind', 'chair-blush-finish-brush', '3 / 4'),
  item('soft-glam', 'softglam-closed-eyes-warm-light', '1 / 1'),
  item('skin', 'skin-moody-glistening', '4 / 5'),
  item('lips-eyes', 'lips-red-lip-long-braid', '3 / 4'),
  item('bridal', 'bridal-eye-makeup-in-progress', '4 / 5'),
  item('editorial', 'editorial-hand-at-chin', '4 / 6'),
  item('gold', 'gold-copper-hair-dark-backdrop', '3 / 4'),
  item('colour', 'colour-violet-teal-braids', '4 / 5'),
  item('behind', 'chair-powder-forehead', '4 / 6'),
  item('soft-glam', 'glow-luminous-skin-upward-gaze', '3 / 4'),
  item('skin', 'skin-half-face-sheen', '1 / 1'),
  item('lips-eyes', 'eyes-black-lip-dramatic-lashes', '4 / 5'),
  item('bridal', 'bridal-rose-detail-veil', '3 / 4'),
  item('colour', 'colour-gold-leaf-face-art', '4 / 5'),
  item('behind', 'chair-wedding-morning-touch-up', '4 / 5'),
]

export const instagramPosts = [
  'ig-orange-top-afro',
  'ig-black-backdrop-pose',
  'ig-curly-hair-portrait',
  'ig-alluring-portrait',
  'ig-natural-beauty-gaze',
  'ig-stylish-makeup-portrait',
  'ig-afro-gold-necklace',
  'ig-crop-top-studio',
]
