import { ShieldCheck, Truck, Clock, Mail, Phone, MapPin, Award } from "lucide-react";

export default function Footer({ onCategoryClick, onOpenAdmin }) {
  return (
    <footer className="site-footer">
      {/* Horology VIP Newsletter */}
      <div className="footer-newsletter-banner">
        <div className="newsletter-container">
          <div className="newsletter-text">
            <h3>Join The AGS Horology Journal</h3>
            <p>Receive exclusive invitations to bespoke releases, artisan spotlights, and collector previews.</p>
          </div>
          <form className="newsletter-form" onSubmit={(e) => { e.preventDefault(); alert("Thank you for joining our private horology registry."); }}>
            <input type="email" placeholder="Enter your email address" required />
            <button type="submit" className="newsletter-btn">
              Subscribe Privately
            </button>
          </form>
        </div>
      </div>

      <div className="footer-main-grid">
        {/* Brand Column */}
        <div className="footer-col brand-col">
          <div className="footer-logo">
            <span className="logo-crest">AGS</span>
            <span className="logo-title">AGS &amp; HOROLOGY</span>
          </div>
          <p className="footer-mission">
            Purveyors of fine mechanical chronographs, Parisian jewelry watches, whisper-quiet Scandinavian clocks,
            and connected timepieces. Calibrated with unyielding commitment to artisan craftsmanship.
          </p>
          <div className="footer-assurance">
            <Award size={18} className="gold-icon" />
            <span>Official 2-Year International Certified Warranty</span>
          </div>
        </div>

        {/* Collections */}
        <div className="footer-col">
          <h4>Timepiece Maisons</h4>
          <ul>
            <li><button onClick={() => onCategoryClick("Gents")}>Gents Mechanical &amp; Chronos</button></li>
            <li><button onClick={() => onCategoryClick("Ladies")}>Ladies' Haute Horlogerie</button></li>
            <li><button onClick={() => onCategoryClick("Smart")}>Connected Orbit Smartwatches</button></li>
            <li><button onClick={() => onCategoryClick("Wall")}>Silent Architectural Wall Clocks</button></li>
            <li><button onClick={() => onCategoryClick("Kids")}>Junior Explorers Timepieces</button></li>
            <li><button onClick={() => onCategoryClick("Sale")}>Exclusive Festive Offers</button></li>
          </ul>
        </div>

        {/* Client Concierge */}
        <div className="footer-col">
          <h4>Client Concierge</h4>
          <ul className="contact-list">
            <li>
              <Phone size={15} className="contact-icon" />
              <span>+91 1800 209 8899 (Toll Free)</span>
            </li>
            <li>
              <Mail size={15} className="contact-icon" />
              <span>concierge@agswatch.example</span>
            </li>
            <li>
              <Clock size={15} className="contact-icon" />
              <span>Mon – Sun, 9:00 AM – 9:00 PM IST</span>
            </li>
            <li>
              <MapPin size={15} className="contact-icon" />
              <span>Horology Boutique: Mumbai &amp; Bengaluru</span>
            </li>
          </ul>
        </div>

        {/* Assurance & Policies */}
        <div className="footer-col">
          <h4>Service &amp; Guarantees</h4>
          <ul>
            <li><a href="#results">Complimentary Insured Courier</a></li>
            <li><a href="#results">14-Day In-Home Return Trial</a></li>
            <li><a href="#results">Watch Movement Calibration</a></li>
            <li><a href="#results">Authenticity Certificate Verification</a></li>
            <li><button onClick={onOpenAdmin} className="footer-owner-link">📦 Store Owner / Packing Portal</button></li>
          </ul>
        </div>
      </div>

      {/* Footer Bottom Bar */}
      <div className="footer-bottom-bar">
        <div className="copyright-text">
          &copy; 2026 AGS Horology Private Limited. All rights reserved.
        </div>

        <div className="payment-security-badges">
          <span>Supported Payments:</span>
          <span className="payment-tag">UPI</span>
          <span className="payment-tag">Visa</span>
          <span className="payment-tag">Mastercard</span>
          <span className="payment-tag">RuPay</span>
          <span className="payment-tag">Net Banking</span>
          <span className="payment-tag">Cash on Delivery</span>
        </div>
      </div>
    </footer>
  );
}

