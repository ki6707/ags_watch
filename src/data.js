// AGS Luxury Horology Product Catalog & Store Configuration
export const TYPES = [
  { id: "Gents", single: "Men's Watch", label: "Men's Watches", icon: "Watch", look: { kind: "analog", dial: "#1C2A3A", ink: "#F5F1E8" } },
  { id: "Ladies", single: "Women's Watch", label: "Ladies' Watches", icon: "Sparkles", look: { kind: "analog", dial: "#F8EDEB", ink: "#44403C", bezel: "#C98F7A", accent: "#B76E5D", small: true } },
  { id: "Smart", single: "Smartwatch", label: "Smartwatches", icon: "Activity", look: { kind: "smart", dial: "#0C0A09", ink: "#FAFAF9" } },
  { id: "Wall", single: "Wall Clock", label: "Horological Wall Clocks", icon: "Clock", look: { kind: "wall", dial: "#FAFAF9", ink: "#1C1917", bezel: "#6B4A2B" } },
  { id: "Kids", single: "Junior Timepiece", label: "Junior Collection", icon: "Smile", look: { kind: "digital", dial: "#BFE3F5", ink: "#0C0A09", bezel: "#2B7FB8" } },
];

export const COLLECTIONS = ["Classic", "Everyday", "Sport", "Luxe", "Home"];

export const STRAP_OPTIONS = {
  gents: { label: "Strap Style", values: ["Midnight Calfskin Leather", "Cognac Saddle Leather", "Milanese Steel Mesh"] },
  ladies: { label: "Strap & Clasp", values: ["Rose Gold Mesh", "Pearl White Leather", "Dusty Blush Leather"] },
  wall: { label: "Frame Finish", values: ["Hand-Finished Walnut", "Matte Anthracite", "Brushed Champagne Brass"] },
  smart: { label: "Band Option", values: ["Hypoallergenic Sport Silicone", "316L Stainless Link", "Italian Magnet Leather"] },
  kids: { label: "Band Color", values: ["Cobalt Blue", "Pastel Blush", "Forest Green"] },
};

