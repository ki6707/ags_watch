import { ShieldCheck, Award, Truck, RefreshCw, ChevronRight } from "lucide-react";
import WatchFace from "./WatchFace.jsx";

export default function HeroBanner({ time, onExplore, onSelectSale }) {
  return (
    <section className="hero-banner">
      <div className="hero-grid">
        <div className="hero-content">
          <div className="hero-tag">
            <span className="gold-dot"></span>
            MASTERPIECE COLLECTION • AUTUMN 2026
          </div>
          <h1 className="hero-title">
            The Art of Precision &amp; Timeless Horology
          </h1>
          <p className="hero-description">
            Discover bespoke mechanical chronographs, Parisian jewelry watches, whisper-quiet wall clocks,
            and connected timepieces crafted for connoisseurs. Every timepiece includes a 2-year international warranty.
          </p>

          <div className="hero-cta-group">
            <button className="btn-primary" onClick={onExplore}>
              Explore Collection <ChevronRight size={17} />
            </button>
            <button className="btn-secondary" onClick={onSelectSale}>
              View Festive Offers (Up to 35% Off)
            </button>
          </div>
        </div>

        {/* Live Vector Horology Showcase */}
        <div className="hero-visual">
          <div className="hero-dial-card">
            <div className="dial-header">
              <span className="live-indicator"><span className="pulse-dot"></span> LIVE TIME</span>
              <span className="calibre-label">CALIBRE 9015</span>
            </div>
            <div className="dial-container">
              <WatchFace dial="#F5F1E8" ink="#1C1917" accent="#C5A059" bezel="#292524" time={time} />
            </div>
            <div className="dial-footer">
              <strong>AGS Meridian Chrono</strong>
              <span>Automatic • 38 mm Sapphire</span>
            </div>
          </div>
        </div>
      </div>

      {/* Trust Guarantee Bar */}
      <div className="trust-strip">
        <div className="trust-item">
          <ShieldCheck size={20} className="trust-icon" />
          <div>
            <strong>100% Certified Authentic</strong>
            <small>Direct from horology artisans</small>
          </div>
        </div>
        <div className="trust-item">
          <Award size={20} className="trust-icon" />
          <div>
            <strong>2-Year Warranty</strong>
            <small>Comprehensive coverage</small>
          </div>
        </div>
        <div className="trust-item">
          <Truck size={20} className="trust-icon" />
          <div>
            <strong>Free Insured Express Air</strong>
            <small>Dispatched within 24 hours</small>
          </div>
        </div>
        <div className="trust-item">
          <RefreshCw size={20} className="trust-icon" />
          <div>
            <strong>14-Day Home Trial</strong>
            <small>Hassle-free complimentary returns</small>
          </div>
        </div>
      </div>
    </section>
  );
}

