import { useEffect, useState } from "react";
import { X, Trash2, ShoppingBag, ShieldCheck, Tag, ArrowRight, CheckCircle2 } from "lucide-react";
import Visual from "./Visual.jsx";
import { money, PROMO_CODES } from "../data.js";

const FREE_SHIPPING_THRESHOLD = 500000; // ₹5,000 in paise

export default function CartDrawer({
  isOpen,
  onClose,
  cart,
  onQty,
  onRemove,
  onProceedToCheckout,
  appliedPromo,
  setAppliedPromo
}) {
  const [promoInput, setPromoInput] = useState("");
  const [promoError, setPromoError] = useState("");

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const rawSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  // Calculate Discount
  let discountAmount = 0;
  if (appliedPromo) {
    if (appliedPromo.type === "percent") {
      discountAmount = Math.round((rawSubtotal * appliedPromo.value) / 100);
    } else if (appliedPromo.type === "flat") {
      discountAmount = Math.min(appliedPromo.value, rawSubtotal);
    }
  }

  const finalTotal = Math.max(0, rawSubtotal - discountAmount);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - rawSubtotal);
  const shippingProgress = Math.min(100, Math.round((rawSubtotal / FREE_SHIPPING_THRESHOLD) * 100));

  const handleApplyPromo = (e) => {
    e.preventDefault();
    setPromoError("");
    const code = promoInput.trim().toUpperCase();
    if (!code) return;

    const promo = PROMO_CODES[code];
    if (!promo) {
      setPromoError("Invalid code. Try LUXURY10 or FIRSTWATCH");
      return;
    }

    if (rawSubtotal < promo.minSpend) {
      setPromoError(`Minimum spend of ${money(promo.minSpend)} required for this code.`);
      return;
    }

    setAppliedPromo({ code, ...promo });
    setPromoInput("");
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoError("");
  };

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside
        className="cart-drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-label="Your luxury cart"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="drawer-header">
          <div className="drawer-title-group">
            <ShoppingBag size={20} className="gold-accent-icon" />
            <h2>Your Shopping Cart</h2>
            <span className="items-count-pill">{cart.reduce((n, i) => n + i.qty, 0)}</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {/* Free Shipping Meter */}
        <div className="shipping-meter-box">
          <div className="shipping-meter-label">
            {amountToFreeShipping > 0 ? (
              <span>
                Add <strong>{money(amountToFreeShipping)}</strong> more to unlock <strong>VIP Priority Courier</strong>
              </span>
            ) : (
              <span className="unlocked-text">
                <CheckCircle2 size={15} className="inline-icon text-success" /> You've unlocked <strong>Complimentary VIP Priority Air Delivery</strong>!
              </span>
            )}
          </div>
          <div className="progress-bar-track">
            <div
              className="progress-bar-fill"
              style={{ width: `${shippingProgress}%` }}
            />
          </div>
        </div>

        {/* Cart Items List */}
        <div className="drawer-items-container">
          {cart.length === 0 ? (
            <div className="empty-cart-state">
              <ShoppingBag size={48} className="empty-bag-icon" />
              <h3>Your cart is empty</h3>
              <p>Discover our curated collection of mechanical and luxury timepieces.</p>
              <button className="btn-primary" onClick={onClose}>
                Explore Collection
              </button>
            </div>
          ) : (
            <ul className="cart-lines-list">
              {cart.map((line) => {
                const isMaxQty = line.qty >= line.product.stock;
                return (
                  <li key={line.key} className="cart-item-row">
                    <div className="cart-item-visual">
                      <Visual product={line.product} label={line.product.name} />
                    </div>

                    <div className="cart-item-details">
                      <div className="item-title-row">
                        <strong className="item-name">{line.product.name}</strong>
                        <button
                          className="remove-item-btn"
                          onClick={() => onRemove(line.key)}
                          aria-label={`Remove ${line.product.name}`}
                          title="Remove item"
                        >
                          <Trash2 size={15} />
                        </button>
                      </div>

                      <span className="item-option-label">{line.option}</span>

                      <div className="item-price-qty-row">
                        <span className="item-unit-price">
                          {money(line.product.price * line.qty)}
                        </span>

                        <div className="item-qty-stepper">
                          <button
                            onClick={() => onQty(line.key, -1)}
                            aria-label="Decrease quantity"
                          >
                            −
                          </button>
                          <span>{line.qty}</span>
                          <button
                            onClick={() => onQty(line.key, 1)}
                            disabled={isMaxQty}
                            aria-label="Increase quantity"
                            title={isMaxQty ? "Maximum stock reached" : "Add one"}
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* Footer with Promo & Totals */}
        {cart.length > 0 && (
          <div className="drawer-footer-block">
            {/* Promo Code Box */}
            <div className="promo-code-container">
              {appliedPromo ? (
                <div className="applied-promo-banner">
                  <div className="promo-badge">
                    <Tag size={14} />
                    <span>
                      <strong>{appliedPromo.code}</strong> ({appliedPromo.label})
                    </span>
                  </div>
                  <button className="remove-promo-btn" onClick={handleRemovePromo}>
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="promo-input-form">
                  <Tag size={15} className="promo-icon" />
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. LUXURY10)"
                    value={promoInput}
                    onChange={(e) => setPromoInput(e.target.value)}
                  />
                  <button type="submit" className="apply-promo-btn">
                    Apply
                  </button>
                </form>
              )}
              {promoError && <p className="promo-error-msg">{promoError}</p>}
            </div>

            {/* Price Calculations */}
            <div className="totals-breakdown">
              <div className="total-row">
                <span>Subtotal</span>
                <span>{money(rawSubtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="total-row discount-row">
                  <span>Special Promotion ({appliedPromo?.code})</span>
                  <span>−{money(discountAmount)}</span>
                </div>
              )}

              <div className="total-row">
                <span>Insured Express Shipping</span>
                <span className="free-shipping-text">FREE</span>
              </div>

              <div className="total-row final-total-row">
                <strong>Estimated Total (incl. GST)</strong>
                <strong>{money(finalTotal)}</strong>
              </div>
            </div>

            {/* Checkout Action Button */}
            <button
              className="btn-checkout-primary"
              onClick={() => {
                onProceedToCheckout(finalTotal, discountAmount);
              }}
            >
              <span>Continue to Secure Checkout</span>
              <ArrowRight size={18} />
            </button>

            <div className="checkout-security-guarantee">
              <ShieldCheck size={14} className="shield-icon" />
              <span>256-Bit Bank Grade SSL Encrypted Checkout</span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}