export const RAW_PRODUCTS = [
  {
    id: "meridian",
    name: "AGS Meridian Chrono",
    type: "Gents",
    collection: "Classic",
    brand: "AGS Masterworks",
    rupees: 12499,
    mrpRupees: 15999,
    rating: 4.8,
    reviews: 842,
    bought: 54,
    stock: 8,
    badge: "Bestseller",
    tagline: "Epitome of sartorial understatement.",
    note: "Crafted with an ultra-slim 38 mm surgical-grade steel case, domed sapphire glass with double anti-reflective coating, and an exhibition caseback.",
    images: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "analog", dial: "#F5F1E8", ink: "#1C1917", accent: "#C5A059" },
    specs: {
      caseDiameter: "38 mm",
      movement: "Calibre 9015 Automatic (42h Reserve)",
      waterResistance: "50m / 5 ATM",
      glass: "Domed Scratchproof Sapphire",
      caseThickness: "8.8 mm",
      warranty: "2 Years Comprehensive International Warranty"
    },
    options: STRAP_OPTIONS.gents,
    reviewsList: [
      { user: "Vikram Malhotra", rating: 5, date: "3 days ago", title: "Flawless craftsmanship", text: "The dial texture in natural sunlight is stunning. Better than watches triple the price." },
      { user: "Dr. Arvind R.", rating: 5, date: "1 week ago", title: "Ultra lightweight & slim", text: "Slides under a French cuff shirtsleeve seamlessly. Superb accuracy." }
    ]
  },
  {
    id: "kovil",
    name: "AGS Kovil Sunburst",
    type: "Gents",
    collection: "Classic",
    brand: "AGS Masterworks",
    rupees: 9999,
    mrpRupees: 12999,
    rating: 4.7,
    reviews: 512,
    bought: 38,
    stock: 12,
    badge: "Heritage Edition",
    tagline: "Warm metallic reflections reminiscent of sanctum lamps.",
    note: "Deep antique brass-gold sunburst dial finished with hand-applied diamond-cut hour batons and a refined date complication at 3 o'clock.",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1508615039623-a25605d2b022?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "analog", dial: "#A16207", ink: "#FAFAF9", accent: "#E6CA65" },
    specs: {
      caseDiameter: "40 mm",
      movement: "Swiss Ronda Quartz Precision Calibre",
      waterResistance: "50m / 5 ATM",
      glass: "Sapphire Coated Crystal",
      caseThickness: "9.2 mm",
      warranty: "2 Years International Warranty"
    },
    options: STRAP_OPTIONS.gents,
    reviewsList: [
      { user: "Karan S.", rating: 5, date: "2 weeks ago", title: "The gold tone is sublime", text: "Not gaudy at all, very rich and warm champagne hue. Top quality." }
    ]
  },
  {
    id: "atlas",
    name: "AGS Atlas Minimalist",
    type: "Gents",
    collection: "Everyday",
    brand: "AGS Everyday",
    rupees: 11499,
    mrpRupees: 14499,
    rating: 4.6,
    reviews: 522,
    bought: 40,
    stock: 0,
    badge: "Sold Out",
    tagline: "Bauhaus purity calibrated for modern daily wear.",
    note: "Gunmetal brushed bezel with crisp sans-serif Arabic typography and a recessed small-seconds subdial at 6 o'clock.",
    images: [
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "analog", dial: "#44403C", ink: "#FAFAF9", accent: "#C5A059" },
    specs: {
      caseDiameter: "39 mm",
      movement: "Precision Quartz Movement with Small Seconds",
      waterResistance: "50m / 5 ATM",
      glass: "Scratch-Resistant Sapphire",
      caseThickness: "8.5 mm",
      warranty: "2 Years International Warranty"
    },
    options: STRAP_OPTIONS.gents,
    reviewsList: [
      { user: "Rohan Kapoor", rating: 4, date: "1 month ago", title: "Clean modern design", text: "Pairs perfectly with casual polos and jackets alike." }
    ]
  },
  {
    id: "harbour",
    name: "Harbour Marine Diver 300",
    type: "Gents",
    collection: "Sport",
    brand: "Harbor Horology",
    rupees: 18999,
    mrpRupees: 23999,
    rating: 4.9,
    reviews: 418,
    bought: 28,
    stock: 5,
    badge: "Professional Diver",
    tagline: "Engineered to withstand deep ocean pressures.",
    note: "120-click ceramic unidirectional rotating bezel, 300m helium escape valve, Super-LumiNova BGW9 indices glowing ice-blue in darkness.",
    images: [
      "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1539185441755-769473a23570?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "analog", dial: "#1C2A3A", ink: "#F5F1E8", accent: "#38BDF8" },
    specs: {
      caseDiameter: "42 mm",
      movement: "High-Beat Automatic Calibre (28,800 bph)",
      waterResistance: "300m / 30 ATM (ISO 6425 Certified)",
      glass: "3.5mm Double-Domed Sapphire Crystal",
      caseThickness: "12.4 mm",
      warranty: "3 Years Worldwide Diver Warranty"
    },
    options: STRAP_OPTIONS.gents,
    reviewsList: [
      { user: "Capt. Shome B.", rating: 5, date: "5 days ago", title: "Certified beast of a dive watch", text: "Took it swimming and snorkeling in Goa. Lume is like a torch." }
    ]
  },
  {
    id: "slate",
    name: "Harbour Slate Tactical Chrono",
    type: "Gents",
    collection: "Sport",
    brand: "Harbor Horology",
    rupees: 15999,
    mrpRupees: 19999,
    rating: 4.5,
    reviews: 198,
    bought: 22,
    stock: 3,
    badge: "Limited Run",
    tagline: "Stealth DLC matte finish with triple chronograph registers.",
    note: "Diamond-Like Carbon (DLC) matte black coating, 1/10th second chronograph split timers, and anti-magnetic iron cage.",
    images: [
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "analog", dial: "#0C0A09", ink: "#FAFAF9", accent: "#E11D48" },
    specs: {
      caseDiameter: "41.5 mm",
      movement: "Mecha-Quartz Flyback Chronograph",
      waterResistance: "100m / 10 ATM",
      glass: "Flat Sapphire with Blue Anti-Reflective",
      caseThickness: "11.1 mm",
      warranty: "2 Years International Warranty"
    },
    options: STRAP_OPTIONS.gents,
    reviewsList: [
      { user: "Devansh Nair", rating: 5, date: "3 weeks ago", title: "Stealth look is unmatched", text: "The black coating does not scratch easily. Chronograph click feels mechanical." }
    ]
  },
  {
    id: "meenal",
    name: "Rosewater Meenal Rose Gold",
    type: "Ladies",
    collection: "Luxe",
    brand: "Rosewater Paris",
    rupees: 13999,
    mrpRupees: 18499,
    rating: 4.9,
    reviews: 320,
    bought: 44,
    stock: 6,
    badge: "Trending Luxury",
    tagline: "Graceful 18K rose-gold ion plating with diamond-cut crystal.",
    note: "Jewelry-grade timepiece boasting an etched guilloché dial, shimmering Austrian pavé crystals along the bezel, and ultra-comfortable Milanese weave.",
    images: [
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "analog", dial: "#F8EDEB", ink: "#44403C", bezel: "#C98F7A", accent: "#B76E5D", small: true },
    specs: {
      caseDiameter: "31 mm",
      movement: "Swiss Ronda Quartz Movement",
      waterResistance: "30m / 3 ATM",
      glass: "Facet-Cut Beveled Sapphire Crystal",
      caseThickness: "7.0 mm",
      warranty: "2 Years International Warranty"
    },
    options: STRAP_OPTIONS.ladies,
    reviewsList: [
      { user: "Ananya Deshmukh", rating: 5, date: "4 days ago", title: "Looks like a piece of high jewelry", text: "Wore it to a wedding reception and received so many compliments. Beautiful rose gold tone!" }
    ]
  },
  {
    id: "pearl",
    name: "Rosewater Pearl Petite",
    type: "Ladies",
    collection: "Classic",
    brand: "Rosewater Paris",
    rupees: 10499,
    mrpRupees: 13499,
    rating: 4.7,
    reviews: 145,
    bought: 19,
    stock: 7,
    badge: "Mother of Pearl",
    tagline: "Natural iridescent dial displaying unique color shifts.",
    note: "Crafted from genuine sustainably sourced Australian mother of pearl with polished silver indices and an ultra-delicate 28 mm profile.",
    images: [
      "https://images.unsplash.com/photo-1547996160-71dfabbce5fa?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "analog", dial: "#FFFFFF", ink: "#1C1917", bezel: "#A8A29E", small: true },
    specs: {
      caseDiameter: "28 mm",
      movement: "Miyota Slim Quartz",
      waterResistance: "30m / 3 ATM",
      glass: "Scratch-Resistant Sapphire",
      caseThickness: "6.8 mm",
      warranty: "2 Years International Warranty"
    },
    options: STRAP_OPTIONS.ladies,
    reviewsList: [
      { user: "Pooja Trivedi", rating: 5, date: "2 weeks ago", title: "Petite and extremely elegant", text: "Fits my small wrist without having to remove huge links. Absolutely love it." }
    ]
  },
  {
    id: "noor",
    name: "Rosewater Noor Minimalist",
    type: "Ladies",
    collection: "Everyday",
    brand: "Rosewater Paris",
    rupees: 8999,
    mrpRupees: 11499,
    rating: 4.6,
    reviews: 640,
    bought: 36,
    stock: 9,
    badge: "Best Value",
    tagline: "Effortless Parisian chic designed for daily styling.",
    note: "Frost silver sunray dial with minimal baton markings and quick-release genuine leather strap.",
    images: [
      "https://images.unsplash.com/photo-1511367461989-f85a21fda167?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "analog", dial: "#E8ECF0", ink: "#0C0A09", small: true },
    specs: {
      caseDiameter: "30 mm",
      movement: "Japanese Quartz Calibre",
      waterResistance: "30m / 3 ATM",
      glass: "Mineral Hardened Crystal",
      caseThickness: "7.5 mm",
      warranty: "2 Years International Warranty"
    },
    options: STRAP_OPTIONS.ladies,
    reviewsList: [
      { user: "Meera Sen", rating: 5, date: "1 week ago", title: "Daily staple watch", text: "Goes with office wear and casual outfits. High-grade leather strap." }
    ]
  },
  {
    id: "jasmine",
    name: "AGS Jasmine Sage Blossom",
    type: "Ladies",
    collection: "Everyday",
    brand: "AGS Masterworks",
    rupees: 7499,
    mrpRupees: 9499,
    rating: 4.4,
    reviews: 112,
    bought: 24,
    stock: 14,
    badge: "Pastel Collection",
    tagline: "Tranquil botanical green dial with gold accents.",
    note: "Soft sage-green matte dial bordered by champagne gold bevels, providing a fresh contemporary accent to your wardrobe.",
    images: [
      "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1508057198894-247b23fe5ade?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "analog", dial: "#D9E8DD", ink: "#1C1917", small: true },
    specs: {
      caseDiameter: "32 mm",
      movement: "Precision Quartz Movement",
      waterResistance: "30m / 3 ATM",
      glass: "Scratch-Resistant Sapphire Crystal",
      caseThickness: "7.8 mm",
      warranty: "2 Years International Warranty"
    },
    options: STRAP_OPTIONS.ladies,
    reviewsList: [
      { user: "Sneha Reddy", rating: 4, date: "3 weeks ago", title: "Lovely pastel tone", text: "The sage green color is very calm and pretty in person." }
    ]
  },
  {
    id: "pulse",
    name: "Orbit Pulse Titanium Pro",
    type: "Smart",
    collection: "Sport",
    brand: "Orbit Connected",
    rupees: 6999,
    mrpRupees: 10499,
    rating: 4.6,
    reviews: 1210,
    bought: 64,
    stock: 15,
    badge: "Top Rated Smart",
    tagline: "Aerospace titanium chassis with 1.43\" AMOLED display.",
    note: "Comprehensive biometric health suite including continuous ECG estimation, Blood Oxygen (SpO2), dual-frequency GPS, and 12-day battery life.",
    images: [
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "smart", dial: "#0C0A09", ink: "#FAFAF9", accent: "#10B981" },
    specs: {
      display: "1.43\" Ultra HD AMOLED (1000 nits)",
      batteryLife: "Up to 12 days standard / 5 days Always-On",
      sensors: "PPG Optical Heart Rate, SpO2, Barometer, Gyroscope",
      waterResistance: "5 ATM (50m Swimproof)",
      compatibility: "iOS 14+ and Android 9.0+",
      warranty: "1 Year Comprehensive Tech Warranty"
    },
    options: STRAP_OPTIONS.smart,
    reviewsList: [
      { user: "Karthik Verma", rating: 5, date: "2 days ago", title: "Battery life actually lasts 10+ days!", text: "Bright outdoor display, sleep tracking is pinpoint accurate." }
    ]
  },
  {
    id: "orbit",
    name: "Orbit Horology Connected X",
    type: "Smart",
    collection: "Everyday",
    brand: "Orbit Connected",
    rupees: 8499,
    mrpRupees: 12499,
    rating: 4.7,
    reviews: 430,
    bought: 32,
    stock: 9,
    badge: "Smart Luxury",
    tagline: "Hybrid smartwatch styling with haptic smart notifications.",
    note: "Combines classic analog watch aesthetics with an invisible OLED touchscreen that illuminates only when tapped or notified.",
    images: [
      "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "smart", dial: "#1C2A3A", ink: "#F5F1E8", accent: "#6366F1" },
    specs: {
      display: "Discreet Hidden OLED + Mechanical Hands",
      batteryLife: "30 Days in Analog Mode / 10 Days Connected",
      sensors: "Wrist Heart Rate, Step Counter, Stress Monitor",
      waterResistance: "5 ATM (50m)",
      compatibility: "iOS & Android Companion App",
      warranty: "1 Year Comprehensive Tech Warranty"
    },
    options: STRAP_OPTIONS.smart,
    reviewsList: [
      { user: "Siddharth Jain", rating: 5, date: "1 week ago", title: "The best of both worlds", text: "I love real watch hands, but need subtle message vibrates during meetings. Perfect hybrid." }
    ]
  },
  {
    id: "tower",
    name: "Hearth Tower Solid Walnut Clock",
    type: "Wall",
    collection: "Home",
    brand: "Hearth & Home",
    rupees: 3499,
    mrpRupees: 4799,
    rating: 4.8,
    reviews: 931,
    bought: 55,
    stock: 10,
    badge: "Architect's Choice",
    tagline: "35 cm Scandinavian crafted timepiece with silent sweep movement.",
    note: "Sculpted from sustainably harvested American Walnut wood. High-torque sweep quartz mechanism produces zero audible ticking sounds.",
    images: [
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "wall", dial: "#FAFAF9", ink: "#1C1917", bezel: "#6B4A2B" },
    specs: {
      diameter: "35 cm (14 inches)",
      movement: "Silent Sweep Quartz (Non-Ticking)",
      material: "Solid American Walnut Wood + Glass Cover",
      battery: "1 x AA Battery (Included)",
      warranty: "2 Years Replacement Warranty"
    },
    options: STRAP_OPTIONS.wall,
    reviewsList: [
      { user: "Sunita Menon", rating: 5, date: "1 week ago", title: "Truly whisper silent", text: "Hang in our bedroom. Absolutely zero sound and the wood grain is gorgeous." }
    ]
  },
  {
    id: "foundry",
    name: "Hearth Foundry Industrial 40",
    type: "Wall",
    collection: "Home",
    brand: "Hearth & Home",
    rupees: 4299,
    mrpRupees: 5999,
    rating: 4.6,
    reviews: 266,
    bought: 17,
    stock: 4,
    badge: "Statement Decor",
    tagline: "40 cm bold architectural clock with powder-coated steel frame.",
    note: "Industrial loft statement piece with deep matte black dial, embossed brass indicators, and protective glare-resistant mineral glass.",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "wall", dial: "#1C1917", ink: "#FAFAF9", bezel: "#44403C" },
    specs: {
      diameter: "40 cm (16 inches)",
      movement: "High-Torque Silent Sweep Quartz",
      material: "Matte Powder-Coated Steel Rim",
      battery: "1 x AA Battery (Included)",
      warranty: "2 Years Replacement Warranty"
    },
    options: STRAP_OPTIONS.wall,
    reviewsList: [
      { user: "Rajiv S.", rating: 5, date: "3 weeks ago", title: "Commands the room", text: "Looks magnificent on our exposed brick accent wall." }
    ]
  },
  {
    id: "sunrise",
    name: "Hearth Sunrise Brushed Brass Clock",
    type: "Wall",
    collection: "Home",
    brand: "Hearth & Home",
    rupees: 2799,
    mrpRupees: 3899,
    rating: 4.5,
    reviews: 189,
    bought: 22,
    stock: 11,
    badge: "Warm Ambience",
    tagline: "30 cm warm spun-brass bezel catching natural room lighting.",
    note: "Pared-back minimalist dial with warm champagne tones and delicate spun-brass hands designed to elevate modern living interiors.",
    images: [
      "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "wall", dial: "#F5E6C8", ink: "#44403C", bezel: "#A16207" },
    specs: {
      diameter: "30 cm (12 inches)",
      movement: "Whisper-Quiet Quartz Movement",
      material: "Spun Brass Outer Ring + Glass Face",
      battery: "1 x AA Battery (Included)",
      warranty: "2 Years Replacement Warranty"
    },
    options: STRAP_OPTIONS.wall,
    reviewsList: [
      { user: "Priya Ghosh", rating: 4, date: "1 month ago", title: "Very pretty gold shimmer", text: "Well made and lightweight enough to hang easily on drywall." }
    ]
  },
  {
    id: "bubbles",
    name: "Little Tick Aqua Splash Digital",
    type: "Kids",
    collection: "Everyday",
    brand: "Little Tick",
    rupees: 1999,
    mrpRupees: 2699,
    rating: 4.7,
    reviews: 1502,
    bought: 47,
    stock: 20,
    badge: "Kid-Safe Silicone",
    tagline: "Shockproof, water-resistant digital watch for young adventurers.",
    note: "Crafted with hypoallergenic food-grade silicone, dual-color LED backlight, intuitive time-learning dial, and 50m splash resistance.",
    images: [
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "digital", dial: "#BFE3F5", ink: "#0C0A09", bezel: "#2B7FB8" },
    specs: {
      caseDiameter: "34 mm",
      features: "Dual Time, Alarm, Hourly Chime, EL Backlight",
      strap: "Ultra-Soft BPA-Free Food Grade Silicone",
      waterResistance: "50m (Swim & Splash Safe)",
      batteryLife: "Up to 3 Years on CR2025 Cell",
      warranty: "1 Year Child-Proof Guarantee"
    },
    options: STRAP_OPTIONS.kids,
    reviewsList: [
      { user: "Deepa Raman", rating: 5, date: "3 days ago", title: "My son hasn't taken it off", text: "Very soft strap that doesn't irritate his sensitive skin. Survives daily playground rough and tumble." }
    ]
  },
  {
    id: "rocket",
    name: "Little Tick Rocket Chrono Digital",
    type: "Kids",
    collection: "Sport",
    brand: "Little Tick",
    rupees: 2299,
    mrpRupees: 3199,
    rating: 4.6,
    reviews: 388,
    bought: 19,
    stock: 2,
    badge: "Only 2 Left",
    tagline: "Space-themed rugged bezel with precision stopwatch.",
    note: "Features high-contrast digital segment display, multi-color rainbow backlighting, and reinforced bumper guard.",
    images: [
      "https://images.unsplash.com/photo-1533139502658-0198f920d8e8?auto=format&fit=crop&w=1000&q=85",
      "https://images.unsplash.com/photo-1524592094714-0f0654e20314?auto=format&fit=crop&w=1000&q=85"
    ],
    look: { kind: "digital", dial: "#F8D5D8", ink: "#0C0A09", bezel: "#D1495B" },
    specs: {
      caseDiameter: "36 mm",
      features: "Stopwatch, Countdown, Daily Alarm, Rainbow LED",
      strap: "Flexible Resin Strap with Steel Buckle",
      waterResistance: "50m (Swimming safe)",
      batteryLife: "Up to 2.5 Years",
      warranty: "1 Year Child-Proof Guarantee"
    },
    options: STRAP_OPTIONS.kids,
    reviewsList: [
      { user: "Amitava Mukherjee", rating: 5, date: "1 week ago", title: "Daughter loves the rainbow light", text: "Helped her learn how to tell digital time and use the stopwatch." }
    ]
  }
];

export const PRODUCTS = RAW_PRODUCTS.map((p) => {
  const price = p.rupees * 100;
  const mrp = p.mrpRupees * 100;
  const off = Math.round((1 - price / mrp) * 100);
  return {
    ...p,
    price,
    mrp,
    off,
    image: p.images[0]
  };
});

export const BRANDS = [...new Set(PRODUCTS.map((p) => p.brand))];

export const PRICE_BANDS = [
  { id: "a", label: "Under ₹3,000", min: 0, max: 300000 },
  { id: "b", label: "₹3,000 – ₹8,000", min: 300000, max: 800000 },
  { id: "c", label: "₹8,000 – ₹14,000", min: 800000, max: 1400000 },
  { id: "d", label: "₹14,000 and above", min: 1400000, max: Infinity },
];

export const PROMO_CODES = {
  LUXURY10: { type: "percent", value: 10, label: "10% Off Entire Order", minSpend: 0 },
  AGS2000: { type: "flat", value: 200000, label: "₹2,000 Off Luxury Tier", minSpend: 1000000 },
  FIRSTWATCH: { type: "flat", value: 150000, label: "₹1,500 Off First Purchase", minSpend: 500000 },
};

export const INITIAL_ORDERS = [
  {
    orderId: "AGS-94821",
    date: "18 Oct 2026",
    status: "In Transit",
    currentStep: 3,
    carrier: "Blue Dart Express Air",
    awbNumber: "BD992817401IN",
    estimatedDelivery: "Tomorrow by 2:00 PM",
    destination: "Bengaluru, Karnataka - 560001",
    items: [
      { name: "AGS Meridian Chrono", option: "Cognac Saddle Leather", qty: 1, price: 1249900, image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=500&q=80" }
    ],
    totalPaid: 1249900,
    steps: [
      { title: "Order Confirmed", time: "18 Oct, 10:30 AM", done: true },
      { title: "Horology Quality Check Passed", time: "18 Oct, 03:15 PM", done: true },
      { title: "Dispatched via Express Courier", time: "19 Oct, 08:00 AM", done: true },
      { title: "Out for Delivery", time: "Expected 20 Oct, 11:00 AM", done: false },
      { title: "Delivered & Signed", time: "Pending", done: false }
    ]
  }
];

export const money = (paise) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(paise / 100);


