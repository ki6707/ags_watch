import { useState } from "react";
import {
  X,
  Check,
  ChevronRight,
  ShieldCheck,
  CreditCard,
  QrCode,
  Building,
  Banknote,
  Package,
  Gift,
  CheckCircle2,
  Clock,
  Truck,
  Copy,
  ExternalLink
} from "lucide-react";
import confetti from "canvas-confetti";
import Visual from "./Visual.jsx";
import { money } from "../data.js";

const STEPS = [
  { id: 1, title: "Shipping Address" },
  { id: 2, title: "Delivery & Gift" },
  { id: 3, title: "Payment" },
  { id: 4, title: "Order Confirmed" },
];

export default function CheckoutModal({
  isOpen,
  onClose,
  cart,
  totalAmount,
  discountAmount,
  appliedPromo,
  onOrderSuccess
}) {
  const [currentStep, setCurrentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form State
  const [shippingData, setShippingData] = useState({
    fullName: "Arjun Singhania",
    email: "arjun.singhania@example.com",
    phone: "9876543210",
    address: "Penthouse 14B, Altamount Luxury Residences",
    city: "Mumbai",
    state: "Maharashtra",
    pincode: "400026",
  });

  const [deliveryOption, setDeliveryOption] = useState("express"); // 'express' | 'vip'
  const [isGiftWrapped, setIsGiftWrapped] = useState(false);
  const [giftMessage, setGiftMessage] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("upi"); // 'upi' | 'card' | 'netbanking' | 'cod'
  const [cardData, setCardData] = useState({
    number: "•••• •••• •••• 4242",
    name: "ARJUN SINGHANIA",
    expiry: "08/29",
    cvv: "•••",
  });
  const [upiApp, setUpiApp] = useState("gpay");

  const [placedOrder, setPlacedOrder] = useState(null);
  const [copiedId, setCopiedId] = useState(false);

  if (!isOpen) return null;

  const vipCourierFee = deliveryOption === "vip" ? 49900 : 0;
  const giftWrapFee = isGiftWrapped ? 29900 : 0;
  const finalPayable = totalAmount + vipCourierFee + giftWrapFee;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (currentStep < 3) {
      setCurrentStep((s) => s + 1);
    }
  };

  const triggerConfetti = () => {
    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#C5A059", "#1C1917", "#E6CA65", "#10B981"]
      });
    } catch {
      // Confetti fallback
    }
  };

  const handleSimulatePayment = () => {
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderId = `AGS-${Math.floor(10000 + Math.random() * 90000)}`;

      const newOrder = {
        orderId: generatedOrderId,
        date: new Date().toLocaleDateString("en-IN", {
          day: "numeric",
          month: "short",
          year: "numeric"
        }),
        status: "Confirmed & Quality Check",
        currentStep: 2,
        carrier: deliveryOption === "vip" ? "VIP White-Glove Jet Courier" : "Blue Dart Express Air",
        awbNumber: `BD${Math.floor(100000000 + Math.random() * 900000000)}IN`,
        estimatedDelivery: deliveryOption === "vip" ? "Tomorrow by 11:00 AM" : "In 2 Business Days",
        destination: `${shippingData.city}, ${shippingData.state} - ${shippingData.pincode}`,
        recipientName: shippingData.fullName,
        recipientEmail: shippingData.email,
        paymentMethod: paymentMethod.toUpperCase(),
        items: cart.map((item) => ({
          name: item.product.name,
          option: item.option,
          qty: item.qty,
          price: item.product.price,
          image: item.product.images?.[0] || item.product.image
        })),
        totalPaid: finalPayable,
        steps: [
          { title: "Order Confirmed & Payment Verified", time: "Just now", done: true },
          { title: "Horology Quality Check & Certification", time: "In progress", done: true },
          { title: "Dispatched via Insured Air Courier", time: "Scheduled Today", done: false },
          { title: "Out for Delivery", time: "Expected Tomorrow", done: false },
          { title: "Delivered & Signed", time: "Pending", done: false }
        ]
      };

      setPlacedOrder(newOrder);
      setCurrentStep(4);
      triggerConfetti();
      onOrderSuccess(newOrder);
    }, 1400);
  };

  const copyOrderId = () => {
    if (placedOrder) {
      navigator.clipboard.writeText(placedOrder.orderId);
      setCopiedId(true);
      setTimeout(() => setCopiedId(false), 2000);
    }
  };

  return (
    <div className="checkout-overlay" onClick={currentStep === 4 ? onClose : undefined}>
      <div
        className="checkout-modal-container"
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="checkout-header">
          <div className="checkout-title-group">
            <span className="checkout-crest">AGS</span>
            <div>
              <h2>Luxury Express Checkout</h2>
              <p className="checkout-subtitle">Secure Horology Concierge &amp; Order Verification</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close checkout">
            <X size={20} />
          </button>
        </div>

        {/* Multi-Step Indicator */}
        <div className="steps-indicator-bar">
          {STEPS.map((s) => {
            const isCompleted = currentStep > s.id;
            const isCurrent = currentStep === s.id;

            return (
              <div
                key={s.id}
                className={`step-item ${isCurrent ? "is-current" : ""} ${isCompleted ? "is-completed" : ""}`}
              >
                <div className="step-circle">
                  {isCompleted ? <Check size={14} /> : s.id}
                </div>
                <span className="step-text">{s.title}</span>
              </div>
            );
          })}
        </div>

        <div className="checkout-content-grid">
          {/* Main Step Form / Content */}
          <div className="checkout-main-pane">
            {/* STEP 1: Shipping Address */}
            {currentStep === 1 && (
              <form onSubmit={handleNextStep} className="checkout-form-step">
                <div className="step-section-heading">
                  <h3>1. Delivery Address &amp; Contact</h3>
                  <p>All timepieces are dispatched in tamper-evident sealed luxury vaults.</p>
                </div>

                <div className="form-fields-grid">
                  <div className="field-group full-width">
                    <label>Full Recipient Name</label>
                    <input
                      type="text"
                      name="fullName"
                      required
                      value={shippingData.fullName}
                      onChange={handleInputChange}
                      placeholder="e.g. Arjun Singhania"
                    />
                  </div>

                  <div className="field-group">
                    <label>Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={shippingData.email}
                      onChange={handleInputChange}
                      placeholder="For order certificate & invoice"
                    />
                  </div>

                  <div className="field-group">
                    <label>Mobile Number (India)</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={shippingData.phone}
                      onChange={handleInputChange}
                      placeholder="For delivery SMS & OTP"
                    />
                  </div>

                  <div className="field-group full-width">
                    <label>Street Address / Apartment / Suite</label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={shippingData.address}
                      onChange={handleInputChange}
                      placeholder="e.g. Penthouse 14B, High Street Residences"
                    />
                  </div>

                  <div className="field-group">
                    <label>City</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={shippingData.city}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="field-group">
                    <label>State</label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={shippingData.state}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="field-group">
                    <label>Postal Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      maxLength={6}
                      required
                      value={shippingData.pincode}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="step-actions-row">
                  <button type="submit" className="btn-step-next">
                    <span>Continue to Delivery &amp; Gift Options</span>
                    <ChevronRight size={17} />
                  </button>
                </div>
              </form>
            )}

            {/* STEP 2: Delivery & Gift */}
            {currentStep === 2 && (
              <div className="checkout-form-step">
                <div className="step-section-heading">
                  <h3>2. Select Delivery &amp; Packaging</h3>
                  <p>Choose your preferred shipping priority and gift personalization.</p>
                </div>

                <div className="delivery-selection-cards">
                  <label
                    className={`delivery-option-card ${deliveryOption === "express" ? "is-selected" : ""}`}
                    onClick={() => setDeliveryOption("express")}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === "express"}
                      onChange={() => setDeliveryOption("express")}
                    />
                    <div className="delivery-card-icon">
                      <Truck size={22} />
                    </div>
                    <div className="delivery-card-info">
                      <div className="delivery-title-line">
                        <strong>Complimentary Insured Air Courier</strong>
                        <span className="price-tag-free">FREE</span>
                      </div>
                      <p>Delivered in 2 business days via Blue Dart Air with end-to-end insurance.</p>
                    </div>
                  </label>

                  <label
                    className={`delivery-option-card ${deliveryOption === "vip" ? "is-selected" : ""}`}
                    onClick={() => setDeliveryOption("vip")}
                  >
                    <input
                      type="radio"
                      name="delivery"
                      checked={deliveryOption === "vip"}
                      onChange={() => setDeliveryOption("vip")}
                    />
                    <div className="delivery-card-icon gold">
                      <Package size={22} />
                    </div>
                    <div className="delivery-card-info">
                      <div className="delivery-title-line">
                        <strong>VIP Priority Same-Day / Next-Day Jet Courier</strong>
                        <span className="price-tag-fee">+₹499</span>
                      </div>
                      <p>Priority hand-delivered in velvet travel pouch with white-glove courier.</p>
                    </div>
                  </label>
                </div>

                {/* Gift Option Box */}
                <div className="gift-packaging-box">
                  <label className="gift-checkbox-row">
                    <input
                      type="checkbox"
                      checked={isGiftWrapped}
                      onChange={(e) => setIsGiftWrapped(e.target.checked)}
                    />
                    <Gift size={20} className="gift-icon" />
                    <div className="gift-text">
                      <strong>Include Bespoke Wooden Gift Box &amp; Seal (+₹299)</strong>
                      <p>Presented with silk ribbon and wax-sealed parchment message card.</p>
                    </div>
                  </label>

                  {isGiftWrapped && (
                    <div className="gift-message-input">
                      <label>Personalized Gift Message</label>
                      <textarea
                        rows={3}
                        placeholder="Write your heartfelt note for the recipient..."
                        value={giftMessage}
                        onChange={(e) => setGiftMessage(e.target.value)}
                      />
                    </div>
                  )}
                </div>

                <div className="step-actions-row dual">
                  <button
                    type="button"
                    className="btn-step-back"
                    onClick={() => setCurrentStep(1)}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn-step-next"
                    onClick={() => setCurrentStep(3)}
                  >
                    <span>Proceed to Payment</span>
                    <ChevronRight size={17} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Payment Method */}
            {currentStep === 3 && (
              <div className="checkout-form-step">
                <div className="step-section-heading">
                  <h3>3. Select Payment Instrument</h3>
                  <p>Encrypted payment gateway simulation with instant verification.</p>
                </div>

                <div className="payment-tabs-header">
                  <button
                    className={`payment-tab-btn ${paymentMethod === "upi" ? "is-active" : ""}`}
                    onClick={() => setPaymentMethod("upi")}
                  >
                    <QrCode size={17} />
                    <span>Instant UPI / QR</span>
                  </button>
                  <button
                    className={`payment-tab-btn ${paymentMethod === "card" ? "is-active" : ""}`}
                    onClick={() => setPaymentMethod("card")}
                  >
                    <CreditCard size={17} />
                    <span>Credit / Debit Card</span>
                  </button>
                  <button
                    className={`payment-tab-btn ${paymentMethod === "netbanking" ? "is-active" : ""}`}
                    onClick={() => setPaymentMethod("netbanking")}
                  >
                    <Building size={17} />
                    <span>Net Banking</span>
                  </button>
                  <button
                    className={`payment-tab-btn ${paymentMethod === "cod" ? "is-active" : ""}`}
                    onClick={() => setPaymentMethod("cod")}
                  >
                    <Banknote size={17} />
                    <span>Cash on Delivery</span>
                  </button>
                </div>

                <div className="payment-tab-content">
                  {/* UPI Method */}
                  {paymentMethod === "upi" && (
                    <div className="upi-payment-pane">
                      <div className="upi-qr-card">
                        <div className="qr-box">
                          {/* Stylized QR Code SVG mockup */}
                          <svg viewBox="0 0 100 100" width="130" height="130" className="qr-svg">
                            <rect width="100" height="100" fill="#ffffff" />
                            <path d="M10,10 h30 v30 h-30 z M16,16 v18 h18 v-18 z M22,22 h6 v6 h-6 z" fill="#1C1917" />
                            <path d="M60,10 h30 v30 h-30 z M66,16 v18 h18 v-18 z M72,22 h6 v6 h-6 z" fill="#1C1917" />
                            <path d="M10,60 h30 v30 h-30 z M16,66 v18 h18 v-18 z M22,72 h6 v6 h-6 z" fill="#1C1917" />
                            <rect x="45" y="15" width="8" height="20" fill="#C5A059" />
                            <rect x="15" y="45" width="20" height="8" fill="#C5A059" />
                            <rect x="50" y="50" width="12" height="12" fill="#1C1917" />
                            <rect x="70" y="50" width="15" height="8" fill="#C5A059" />
                            <rect x="50" y="70" width="10" height="15" fill="#1C1917" />
                            <rect x="70" y="70" width="18" height="18" fill="#1C1917" />
                          </svg>
                          <span className="qr-scan-hint">Scan with any UPI App</span>
                        </div>
                        <div className="upi-apps-row">
                          <button
                            type="button"
                            className={`upi-app-btn ${upiApp === "gpay" ? "on" : ""}`}
                            onClick={() => setUpiApp("gpay")}
                          >
                            Google Pay
                          </button>
                          <button
                            type="button"
                            className={`upi-app-btn ${upiApp === "phonepe" ? "on" : ""}`}
                            onClick={() => setUpiApp("phonepe")}
                          >
                            PhonePe
                          </button>
                          <button
                            type="button"
                            className={`upi-app-btn ${upiApp === "paytm" ? "on" : ""}`}
                            onClick={() => setUpiApp("paytm")}
                          >
                            Paytm UPI
                          </button>
                        </div>
                      </div>
                      <p className="upi-notice">
                        Fastest payment mode. Zero transaction fee. Instant order lock.
                      </p>
                    </div>
                  )}

                  {/* Card Method */}
                  {paymentMethod === "card" && (
                    <div className="card-payment-pane">
                      <div className="card-preview-chip">
                        <div className="chip-gold" />
                        <span className="card-mock-number">{cardData.number}</span>
                        <div className="card-meta-line">
                          <span>{cardData.name}</span>
                          <span>EXP: {cardData.expiry}</span>
                        </div>
                      </div>

                      <div className="form-fields-grid compact">
                        <div className="field-group full-width">
                          <label>Card Number</label>
                          <input
                            type="text"
                            value={cardData.number}
                            onChange={(e) =>
                              setCardData((c) => ({ ...c, number: e.target.value }))
                            }
                            placeholder="4532 •••• •••• 4242"
                          />
                        </div>
                        <div className="field-group">
                          <label>Cardholder Name</label>
                          <input
                            type="text"
                            value={cardData.name}
                            onChange={(e) =>
                              setCardData((c) => ({ ...c, name: e.target.value }))
                            }
                          />
                        </div>
                        <div className="field-group">
                          <label>Expiry (MM/YY)</label>
                          <input
                            type="text"
                            value={cardData.expiry}
                            onChange={(e) =>
                              setCardData((c) => ({ ...c, expiry: e.target.value }))
                            }
                          />
                        </div>
                        <div className="field-group">
                          <label>Security CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardData.cvv}
                            onChange={(e) =>
                              setCardData((c) => ({ ...c, cvv: e.target.value }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Net Banking */}
                  {paymentMethod === "netbanking" && (
                    <div className="netbanking-pane">
                      <p className="select-bank-label">Select your institution:</p>
                      <div className="banks-grid">
                        {["HDFC Bank", "ICICI Bank", "State Bank of India", "Axis Bank", "Kotak Mahindra", "IndusInd Bank"].map((bank) => (
                          <label key={bank} className="bank-card">
                            <input type="radio" name="bank" defaultChecked={bank === "HDFC Bank"} />
                            <span>{bank}</span>
                          </label>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Cash on Delivery */}
                  {paymentMethod === "cod" && (
                    <div className="cod-pane">
                      <div className="cod-alert-box">
                        <ShieldCheck size={20} className="cod-icon" />
                        <div>
                          <strong>Cash on Delivery Available</strong>
                          <p>
                            Pay by cash or card upon delivery. An OTP will be sent to your mobile{" "}
                            <strong>+91 {shippingData.phone}</strong> for security verification.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="step-actions-row dual">
                  <button
                    type="button"
                    className="btn-step-back"
                    onClick={() => setCurrentStep(2)}
                    disabled={isProcessing}
                  >
                    Back
                  </button>
                  <button
                    type="button"
                    className="btn-pay-now"
                    onClick={handleSimulatePayment}
                    disabled={isProcessing}
                  >
                    {isProcessing ? (
                      <span className="spinner-text">Securing Payment...</span>
                    ) : (
                      <>
                        <ShieldCheck size={18} />
                        <span>Pay {money(finalPayable)} &amp; Confirm Order</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Order Confirmed & Interactive Tracking */}
            {currentStep === 4 && placedOrder && (
              <div className="order-success-pane">
                <div className="success-banner-box">
                  <div className="success-icon-badge">
                    <CheckCircle2 size={40} className="check-gold" />
                  </div>
                  <h3>Thank You For Your Patronage</h3>
                  <p className="success-sub">
                    Your luxury order has been confirmed. A certificate of authenticity and receipt
                    have been dispatched to <strong>{placedOrder.recipientEmail}</strong>.
                  </p>

                  <div className="order-id-pill">
                    <span>Order Reference: <strong>{placedOrder.orderId}</strong></span>
                    <button className="copy-btn" onClick={copyOrderId} title="Copy Order ID">
                      {copiedId ? <Check size={14} /> : <Copy size={14} />}
                    </button>
                  </div>
                </div>

                {/* Live Tracking Timeline */}
                <div className="order-live-tracking-box">
                  <div className="tracking-box-header">
                    <div>
                      <h4>Live Shipment Tracking</h4>
                      <p className="courier-meta">
                        Courier: <strong>{placedOrder.carrier}</strong> • AWB: <code>{placedOrder.awbNumber}</code>
                      </p>
                    </div>
                    <span className="eta-badge">
                      <Clock size={14} /> {placedOrder.estimatedDelivery}
                    </span>
                  </div>

                  <div className="timeline-steps-list">
                    {placedOrder.steps.map((step, idx) => (
                      <div
                        key={idx}
                        className={`timeline-step-row ${step.done ? "is-done" : "is-pending"}`}
                      >
                        <div className="step-indicator">
                          <div className="indicator-dot">
                            {step.done ? <Check size={12} /> : null}
                          </div>
                          {idx < placedOrder.steps.length - 1 && <div className="indicator-line" />}
                        </div>
                        <div className="step-meta">
                          <strong className="step-title">{step.title}</strong>
                          <span className="step-time">{step.time}</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="tracking-destination-footer">
                    <span>Delivering to: <strong>{placedOrder.destination}</strong></span>
                  </div>
                </div>

                {/* Post Order Actions */}
                <div className="success-actions-row">
                  <button className="btn-primary" onClick={onClose}>
                    Continue Exploring Collections
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Summary Column */}
          <div className="checkout-summary-pane">
            <h4 className="summary-title">Order Summary ({cart.reduce((n, i) => n + i.qty, 0)} items)</h4>

            <ul className="checkout-items-list">
              {cart.map((item) => (
                <li key={item.key} className="checkout-item-line">
                  <div className="checkout-item-thumb">
                    <Visual product={item.product} />
                  </div>
                  <div className="checkout-item-meta">
                    <strong>{item.product.name}</strong>
                    <span>{item.option}</span>
                    <span className="qty-tag">Qty: {item.qty}</span>
                  </div>
                  <span className="checkout-item-price">
                    {money(item.product.price * item.qty)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="checkout-breakdown-box">
              <div className="breakdown-line">
                <span>Subtotal</span>
                <span>{money(totalAmount + (discountAmount || 0))}</span>
              </div>

              {discountAmount > 0 && (
                <div className="breakdown-line discount">
                  <span>Promo Savings ({appliedPromo?.code})</span>
                  <span>−{money(discountAmount)}</span>
                </div>
              )}

              <div className="breakdown-line">
                <span>Insured Express Courier</span>
                <span className="free-text">
                  {deliveryOption === "vip" ? "+₹499" : "FREE"}
                </span>
              </div>

              {isGiftWrapped && (
                <div className="breakdown-line">
                  <span>Bespoke Wooden Gift Box</span>
                  <span>+₹299</span>
                </div>
              )}

              <div className="breakdown-line total-line">
                <strong>Payable Total</strong>
                <strong className="total-highlight">{money(finalPayable)}</strong>
              </div>
            </div>

            <div className="horology-guarantee-badge">
              <ShieldCheck size={20} className="gold-accent" />
              <div>
                <strong>Official AGS Warranty</strong>
                <p>2-Year international warranty card included with your serial number.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

