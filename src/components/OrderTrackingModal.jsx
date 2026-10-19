import { useState, useEffect } from "react";
import { X, Search, Truck, Clock, Check, Package, MapPin, AlertCircle } from "lucide-react";
import { money } from "../data.js";

export default function OrderTrackingModal({
  isOpen,
  onClose,
  orders = []
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(orders[0] || null);

  useEffect(() => {
    if (orders.length > 0) {
      setSelectedOrder(orders[0]);
    }
  }, [orders]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    const found = orders.find(
      (o) => o.orderId.toLowerCase() === searchTerm.trim().toLowerCase()
    );
    if (found) {
      setSelectedOrder(found);
    } else {
      // Mock lookup if not in existing state
      setSelectedOrder({
        orderId: searchTerm.trim().toUpperCase() || "AGS-94821",
        date: "Today",
        status: "In Transit",
        carrier: "Blue Dart Air Express",
        awbNumber: "BD849204918IN",
        estimatedDelivery: "Tomorrow by 3:00 PM",
        destination: "Registered Customer Address",
        recipientName: "Verified Patron",
        totalPaid: 1249900,
        items: [{ name: "AGS Luxury Timepiece", option: "Leather Strap", qty: 1, price: 1249900 }],
        steps: [
          { title: "Order Confirmed & Payment Verified", time: "Completed", done: true },
          { title: "Horology Quality Check & Seal", time: "Completed", done: true },
          { title: "Dispatched via Express Courier", time: "Today 08:30 AM", done: true },
          { title: "Out for Delivery", time: "Tomorrow Morning", done: false },
          { title: "Delivered & Signed", time: "Pending", done: false }
        ]
      });
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="tracking-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="tracking-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close tracking">
          <X size={20} />
        </button>

        <div className="tracking-modal-header">
          <Truck size={24} className="gold-accent-icon" />
          <h2 id="tracking-title">Track Horology Consignment</h2>
          <p>Real-time status of your insured timepiece delivery across India.</p>
        </div>

        {/* Search Input for Order Number */}
        <form onSubmit={handleSearch} className="tracking-search-form">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Enter Order Reference (e.g. AGS-94821)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit" className="tracking-submit-btn">
            Track Consignment
          </button>
        </form>

        {/* Quick Tabs of Active Orders */}
        {orders.length > 0 && (
          <div className="orders-quick-chips">
            <span className="chips-label">Your Recent Orders:</span>
            {orders.map((o) => (
              <button
                key={o.orderId}
                className={`order-chip ${selectedOrder?.orderId === o.orderId ? "is-active" : ""}`}
                onClick={() => setSelectedOrder(o)}
              >
                {o.orderId} ({o.status})
              </button>
            ))}
          </div>
        )}

        {/* Selected Order Tracking Card */}
        {selectedOrder ? (
          <div className="tracking-details-card">
            <div className="tracking-card-top">
              <div className="order-id-group">
                <span className="reference-label">Order Reference</span>
                <strong className="reference-code">{selectedOrder.orderId}</strong>
                <span className="reference-date">Placed on {selectedOrder.date}</span>
              </div>

              <div className="status-badge-group">
                <span className="current-status-badge">
                  <span className="live-ping-dot"></span>
                  {selectedOrder.status}
                </span>
                <span className="eta-notice">
                  <Clock size={14} /> Estimated Arrival: <strong>{selectedOrder.estimatedDelivery}</strong>
                </span>
              </div>
            </div>

            {/* Courier & AWB */}
            <div className="courier-banner-row">
              <div>
                <span>Courier Service:</span>
                <strong>{selectedOrder.carrier}</strong>
              </div>
              <div>
                <span>Airway Bill (AWB):</span>
                <code>{selectedOrder.awbNumber}</code>
              </div>
              <div>
                <span>Destination:</span>
                <strong>{selectedOrder.destination}</strong>
              </div>
            </div>

            {/* Step-by-Step Visual Timeline */}
            <div className="tracking-timeline-flow">
              {selectedOrder.steps.map((st, idx) => (
                <div
                  key={idx}
                  className={`timeline-node ${st.done ? "node-done" : "node-pending"}`}
                >
                  <div className="node-marker">
                    {st.done ? <Check size={13} /> : <div className="dot-inner" />}
                  </div>
                  <div className="node-info">
                    <strong className="node-title">{st.title}</strong>
                    <span className="node-time">{st.time}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Items in this Order */}
            {selectedOrder.items && (
              <div className="consignment-items-list">
                <h4>Items in Consignment</h4>
                {selectedOrder.items.map((it, i) => (
                  <div key={i} className="consignment-item-row">
                    <Package size={16} className="pkg-icon" />
                    <span className="item-name">
                      {it.name} {it.option ? `(${it.option})` : ""}
                    </span>
                    <span className="item-qty">Qty: {it.qty}</span>
                    <span className="item-price">{money(it.price * it.qty)}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="no-order-placeholder">
            <AlertCircle size={32} />
            <p>No orders found. Place an order to track live delivery.</p>
          </div>
        )}
      </div>
    </div>
  );
}

