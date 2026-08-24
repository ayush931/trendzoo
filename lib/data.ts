import { Product } from './types';

export const CURRENCY_RATES: Record<string, { symbol: string; rate: number }> = {
  INR: { symbol: '₹', rate: 1 },
  USD: { symbol: '$', rate: 0.012 },
  EUR: { symbol: '€', rate: 0.011 },
  GBP: { symbol: '£', rate: 0.0094 },
};

export const TRENDING_PRODUCTS: Product[] = [
  {
    id: 'prod-smartwatch-pro',
    title: 'Trenzoo Smartwatch Pro Active',
    subtitle: 'Full AMOLED • AI Heart Sync • 7-Day Battery',
    category: 'electronics',
    priceINR: 2899,
    originalPriceINR: 6999,
    rating: 4.9,
    reviewCount: 1420,
    badge: '🔥 HOT ON TIKTOK',
    badgeColor: 'pink',
    viralScore: 98,
    soldCount: 8430,
    stockLeft: 9,
    images: [
      '/images/hero_flatlay.jpg',
      '/images/hero_cyber.jpg',
    ],
    description: 'The viral smartwatch with borderless AMOLED display, ultra-vibrant UI, sleep & stress tracker, waterproof casing, and swappable pastel silicone straps that went viral on feed.',
    features: [
      '1.96" Ultra AMOLED 60Hz Curved Display',
      'Wireless Magnetic Fast Charging',
      '100+ Sports & Dance Tracking Modes',
      'IP68 Water & Dust Resistant',
      'Bluetooth Calling & Siri/Google Sync'
    ],
    tags: ['Smartwatch', 'Cyber', 'Fitness', 'Aesthetic'],
    variants: [
      { name: 'Bubblegum Pink', colorHex: '#FF4D8D' },
      { name: 'Cyber Teal', colorHex: '#00D2B4' },
      { name: 'Midnight Charcoal', colorHex: '#1E293B' },
      { name: 'Cloud White', colorHex: '#F8FAFC' },
    ],
    isFlashDrop: true,
    flashEndsInSec: 3600 * 5 + 42 * 60,
    videoViews: '4.2M views',
    reviews: [
      {
        id: 'r1',
        userName: 'Rhea S.',
        rating: 5,
        date: 'Yesterday',
        comment: 'Literally obsessed! The screen is so crisp and the pink strap matches all my fits.',
        verified: true,
        likes: 124,
      },
      {
        id: 'r2',
        userName: 'Aryan K.',
        rating: 5,
        date: '3 days ago',
        comment: 'Battery lasted 6 days on heavy usage. Looks 10x more expensive than ₹2,899.',
        verified: true,
        likes: 89,
      }
    ]
  },
  {
    id: 'prod-levitating-saturn',
    title: 'Magnetic Levitating Saturn & Moon Duo',
    subtitle: 'Zero-Gravity Float • 16-Color RGB Touch Base',
    category: 'decor',
    priceINR: 3499,
    originalPriceINR: 7999,
    rating: 4.95,
    reviewCount: 980,
    badge: '✨ #1 VIRAL DÉCOR',
    badgeColor: 'cyan',
    viralScore: 99,
    soldCount: 5200,
    stockLeft: 4,
    images: [
      '/images/decor_moon.jpg',
      '/images/hero_cyber.jpg',
    ],
    description: 'Suspended in mid-air using patented silent magnetic levitation technology. Rotates 360 degrees infinitely while glowing with realistic NASA topological texture maps and soft ambient rings.',
    features: [
      'True Magnetic Levitation (No Strings Attached)',
      '16 RGB Mood Lighting Modes + Strobe / Fade',
      'Wireless Induction Powered - No Exposed Wires',
      'Natural Walnut Wood Geometric Base',
      'Touch Sensitive Base with Dimming Sensor'
    ],
    tags: ['Levitating', 'Space', 'Lamps', 'RoomDecor'],
    variants: [
      { name: 'Saturn Blue & Moon', colorHex: '#00D2B4' },
      { name: 'Golden Nebula', colorHex: '#FFA928' },
      { name: 'Cosmic Magenta', colorHex: '#FF2A85' },
    ],
    isFlashDrop: true,
    flashEndsInSec: 3600 * 3 + 15 * 60,
    videoViews: '9.8M views',
    reviews: [
      {
        id: 'r3',
        userName: 'Devansh M.',
        rating: 5,
        date: '2 days ago',
        comment: 'Everyone who comes to my room stops and stares at it for 5 minutes. Best purchase this year.',
        verified: true,
        likes: 215,
      }
    ]
  },
  {
    id: 'prod-cyber-hoodie',
    title: 'Cyber Future Overload Anime Hoodie',
    subtitle: 'Heavyweight 420 GSM • Holographic Reflective Ink',
    category: 'clothing',
    priceINR: 1999,
    originalPriceINR: 3999,
    rating: 4.85,
    reviewCount: 840,
    badge: '💥 STREETWEAR DROP',
    badgeColor: 'purple',
    viralScore: 95,
    soldCount: 4320,
    images: [
      '/images/hoodie_y2k.jpg',
    ],
    description: 'Oversized drop-shoulder streetwear hoodie crafted from ultra-soft 420 GSM fleece cotton with glow-in-the-dark holographic cyber circuitry prints and dual-tone drawstrings.',
    features: [
      '420 GSM Premium Combed Cotton Fleece',
      'Reflective Holographic Screenprint (Fades 0%)',
      'Drop-Shoulder Boxy Relaxed Fit',
      'Double-Lined Deep Hood with Metal Eyelets',
      'Pre-Shrunk & Color-Lock Treated'
    ],
    tags: ['Hoodie', 'Y2K', 'Cyberpunk', 'Oversized'],
    variants: [
      { name: 'Lilac Cyber Glow', colorHex: '#C084FC' },
      { name: 'Pastel Rose', colorHex: '#F472B6' },
      { name: 'Phantom Black', colorHex: '#0F172A' },
    ],
    videoViews: '3.1M views'
  },
  {
    id: 'prod-mystery-box',
    title: 'Ultimate Viral Mystery Loot Drop 3.0',
    subtitle: 'Guaranteed 4-6 High Tier Trending Tech & Decor',
    category: 'gifting',
    priceINR: 1499,
    originalPriceINR: 4999,
    rating: 4.92,
    reviewCount: 3120,
    badge: '🎁 VIRAL SENSATION',
    badgeColor: 'orange',
    viralScore: 97,
    soldCount: 12400,
    stockLeft: 12,
    images: [
      '/images/mystery_box.jpg',
      '/images/hero_flatlay.jpg',
    ],
    description: 'The mystery box that broke Instagram Reels! Each box contains guaranteed value worth 3x the price, packed with unreleased viral gadgets, aesthetic desk candy, mini lights, and funky accessories.',
    features: [
      'Guaranteed Value of ₹4,500+ inside every box',
      'Includes 1 Tech Gadget + 1 Decor + 2 Funky Accessories',
      'Golden Ticket Chance: 1 in 25 wins a Smartwatch or Divoom speaker!',
      'Custom holographic sticker bomb pack included',
      'Free Gift Wrap & Handwritten Card on demand'
    ],
    tags: ['MysteryBox', 'Gift', 'Viral', 'Unboxing'],
    variants: [
      { name: 'Tech & Gadget Edition', colorHex: '#00D2B4' },
      { name: 'Aesthetic Cozy Edition', colorHex: '#FF2A85' },
      { name: 'All-Rounder Chaos Mix', colorHex: '#FFA928' },
    ],
    videoViews: '14.5M views'
  },
  {
    id: 'prod-mech-keyboard',
    title: 'Cyber-Transparent RGB Mechanical Keyboard',
    subtitle: 'Hot-Swappable Crystal Switches • Gasket Mounted',
    category: 'electronics',
    priceINR: 3999,
    originalPriceINR: 8499,
    rating: 4.9,
    reviewCount: 650,
    badge: '⚡ DESK GOALS',
    badgeColor: 'cyan',
    viralScore: 96,
    soldCount: 2900,
    images: [
      '/images/hero_cyber.jpg',
    ],
    description: 'All-transparent polycarbonate chassis with ice crystal linear switches, south-facing per-key RGB, multi-layer acoustic silicone dampening, and rotary multimedia knob.',
    features: [
      'Transparent Polycarbonate Housing & Keycaps',
      'Pre-Lubed Custom Crystal Linear Switches',
      'Tri-Mode Connectivity: 2.4GHz / Bluetooth 5.2 / USB-C',
      '4000mAh Battery (Up to 200 hours wireless)',
      'Gasket Mount with 5-Layer Sound Dampening'
    ],
    tags: ['Keyboard', 'RGB', 'Cyberpunk', 'GamerSetup'],
    variants: [
      { name: 'Cyber Crystal RGB', colorHex: '#38BDF8' },
      { name: 'Neon Sakura Pink', colorHex: '#F43F5E' },
      { name: 'Smoky Obsidian', colorHex: '#334155' },
    ]
  },
  {
    id: 'prod-pastel-sneakers',
    title: 'Y2K Retro Chunky Colorblock Kicks',
    subtitle: 'Cloud-Foam Cushion • High Street Retro Vibe',
    category: 'clothing',
    priceINR: 2499,
    originalPriceINR: 5999,
    rating: 4.8,
    reviewCount: 910,
    badge: '🔥 BESTSELLER',
    badgeColor: 'pink',
    viralScore: 93,
    soldCount: 3800,
    images: [
      '/images/hero_flatlay.jpg',
    ],
    description: 'Vibrant pastel multi-panel chunky sneakers with featherlight cloud foam insoles, breathable mesh lining, and high-traction rubber gum soles made for all-day strutting.',
    features: [
      'Multi-Texture Pastel Suede & Mesh Upper',
      'High-Rebound CloudFoam™ Insole',
      'Anti-Slip Sculpted Gum Outsole',
      'Padded Collar & Tongue for Zero Ankle Bite',
      'Unisex Sizing (UK 4 - UK 11)'
    ],
    tags: ['Sneakers', 'Pastel', 'Chunky', 'Streetwear'],
    variants: [
      { name: 'Pastel Candy Pop', colorHex: '#F472B6' },
      { name: 'Mint & Vanilla', colorHex: '#4ADE80' },
      { name: 'Sunrise Tangerine', colorHex: '#FB923C' },
    ]
  },
  {
    id: 'prod-donut-vase',
    title: 'Ceramic Donut Pastel Vase + Pampas Bouquet',
    subtitle: 'Hand-Molded Matte Ceramic • Nordic Aesthetic',
    category: 'decor',
    priceINR: 899,
    originalPriceINR: 1999,
    rating: 4.9,
    reviewCount: 1100,
    badge: '✨ INSTA FAMOUS',
    badgeColor: 'orange',
    viralScore: 92,
    soldCount: 6100,
    images: [
      '/images/hero_flatlay.jpg',
    ],
    description: 'The iconic hollow circle donut vase in dreamy soft pastel tones with a velvety matte bisque finish. Includes a curated mini dried pampas and bunny tail bouquet.',
    features: [
      'Handcrafted High-Fired Ceramic',
      'Velvety Matte Anti-Fingerprint Glaze',
      'Includes Natural Fluffy Pampas Bouquet',
      'Waterproof Interior for Fresh Flowers',
      'Protective Felt Pads on Bottom'
    ],
    tags: ['Vase', 'Nordic', 'HomeDecor', 'Pampas'],
    variants: [
      { name: 'Blush Powder Pink', colorHex: '#FBCFE8' },
      { name: 'Warm Terracotta', colorHex: '#EA580C' },
      { name: 'Sand Cream', colorHex: '#FEF08A' },
    ]
  },
  {
    id: 'prod-wireless-earbuds',
    title: 'Aero-Grip Cyber Wireless Earbuds with ANC',
    subtitle: 'Active Noise Cancelling • 360 Spatial Audio',
    category: 'electronics',
    priceINR: 1299,
    originalPriceINR: 3499,
    rating: 4.75,
    reviewCount: 780,
    badge: '⚡ 60% OFF',
    badgeColor: 'cyan',
    viralScore: 91,
    soldCount: 4100,
    images: [
      '/images/hero_flatlay.jpg',
    ],
    description: 'Ergonomic sport-wing earbuds with transparent charging case, punchy bass, 4-mic ENC for crystal clear calls, and low-latency game mode.',
    features: [
      '32dB Hybrid Active Noise Cancellation',
      '13mm Titanium Composite Bass Drivers',
      '36 Hours Total Playback with Fast Charge Case',
      'Ergonomic Secure-Fit Ear Wings',
      'Touch Control for Tracks, Volume & Siri/Google'
    ],
    tags: ['Earbuds', 'ANC', 'Tech', 'Music'],
    variants: [
      { name: 'Baby Blue', colorHex: '#93C5FD' },
      { name: 'Neon Lime', colorHex: '#84CC16' },
      { name: 'Cyber Matte Black', colorHex: '#1E293B' },
    ]
  },
  {
    id: 'prod-stress-enter-key',
    title: 'Giant USB Stress Punch Enter Key',
    subtitle: 'Actual Working Key • Super Soft Foam Pillow',
    category: 'steals',
    priceINR: 499,
    originalPriceINR: 1299,
    rating: 4.88,
    reviewCount: 1540,
    badge: '🔥 ₹99 STEAL DEAL',
    badgeColor: 'yellow',
    viralScore: 94,
    soldCount: 9200,
    images: [
      '/images/mystery_box.jpg',
    ],
    description: 'Plug this giant foam Enter Key into your computer via USB and slam it with your fist when code breaks or emails get annoying. Works as a real Enter key and stress pillow!',
    features: [
      'Real Functional USB Enter Key (Plug & Play)',
      'High-Density Sponge Cushion (Bounces back instantly)',
      'Washable Soft Velour Zipper Cover',
      'Doubles as a desk nap pillow',
      'Compatible with Windows, Mac & Linux'
    ],
    tags: ['Steals', 'StressBuster', 'DeskToy', 'FunnyGift'],
    variants: [
      { name: 'Classic Tech Black', colorHex: '#18181B' },
      { name: 'Fire Engine Red', colorHex: '#EF4444' },
      { name: 'Neon Electric Blue', colorHex: '#3B82F6' },
    ]
  }
];

