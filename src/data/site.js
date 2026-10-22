// Single place to edit all venue content. Components only render what's here.

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"
).replace(/\/+$/, "");

export const TELEPHONE = process.env.NEXT_PUBLIC_TELEPHONE;

export const VENUE = {
  name: "Palki Garden",
  tagline: "Celebrations, carried with care.",
  phone: "+91 00000 00000",
  email: "bookings@palki.example",
  // Edit this line and the map + directions button update automatically.
  address: "CC6P+2C5 Rajpur Sonarpur, West Bengal",
  hours: "Open daily, 10 am to 8 pm for visits",
};

export const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Features", href: "/#features" },
  { label: "Stay", href: "/#stay" },
  { label: "Gallery", href: "/#gallery" },
  { label: "Stories", href: "/#stories" },
  { label: "Visit", href: "/#visit" },
];

export const EVENT_TYPES = [
  "Wedding",
  "Reception",
  "Engagement",
  "Birthday",
  "Anniversary",
  "Corporate event",
  "Other",
];

export const MAX_GUESTS = 800;

export const FEATURES = [
  {
    icon: "area",
    title: "5,000 sq ft hall",
    text: "One generous, uninterrupted space for the ceremony, the feast and the dancing.",
  },
  {
    icon: "guests",
    title: "Seats up to 800",
    text: "Comfortable for large family gatherings without losing the warmth of a smaller one.",
  },
  {
    icon: "ac",
    title: "Fully air-conditioned",
    text: "Guests stay cool through long afternoons and crowded evenings.",
  },
  {
    icon: "stage",
    title: "400–500 sq ft stage area",
    text: "A wide stage for mandap, rituals, performances and family portraits.",
  },
  {
    icon: "kitchen",
    title: "Dedicated kitchen",
    text: "Built for large-scale catering, with safety measures and backup in place.",
  },
  {
    icon: "fire",
    title: "Fire safety",
    text: "Safety equipment and clear exits, so you can celebrate without worry.",
  },
  {
    icon: "parking",
    title: "Parking lot",
    text: "A small private lot for family, elders and the first cars to arrive.",
  },
  {
    icon: "train",
    title: "Easy to reach",
    text: "Just a 10-minute walk from Subhasgram Railway Station, making travel convenient for your guests.",
  },
  {
    icon: "rooms",
    title: "4–5 guest rooms",
    text: "Rooms on site for the couple, parents and relatives travelling in.",
  },
];

export const ROOMS = [
  {
    title: "Bridal and groom's rooms",
    text: "A quiet place to dress, rest and prepare before the ceremony.",
    image: "/images/room-1.svg",
  },
  {
    title: "Family rooms",
    text: "Space for parents and close relatives to stay together on the venue.",
    image: "/images/room-2.svg",
  },
  {
    title: "Guest rooms",
    text: "Comfortable rooms for elders and out-of-town guests.",
    image: "/images/room-3.svg",
  },
];

export const GALLERY = [
  { src: "/images/gallery-1.svg", caption: "Wedding ceremony" },
  { src: "/images/gallery-2.svg", caption: "Evening reception" },
  { src: "/images/gallery-3.svg", caption: "Haldi and mehendi" },
  { src: "/images/gallery-4.svg", caption: "Floral stage décor" },
  { src: "/images/gallery-5.svg", caption: "Engagement dinner" },
  { src: "/images/gallery-6.svg", caption: "Anniversary celebration" },
  { src: "/images/gallery-7.svg", caption: "Mandap setup" },
  { src: "/images/gallery-8.svg", caption: "Entrance lighting" },
];

// Drop your video files into /public/videos and posters into /public/images.
export const TESTIMONIALS = [
  {
    name: "Ananya and Rohit",
    event: "Wedding",
    video: "/videos/testimonial-1.mp4",
    poster: "/images/testimonial-1.svg",
  },
  {
    name: "The Sharma family",
    event: "Reception",
    video: "/videos/testimonial-2.mp4",
    poster: "/images/testimonial-2.svg",
  },
  {
    name: "Meera Iyer",
    event: "50th anniversary",
    video: "/videos/testimonial-3.mp4",
    poster: "/images/testimonial-3.svg",
  },
];
