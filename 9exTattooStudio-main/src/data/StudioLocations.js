// Shared source of truth — used by both the homepage location grid
// and the individual LocationPage. Add new studios here only.

export const studioLocations = [
  {
    city: "Thane, Mumbai",
    slug: "thane-mumbai",
    address: "9Ex Tattoo Studio, Ghodbunder Road, Thane West, Mumbai, Maharashtra",
    phone: "+91 7666678188",
    hours: "Mon–Sun · 11:00 AM – 9:00 PM",
    isOpenNow: true,
    heroImage: "/gallery/Thane.jpg",
    instagram: "https://instagram.com/9extattoo",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.1161330019927!2d72.96864227466794!3d19.19012934838076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b87ae16907e9%3A0xff9da0d9943ea712!2s9Ex%20Tattoo%20Shop%20%7C%20Premium%20%7C%20Story%20Based%20Art%20%7C%20Thane%20%7C%20Mumbai!5e0!3m2!1sen!2sin!4v1782308720058!5m2!1sen!2sin",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=9Ex+Tattoo+Shop+Thane+Mumbai",
  },
  {
    city: "Powai, Mumbai",
    slug: "powai-mumbai",
    address: "9Ex Tattoo Studio, Ghodbunder Road, Thane West, Mumbai, Maharashtra",
    phone: "+91 7666678188",
    hours: "Mon–Sun · 11:00 AM – 9:00 PM",
    isOpenNow: true,
    heroImage: "/gallery/powai.webp",
    instagram: "https://instagram.com/9extattoo",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.1161330019927!2d72.96864227466794!3d19.19012934838076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b87ae16907e9%3A0xff9da0d9943ea712!2s9Ex%20Tattoo%20Shop%20%7C%20Premium%20%7C%20Story%20Based%20Art%20%7C%20Thane%20%7C%20Mumbai!5e0!3m2!1sen!2sin!4v1782308720058!5m2!1sen!2sin",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=9Ex+Tattoo+Shop+Thane+Mumbai",
  },
  {
    city: "Vashi, Mumbai",
    slug: "vashi-mumbai",
    address: "9Ex Tattoo Studio, Ghodbunder Road, Thane West, Mumbai, Maharashtra",
    phone: "+91 7666678188",
    hours: "Mon–Sun · 11:00 AM – 9:00 PM",
    isOpenNow: true,
    heroImage: "/gallery/Vashi.jpg",
    instagram: "https://instagram.com/9extattoo",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.1161330019927!2d72.96864227466794!3d19.19012934838076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b87ae16907e9%3A0xff9da0d9943ea712!2s9Ex%20Tattoo%20Shop%20%7C%20Premium%20%7C%20Story%20Based%20Art%20%7C%20Thane%20%7C%20Mumbai!5e0!3m2!1sen!2sin!4v1782308720058!5m2!1sen!2sin",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=9Ex+Tattoo+Shop+Thane+Mumbai",
  },
  {
    city: "Bangalore",
    slug: "bangalore",
    address: "9Ex Tattoo Studio, 123 Main Street, Bangalore, Karnataka",
    phone: "+91 7666678188",
    hours: "Mon–Sun · 11:00 AM – 9:00 PM",
    isOpenNow: true,
    heroImage: "/gallery/bgl.jpg",
    instagram: "https://instagram.com/9extattoo",
    mapEmbedUrl:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3768.1161330019927!2d72.96864227466794!3d19.19012934838076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3be7b87ae16907e9%3A0xff9da0d9943ea712!2s9Ex%20Tattoo%20Shop%20%7C%20Premium%20%7C%20Story%20Based%20Art%20%7C%20Thane%20%7C%20Mumbai!5e0!3m2!1sen!2sin!4v1782308720058!5m2!1sen!2sin",
    directionsUrl:
      "https://www.google.com/maps/dir/?api=1&destination=9Ex+Tattoo+Shop+Thane+Mumbai",
  },
  // Add more studios here — same shape, new slug.
];

export function getLocationBySlug(slug) {
  return studioLocations.find((loc) => loc.slug === slug);
}