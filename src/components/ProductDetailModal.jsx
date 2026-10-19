import { useState, useEffect } from "react";
import { X, Star, ShieldCheck, Truck, RefreshCw, ShoppingBag, ArrowRight, Check, MapPin } from "lucide-react";
import Visual from "./Visual.jsx";
import { money } from "../data.js";

export default function ProductDetailModal({
  product,
  onClose,
  onAddToCart,
  onBuyNow,
  isWishlisted,
  onToggleWishlist
}) {
  const [selectedImage, setSelectedImage] = useState(
    (product?.images && product.images[0]) || product?.image
  );
  const [selectedOption, setSelectedOption] = useState(
    product?.options?.values[0] || "Standard"
  );
  const [quantity, setQuantity] = useState(1);
  const [pincode, setPincode] = useState("");
  const [deliveryInfo, setDeliveryInfo] = useState(null);
  const [activeTab, setActiveTab] = useState("specs"); // 'specs' | 'reviews' | 'care'

  useEffect(() => {
    setSelectedImage((product?.images && product.images[0]) || product?.image);
    setSelectedOption(product?.options?.values[0] || "Standard");
    setQuantity(1);
    setDeliveryInfo(null);
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const isOutOfStock = product.stock === 0;

  const handleCheckPincode = (e) => {
    e.preventDefault();
    if (pincode.trim().length >= 6) {
      setDeliveryInfo({
        status: "available",
        date: "Tomorrow by 2:00 PM",
        courier: "Blue Dart Insured Air Express",
        cashOnDelivery: true
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="product-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-product-title"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close details">
          <X size={22} />
        </button>

        <div className="product-modal-grid">
          {/* Left Column: Image Gallery */}
          <div className="modal-gallery-column">
            <div className="main-image-display">
              <Visual
                product={product}
                src={selectedImage}
                label={product.name}
                className="gallery-main-visual"
              />
              {product.badge && (
                <span className="gallery-badge-overlay">{product.badge}</span>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {product.images && product.images.length > 1 && (
              <div className="thumbnail-track">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    className={`thumb-btn ${selectedImage === img ? "is-active" : ""}`}
                    onClick={() => setSelectedImage(img)}
                    aria-label={`View angle ${idx + 1}`}
                  >
                    <img src={img} alt={`${product.name} angle ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}

            {/* Trust Assurances */}
            <div className="gallery-trust-box">
              <div className="trust-row">
                <ShieldCheck size={18} className="trust-accent" />
                <span>2-Year International Certified Warranty</span>
              </div>
              <div className="trust-row">
                <Truck size={18} className="trust-accent" />
                <span>Complimentary Insured Courier with Live GPS Tracking</span>
              </div>
              <div className="trust-row">
                <RefreshCw size={18} className="trust-accent" />
                <span>14-Day In-Home Trial with 100% Refund</span>
              </div>
            </div>
          </div>

          {/* Right Column: Specifications & Purchasing */}
          <div className="modal-info-column">
            <div className="modal-info-header">
              <div className="brand-category-tag">
                <span className="brand-text-label">{product.brand}</span>
                <span className="dot-divider">•</span>
                <span>{product.collection} Collection</span>
              </div>
              <h2 id="modal-product-title" className="product-title-modal">
                {product.name}
              </h2>

              {/* Rating Summary */}
              <div className="modal-rating-row">
                <div className="stars-cluster">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star
                      key={i}
                      size={15}
                      className={i < Math.floor(product.rating) ? "star-gold" : "star-muted"}
                    />
                  ))}
                </div>
                <span className="rating-score">{product.rating.toFixed(1)}</span>
                <span className="reviews-link" onClick={() => setActiveTab("reviews")}>
                  ({product.reviews} verified reviews)
                </span>
              </div>
            </div>

            {/* Pricing Details */}
            <div className="modal-pricing-row">
              <div className="price-tag-large">{money(product.price)}</div>
              {product.mrp > product.price && (
                <>
                  <s className="mrp-strikethrough">{money(product.mrp)}</s>
                  <span className="discount-pill">Save {product.off}%</span>
                </>
              )}
              <span className="tax-inclusive-tag">All taxes included</span>
            </div>

            <p className="product-description-text">{product.note}</p>

            {/* Strap / Finish Option Selector */}
            {product.options && (
              <div className="options-selection-group">
                <label className="options-group-label">
                  Select {product.options.label}: <strong>{selectedOption}</strong>
                </label>
                <div className="chips-wrapper">
                  {product.options.values.map((val) => (
                    <button
                      key={val}
                      className={`option-chip ${selectedOption === val ? "is-selected" : ""}`}
                      onClick={() => setSelectedOption(val)}
                    >
                      {selectedOption === val && <Check size={14} className="chip-check" />}
                      <span>{val}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector & Stock Indicator */}
            <div className="purchasing-controls-row">
              <div className="quantity-counter">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  disabled={quantity <= 1 || isOutOfStock}
                  aria-label="Decrease quantity"
                >
                  −
                </button>
                <span>{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                  disabled={quantity >= product.stock || isOutOfStock}
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              <div className="stock-notice">
                {isOutOfStock ? (
                  <span className="stock-badge out-badge">Out of Stock</span>
                ) : product.stock <= 4 ? (
                  <span className="stock-badge low-badge">Only {product.stock} pieces left</span>
                ) : (
                  <span className="stock-badge in-badge">In Stock &amp; Ready to Ship</span>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="modal-cta-buttons">
              <button
                className="btn-add-cart"
                disabled={isOutOfStock}
                onClick={() => {
                  onAddToCart(product, selectedOption, quantity);
                  onClose();
                }}
              >
                <ShoppingBag size={18} />
                <span>{isOutOfStock ? "Temporarily Unavailable" : "Add to Shopping Cart"}</span>
              </button>

              <button
                className="btn-buy-now"
                disabled={isOutOfStock}
                onClick={() => {
                  onBuyNow(product, selectedOption, quantity);
                  onClose();
                }}
              >
                <span>Buy Now with Express Checkout</span>
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Delivery Pincode Checker */}
            <div className="pincode-checker-box">
              <form onSubmit={handleCheckPincode} className="pincode-form">
                <MapPin size={16} className="pin-icon" />
                <input
                  type="text"
                  maxLength={6}
                  placeholder="Enter 6-digit Delivery Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value.replace(/\D/g, ""))}
                />
                <button type="submit" className="pincode-check-btn">
                  Check
                </button>
              </form>

              {deliveryInfo && (
                <div className="delivery-result-notice">
                  <div className="result-line">
                    <Check size={14} className="check-green" />
                    <span>Next-Day Air Delivery confirmed: <strong>{deliveryInfo.date}</strong></span>
                  </div>
                  <div className="result-sub">
                    Carrier: {deliveryInfo.courier} • Cash on Delivery Eligible
                  </div>
                </div>
              )}
            </div>

            {/* Detailed Tabs: Specifications, Reviews, Care */}
            <div className="modal-tabs-container">
              <div className="tabs-header">
                <button
                  className={`tab-btn ${activeTab === "specs" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("specs")}
                >
                  Technical Specifications
                </button>
                <button
                  className={`tab-btn ${activeTab === "reviews" ? "is-active" : ""}`}
                  onClick={() => setActiveTab("reviews")}
                >
                  Verified Reviews ({product.reviewsList?.length || 0})
                </button>
              </div>

              <div className="tab-body">
                {activeTab === "specs" && (
                  <table className="specs-table">
                    <tbody>
                      {product.specs &&
                        Object.entries(product.specs).map(([key, value]) => (
                          <tr key={key}>
                            <th scope="row">
                              {key
                                .replace(/([A-Z])/g, " $1")
                                .replace(/^./, (str) => str.toUpperCase())}
                            </th>
                            <td>{value}</td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                )}

                {activeTab === "reviews" && (
                  <div className="reviews-tab-content">
                    {product.reviewsList?.map((rev, idx) => (
                      <div key={idx} className="review-item">
                        <div className="review-meta">
                          <span className="review-user">{rev.user}</span>
                          <span className="review-date">{rev.date}</span>
                        </div>
                        <div className="review-stars">
                          {Array.from({ length: rev.rating }, (_, i) => (
                            <Star key={i} size={13} className="star-gold" />
                          ))}
                        </div>
                        <strong className="review-title">{rev.title}</strong>
                        <p className="review-text">{rev.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

