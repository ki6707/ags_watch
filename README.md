# AGS & Horology — Luxury Watch E-Commerce Platform

A fine horology e-commerce storefront crafted in React 18, Vite, and modern CSS. Featuring high-resolution watch photography, live horological clock renderers, multi-step checkout with simulated payments, dynamic order tracking, coupon code engine, side-by-side comparison matrix, and full dark/light luxury theme support.

---

## ⚡ Quick Start

```bash
cd ags-watch-store
npm install
npm run dev
```

To build for production:
```bash
npm run build
npm run preview
```

---

## 🌟 Key Features

### 1. High-Resolution Watch Photography & Media
- Curated high-resolution watch photography for every timepiece category:
  - **Men's Horology**: Automatic chronographs, sapphire glass dive watches, and Bauhaus dress watches.
  - **Ladies' Elegance**: Rose gold guilloché timepieces, mother-of-pearl dials, and diamond-beveled crystals.
  - **Smart Connected**: AMOLED titanium smartwatches and hybrid connected timepieces.
  - **Architectural Wall Clocks**: Solid walnut Scandinavian and industrial steel silent-sweep clocks.
  - **Junior Collection**: Soft silicone dual-time and rainbow LED explorer watches.
- Interactive multi-angle image gallery with thumbnail preview in the product modal.
- Skeleton loading and graceful fallback to custom live vector SVG watch faces (`WatchFace.jsx`).

### 2. Complete Multi-Step Checkout Flow
- **Step 1: Shipping Address & Contact** — Full name, email, phone, street, city, state, and pincode.
- **Step 2: Delivery & Packaging** — Choose between Complimentary Insured Air Courier (Free) and VIP Priority Jet Courier (+₹499), plus optional bespoke wooden gift box (+₹299) with wax seal and gift message.
- **Step 3: Payment Instrument Simulation** —
  - **Instant UPI / QR Code**: Dynamic QR code mockup + one-click apps (Google Pay, PhonePe, Paytm).
  - **Credit / Debit Cards**: Formatted card preview chip, card number, cardholder name, expiry, CVV.
  - **Net Banking**: HDFC, ICICI, SBI, Axis, Kotak, and IndusInd.
  - **Cash on Delivery (COD)**: With OTP confirmation notice.
- **Step 4: Order Confirmation & Live Tracking** —
  - Confetti celebration burst via `canvas-confetti`.
  - Generated Order Reference ID (e.g. `AGS-89241`).
  - Automatically saved to persistent order history in `localStorage`.
  - Live 5-stage shipment progress tracker with estimated arrival time and courier AWB.

### 3. Order Tracking System
- Dedicated **Track Order** modal available directly from the header.
- Look up any Order ID or select from active orders placed during browsing.
- Real-time courier status, destination details, and step-by-step dispatch timeline.

### 4. Interactive Cart Drawer & Promo Code Engine
- Slide-over drawer with backdrop blur.
- Live **Free Priority Shipping Meter** (calculates amount remaining to unlock VIP Air Delivery).
- Line items with selected strap/finish option, quantity stepper, and remove action.
- Working promo discount coupon system:
  - `LUXURY10`: 10% off entire order
  - `FIRSTWATCH`: ₹1,500 off purchases over ₹5,000
  - `AGS2000`: ₹2,000 off luxury purchases over ₹10,000

### 5. Product Comparison Matrix
- Compare up to 3 timepieces side-by-side.
- Compares Movement Calibre, Case Diameter, Water Resistance, Glass Type, Warranty, Price, and Customer Ratings.
- Direct "Add to Cart" button from the comparison sheet.

### 6. Pincode Delivery Estimator & Customer Reviews
- Product detail view includes a live Indian pincode checker for estimated delivery times and courier eligibility.
- Customer reviews tab with verified buyer ratings, reviews count, and comments.

### 7. Dual Luxury Theme
- **Daylight Luxury**: Crisp warm platinum and champagne gold.
- **Midnight Luxury (Dark Mode)**: Obsidian and titanium with gold illumination.

---

## 📁 Architecture

```
ags-watch-store/
├── public/
│   └── images/
├── src/
│   ├── components/
│   │   ├── Header.jsx             # Top bar, brand crest, live search, wishlist & cart badges
│   │   ├── HeroBanner.jsx         # Luxury showcase, live ticking clock card, trust badges
│   │   ├── CategoryNav.jsx        # Category pills with Lucide icons (Men, Women, Smart, etc.)
│   │   ├── FilterSidebar.jsx      # Faceted filters (brands, collections, price bands, stock, sorting)
│   │   ├── ProductCard.jsx        # Luxury card with hover zoom, quick view, wishlist, compare
│   │   ├── ProductDetailModal.jsx # Multi-angle gallery, spec sheet, pincode checker, reviews
│   │   ├── CartDrawer.jsx         # Slide-in drawer with coupon code validator & shipping meter
│   │   ├── CheckoutModal.jsx      # 4-step checkout: Address -> Delivery -> Payment -> Tracking
│   │   ├── OrderTrackingModal.jsx # AWB & order reference lookup with live timeline
│   │   ├── CompareModal.jsx       # Side-by-side comparative matrix
│   │   ├── WishlistDrawer.jsx     # Saved favorites slide-over with "Move to Cart"
│   │   ├── Footer.jsx             # Newsletter registry, concierge contact, guarantees
│   │   ├── Visual.jsx             # Photo loader with skeleton and SVG fallback
│   │   └── WatchFace.jsx          # Live vector SVG clock engine
│   ├── data.js                    # Rich horology catalog, specs, promo codes, initial orders
│   ├── styles.css                 # Comprehensive luxury design system (light & dark modes)
│   ├── App.jsx                    # Central state orchestrator and modals manager
│   └── main.jsx
├── index.html                     # Favicon, Cormorant Garamond & Montserrat Google Fonts
└── package.json
```