export const HERO_HOTSPOTS = [
  {
    id: 'spot-1',
    productId: 'prod-smartwatch-pro',
    label: 'Smartwatch Pro',
    price: '₹2,899',
    oldPrice: '₹6,999',
    topPercent: 28,
    leftPercent: 43,
  },
  {
    id: 'spot-2',
    productId: 'prod-pastel-sneakers',
    label: 'Pastel Chunky Kicks',
    price: '₹2,499',
    oldPrice: '₹5,999',
    topPercent: 32,
    leftPercent: 18,
  },
  {
    id: 'spot-3',
    productId: 'prod-donut-vase',
    label: 'Donut Vase + Pampas',
    price: '₹899',
    oldPrice: '₹1,999',
    topPercent: 72,
    leftPercent: 38,
  },
  {
    id: 'spot-4',
    productId: 'prod-wireless-earbuds',
    label: 'Aero-Grip Earbuds',
    price: '₹1,299',
    oldPrice: '₹3,499',
    topPercent: 24,
    leftPercent: 57,
  },
];

export const VIRAL_REELS = [
  {
    id: 'reel-1',
    title: 'Testing the Levitating Saturn lamp at 2 AM 🤯',
    creator: '@techjunkie_sam',
    views: '4.2M views',
    likes: '620k',
    productName: 'Magnetic Levitating Saturn',
    price: '₹3,499',
    image: '/images/decor_moon.jpg',
    bgGradient: 'from-purple-900 to-indigo-950',
    tags: ['#RoomAesthetic', '#Levitating', '#Cyberpunk']
  },
  {
    id: 'reel-2',
    title: 'Unboxing the ₹1499 Mystery Drop... GOT THE GOLDEN TICKET?!',
    creator: '@zootrend_hunter',
    views: '8.7M views',
    likes: '1.2M',
    productName: 'Ultimate Mystery Loot Drop',
    price: '₹1,499',
    image: '/images/mystery_box.jpg',
    bgGradient: 'from-pink-900 to-amber-950',
    tags: ['#Unboxing', '#MysteryBox', '#CrazyFinds']
  },
  {
    id: 'reel-3',
    title: 'The satisfying click of the Crystal Mech Keyboard 🔊 ASMR',
    creator: '@keeb_queen',
    views: '3.9M views',
    likes: '480k',
    productName: 'Cyber Mech Keyboard',
    price: '₹3,999',
    image: '/images/hero_cyber.jpg',
    bgGradient: 'from-cyan-900 to-blue-950',
    tags: ['#Keyboards', '#ASMR', '#DeskSetup']
  },
  {
    id: 'reel-4',
    title: 'My outfit changed forever when this Cyber Hoodie arrived ✨',
    creator: '@kyle.fits',
    views: '2.8M views',
    likes: '340k',
    productName: 'Cyber Anime Hoodie',
    price: '₹1,999',
    image: '/images/hoodie_y2k.jpg',
    bgGradient: 'from-fuchsia-950 to-purple-950',
    tags: ['#Streetwear', '#Y2K', '#OOTD']
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Drops', icon: '🔥', count: 48 },
  { id: 'electronics', label: 'Cyber Electronics', icon: '⚡', count: 18 },
  { id: 'decor', label: 'Aesthetic Décor', icon: '🏡', count: 14 },
  { id: 'clothing', label: 'Y2K & Streetwear', icon: '✨', count: 12 },
  { id: 'gifting', label: 'Viral Gifting', icon: '🎁', count: 9 },
  { id: 'steals', label: 'Under ₹499 Steals', icon: '💥', count: 7 },
];

export const FAQ_DATA = [
  {
    q: 'How does Trenzoo find these viral items before anyone else?',
    a: 'We have automated trend scouts tracking real-time TikTok algorithms, Reddit gadget subreddits, Tokyo tech markets, and viral reels 24/7. Only items with 90%+ viral score make it to our zoo!'
  },
  {
    q: 'Is shipping really free across India & worldwide?',
    a: 'Yes! All orders above ₹999 get automatic Free Express Shipping with live tracking SMS & WhatsApp updates.'
  },
  {
    q: 'What is the 100% Viral Satisfaction Guarantee?',
    a: 'If your item doesn\'t make you or your friends say "WHOA WHERE DID YOU GET THAT?!", return it within 7 days for a 100% instant hassle-free refund.'
  },
  {
    q: 'Can I add a custom handwritten gift note or gift wrap?',
    a: 'Absolutely! Gift wrap is on the house (free) and you can add a personalized note in the cart drawer before checkout.'
  }
];
