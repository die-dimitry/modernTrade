// Stock images available
const stockImages = [
  '/images/stock/pexels-alesiakozik-6770775.jpg',
  '/images/stock/pexels-alesiakozik-6771607.jpg',
  '/images/stock/pexels-alesiakozik-6771900.jpg',
  '/images/stock/pexels-anntarazevich-14751274.jpg',
  '/images/stock/pexels-n-voitkevich-6120215.jpg',
  '/images/stock/pexels-pixabay-534216.jpg',
  '/images/stock/pexels-tima-miroshnichenko-7567426.jpg',
  '/images/stock/pexels-tima-miroshnichenko-7567591.jpg',
  '/images/stock/pexels-weekendplayer-186461.jpg'
]

// Testimonial images
const testimonialImages = [
  '/images/testimonials/Aarav.jpg',
  '/images/testimonials/Priya.jpg',
  '/images/testimonials/Rajesh.jpg'
]

/**
 * Get a random stock image
 */
export function getRandomStockImage() {
  return stockImages[Math.floor(Math.random() * stockImages.length)]
}

/**
 * Get multiple random stock images (unique)
 */
export function getRandomStockImages(count = 1) {
  const shuffled = [...stockImages].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, Math.min(count, stockImages.length))
}

/**
 * Get testimonial image by name
 */
export function getTestimonialImage(name) {
  const nameLower = name.toLowerCase()
  if (nameLower.includes('aarav')) return testimonialImages[0]
  if (nameLower.includes('priya')) return testimonialImages[1]
  if (nameLower.includes('rajesh')) return testimonialImages[2]
  return testimonialImages[0] // default
}








