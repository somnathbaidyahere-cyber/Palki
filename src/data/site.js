// Single place to edit all venue content. Components only render what's here.
import {
  ArrowDownRight,
  BedDouble,
  DoorOpen,
  Heart,
  Trees,
  Utensils,
  Users,
} from "lucide-react";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "https://your-domain.com"
).replace(/\/+$/, "");

export const TELEPHONE = process.env.NEXT_PUBLIC_TELEPHONE;
export const EMAIL = process.env.NEXT_PUBLIC_EMAIL;

export const VENUE = {
  name: "Palki Garden",
  tagline: "Celebrations, carried with care.",
  heroImage: "/images/bg.jpg",
  phone: TELEPHONE,
  email: EMAIL,
  // Edit this line and the map + directions button update automatically.
  address:
    "Palki Garden, CC5P+RG8, Janaki Nath Basu Rd, Kodalla, Subhasgram, Rajpur Sonarpur, West Bengal 700147",
  hours: "Open daily, 10 am to 8 pm for visits",
  instagram: "https://www.instagram.com/your_actual_profile/",
  facebook: "https://www.facebook.com/your_actual_page/",
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
    title: "Family Room",
    image: "/images/family-room.webp",

    text: "A comfortable and welcoming stay for your guests, with thoughtful amenities to make their visit relaxing.",
    area: "Enter actual area",
    beds: "2",
    capacity: "Enter guest capacity",
    amenities: ["Air conditioning", "Geyser", "Electric kettle", "Windows"],
  },
  {
    title: "Bridal Room",
    image: "/images/bridal-room.webp",
    text: "A private, comfortable space for the bride to prepare and relax before the celebrations.",
    area: "Enter actual area",
    beds: "1",
    capacity: "Enter guest capacity",
    amenities: [
      "Air conditioning",
      "Geyser",
      "Private bathroom",
      "Natural light",
    ],
  },
  {
    title: "Guest Room",
    image: "/images/guest-room.webp",
    text: "A practical accommodation option for family members and guests attending your celebration.",
    area: "Enter actual area",
    beds: "4-5",
    capacity: "Enter guest capacity",
    amenities: ["Air conditioning", "Geyser", "Windows"],
  },
];

export const JOURNEY = [
  {
    id: "approach",
    number: "01",
    note: "The approach",
    badge: "The journey begins",
    image: "/images/venue-walkway.jpg",
    imageAlt: "Approach walkway at Palki Garden",
    icon: ArrowDownRight,
    imagePosition: "left",
  },
  {
    id: "entrance",
    number: "02",
    note: "The entrance",
    badge: "You enter",
    image: "/images/venue-entrance.jpg",
    imageAlt: "Entrance gate at Palki Garden",
    icon: DoorOpen,
    imagePosition: "right",
  },
  {
    id: "rooms",
    number: "03",
    note: "Rooms & getting ready",
    badge: "Get fresh & get ready",
    image: "/images/family-room.jpg",
    imageAlt: "Guest room at Palki Garden",
    icon: BedDouble,
    imagePosition: "left",
  },
  {
    id: "hall",
    number: "04",
    note: "The celebration hall",
    badge: "Let the celebrations begin",
    image: "/images/marriage-hall.jpg",
    imageAlt: "Celebration hall at Palki Garden",
    icon: Users,
    imagePosition: "right",
  },
  {
    id: "ceremony",
    number: "05",
    note: "The ceremony",
    badge: "Make it memorable",
    image: "/images/ceremonial-area.jpg",
    imageAlt: "Ceremonial area at Palki Garden",
    icon: Heart,
    imagePosition: "left",
  },
  {
    id: "dining",
    number: "06",
    note: "Dining",
    badge: "Gather around",
    image: "/images/dining-area.jpg",
    imageAlt: "Dining area at Palki Garden",
    icon: Utensils,
    imagePosition: "right",
  },
  {
    id: "garden",
    number: "07",
    note: "The garden retreat",
    badge: "Wind down & unwind",
    image: "/images/garden-retreat.jpg",
    imageAlt: "Garden retreat at Palki Garden",
    icon: Trees,
    imagePosition: "left",
  },
];


export const GALLERY = [
  { src: "/images/gallery/gallery-1.webp", caption: "Wedding ceremony" },
  { src: "/images/gallery/gallery-2.webp", caption: "Evening reception" },
  { src: "/images/gallery/gallery-3.webp", caption: "Haldi and mehendi" },
  { src: "/images/gallery/gallery-4.webp", caption: "Floral stage décor" },
  { src: "/images/gallery/gallery-5.webp", caption: "Engagement dinner" },
  { src: "/images/gallery/gallery-6.webp", caption: "Anniversary celebration" },
  { src: "/images/gallery/gallery-7.webp", caption: "Mandap setup" },
  { src: "/images/gallery/gallery-8.webp", caption: "Entrance lighting" },
];

// Drop your video files into /public/videos and posters into /public/images.
export const TESTIMONIALS = [
  {
    name: "Ananya and Rohit",
    event: "Wedding",
    video: "/videos/testimonial-1.mp4",
    poster: "/images/testimonials/testimonial-1.webp",
  },
  {
    name: "The Sharma family",
    event: "Reception",
    video: "/videos/testimonial-2.mp4",
    poster: "/images/testimonials/testimonial-2.webp",
  },
  {
    name: "Meera Iyer",
    event: "50th anniversary",
    video: "/videos/testimonial-3.mp4",
    poster: "/images/testimonials/testimonial-3.webp",
  },
    {
    name: "Meenakshi Devi",
    event: "Mehendi & Sangeet",
    video: "/videos/testimonial-4.mp4",
    poster: "/images/testimonials/testimonial-4.webp",
  },
  {
    name: "Gupta Family",
    event: "Wedding Ceremony",
    video: "/videos/testimonial-5.mp4",
    poster: "/images/testimonials/testimonial-5.webp",
  },
  {
    name: "Raj and Mita",
    event: "Marriage & Reception",
    video: "/videos/testimonial-6.mp4",
    poster: "/images/testimonials/testimonial-6.webp",
  },
];
