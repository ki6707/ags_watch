import { useState, useMemo } from "react";
import {
  X,
  Package,
  Truck,
  CheckCircle2,
  Clock,
  Phone,
  Mail,
  MapPin,
  Gift,
  Printer,
  Download,
  Search,
  ExternalLink,
  MessageCircle,
  AlertCircle,
  Copy,
  Check,
  ChevronRight,
  TrendingUp,
  Layers,
  Edit3
} from "lucide-react";
import { money } from "../data.js";
import Visual from "./Visual.jsx";

export default function AdminOrdersModal({
  isOpen,
  onClose,
  orders = [],
  onUpdateOrderStatus,
  onDeleteOrder
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'pending' | 'packed' | 'dispatched' | 'delivered'
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState(null);
  const [editingAwb, setEditingAwb] = useState(null);
  const [tempAwb, setTempAwb] = useState("");
  const [tempCarrier, setTempCarrier] = useState("");
  const [copiedId, setCopiedId] = useState("");

  // Filtered Orders
  const filteredOrders = useMemo(() => {
    return orders.filter((o) => {
      const q = searchTerm.trim().toLowerCase();
      const matchQuery =
        !q ||
        o.orderId.toLowerCase().includes(q) ||
        (o.recipientName && o.recipientName.toLowerCase().includes(q)) ||
        (o.recipientPhone && o.recipientPhone.includes(q)) ||
        (o.destination && o.destination.toLowerCase().includes(q));

      const status = (o.status || "").toLowerCase();
      let matchStatus = true;
      if (statusFilter === "pending") {
        matchStatus = status.includes("pending") || status.includes("placed") || status.includes("confirmed");
      } else if (statusFilter === "packed") {
        matchStatus = status.includes("packed") || status.includes("quality");
      } else if (statusFilter === "dispatched") {
        matchStatus = status.includes("transit") || status.includes("dispatched");
      } else if (statusFilter === "delivered") {
        matchStatus = status.includes("delivered");
      }

      return matchQuery && matchStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // Statistics
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPaid || 0), 0);
  const pendingPackingCount = orders.filter((o) => {
    const s = (o.status || "").toLowerCase();
    return s.includes("pending") || s.includes("placed") || s.includes("confirmed");
  }).length;
  const inTransitCount = orders.filter((o) => {
    const s = (o.status || "").toLowerCase();
    return s.includes("transit") || s.includes("dispatched");
  }).length;
  const deliveredCount = orders.filter((o) => (o.status || "").toLowerCase().includes("delivered")).length;

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const handleExportCsv = () => {
    const headers = ["Order ID", "Date", "Customer Name", "Phone", "Email", "Address", "Items", "Total Paid", "Status", "Carrier", "AWB"];
    const rows = orders.map((o) => [
      o.orderId,
      `"${o.date || ""}"`,
      `"${o.recipientName || ""}"`,
      `"${o.recipientPhone || ""}"`,
      `"${o.recipientEmail || ""}"`,
      `"${(o.fullAddress || o.destination || "").replace(/"/g, '""')}"`,
      `"${(o.items || []).map((i) => `${i.name} (${i.option || 'Std'}) x${i.qty}`).join(", ")}"`,
      o.totalPaid ? (o.totalPaid / 100) : 0,
      `"${o.status || ""}"`,
      `"${o.carrier || ""}"`,
      `"${o.awbNumber || ""}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `AGS_Watch_Orders_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const startEditCarrier = (order) => {
    setEditingAwb(order.orderId);
    setTempCarrier(order.carrier || "Blue Dart Express Air");
    setTempAwb(order.awbNumber || `BD${Math.floor(100000000 + Math.random() * 900000000)}IN`);
  };

  const saveCarrier = (orderId) => {
    onUpdateOrderStatus(orderId, "In Transit", {
      carrier: tempCarrier,
      awbNumber: tempAwb,
      currentStep: 3
    });
    setEditingAwb(null);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="admin-overlay" onClick={onClose}>
        <div
          className="admin-modal-container"
          role="dialog"
          aria-modal="true"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="admin-header">
            <div className="admin-title-row">
              <div className="admin-crest">AGS</div>
              <div>
                <h2>Store Owner — Merchant Orders &amp; Packing Portal</h2>
                <p>Live incoming customer watch orders. Review customer address, pack timepiece, print shipping labels, and dispatch.</p>
              </div>
            </div>

            <div className="admin-header-actions">
              <button className="admin-export-btn" onClick={handleExportCsv} title="Download CSV for Courier manifest">
                <Download size={16} />
                <span>Export Manifest (CSV)</span>
              </button>
              <button className="modal-close-btn" onClick={onClose} aria-label="Close owner portal">
                <X size={20} />
              </button>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="admin-metrics-grid">
            <div className="metric-box">
              <div className="metric-icon total">
                <Layers size={18} />
              </div>
              <div className="metric-details">
                <span className="metric-label">Total Customer Orders</span>
                <strong className="metric-val">{orders.length}</strong>
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-icon pending">
                <Package size={18} />
              </div>
              <div className="metric-details">
                <span className="metric-label">Need Packing &amp; Dispatch</span>
                <strong className="metric-val highlight-yellow">{pendingPackingCount}</strong>
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-icon transit">
                <Truck size={18} />
              </div>
              <div className="metric-details">
                <span className="metric-label">In Transit with Courier</span>
                <strong className="metric-val">{inTransitCount}</strong>
              </div>
            </div>

            <div className="metric-box">
              <div className="metric-icon revenue">
                <TrendingUp size={18} />
              </div>
              <div className="metric-details">
                <span className="metric-label">Total Order Value</span>
                <strong className="metric-val gold-text">{money(totalRevenue)}</strong>
              </div>
            </div>
          </div>

          {/* Search & Filters */}
          <div className="admin-filter-bar">
            <div className="admin-search-wrapper">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                placeholder="Search orders by customer name, phone, city, or Order ID..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              {searchTerm && (
                <button className="clear-btn" onClick={() => setSearchTerm("")}>
                  <X size={14} />
                </button>
              )}
            </div>

            <div className="admin-status-tabs">
              <button
                className={`tab-pill ${statusFilter === "all" ? "on" : ""}`}
                onClick={() => setStatusFilter("all")}
              >
                All ({orders.length})
              </button>
              <button
                className={`tab-pill ${statusFilter === "pending" ? "on" : ""}`}
                onClick={() => setStatusFilter("pending")}
              >
                Needs Packing ({pendingPackingCount})
              </button>
              <button
                className={`tab-pill ${statusFilter === "dispatched" ? "on" : ""}`}
                onClick={() => setStatusFilter("dispatched")}
              >
                In Transit ({inTransitCount})
              </button>
              <button
                className={`tab-pill ${statusFilter === "delivered" ? "on" : ""}`}
                onClick={() => setStatusFilter("delivered")}
              >
                Delivered ({deliveredCount})
              </button>
            </div>
          </div>

          {/* Orders List */}
          <div className="admin-orders-scroll">
            {filteredOrders.length === 0 ? (
              <div className="admin-empty-orders">
                <Package size={48} className="empty-icon" />
                <h3>No orders match this filter</h3>
                <p>When customers place orders from the store, they will appear here instantly.</p>
              </div>
            ) : (
              <div className="admin-orders-list">
                {filteredOrders.map((order) => {
                  const isPending =
                    (order.status || "").toLowerCase().includes("pending") ||
                    (order.status || "").toLowerCase().includes("placed") ||
                    (order.status || "").toLowerCase().includes("confirmed");
                  const isPacked = (order.status || "").toLowerCase().includes("packed");
                  const isInTransit = (order.status || "").toLowerCase().includes("transit") || (order.status || "").toLowerCase().includes("dispatched");
                  const isDelivered = (order.status || "").toLowerCase().includes("delivered");

                  const cleanPhone = (order.recipientPhone || "").replace(/\D/g, "");
                  const whatsappMessage = encodeURIComponent(
                    `Hello ${order.recipientName || "Valued Customer"}, thank you for your order (${order.orderId}) at AGS Watch Store. We are currently packing your timepiece for dispatch.`
                  );

                  return (
                    <article key={order.orderId} className={`admin-order-card ${isPending ? "is-pending-card" : ""}`}>
                      {/* Top Bar */}
                      <div className="order-card-header">
                        <div className="order-id-block">
                          <span className="order-ref-pill">
                            <strong>{order.orderId}</strong>
                            <button
                              className="copy-id-btn"
                              onClick={() => handleCopy(order.orderId)}
                              title="Copy Order ID"
                            >
                              {copiedId === order.orderId ? <Check size={13} className="text-success" /> : <Copy size={13} />}
                            </button>
                          </span>
                          <span className="order-date-label">
                            <Clock size={13} /> Placed: {order.date || "Today"}
                          </span>
                        </div>

                        {/* Current Status Badge */}
                        <div className="status-indicator-block">
                          <span
                            className={`order-status-badge ${
                              isPending ? "status-pending" : isPacked ? "status-packed" : isInTransit ? "status-transit" : "status-delivered"
                            }`}
                          >
                            <span className="status-dot"></span>
                            {order.status || "Order Placed"}
                          </span>

                          <span className="payment-pill">
                            {order.paymentMethod || "PAID"}
                          </span>
                        </div>
                      </div>

                      {/* Main Two-Column Layout */}
                      <div className="order-card-body">
                        {/* Left: Customer Address & Contact Info */}
                        <div className="customer-dossier">
                          <h4 className="dossier-heading">
                            <MapPin size={15} /> Customer Delivery Address
                          </h4>

                          <div className="customer-info-box">
                            <strong className="customer-name">{order.recipientName || "Guest Customer"}</strong>

                            <p className="customer-address">
                              {order.fullAddress || order.destination || "Address not provided"}
                            </p>

                            <div className="customer-contact-links">
                              {order.recipientPhone && (
                                <>
                                  <a
                                    href={`tel:${order.recipientPhone}`}
                                    className="contact-pill phone"
                                    title="Call customer directly"
                                  >
                                    <Phone size={13} /> {order.recipientPhone}
                                  </a>

                                  <a
                                    href={`https://wa.me/91${cleanPhone}?text=${whatsappMessage}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-pill whatsapp"
                                    title="Send WhatsApp update to customer"
                                  >
                                    <MessageCircle size={13} /> WhatsApp
                                  </a>
                                </>
                              )}

                              {order.recipientEmail && (
                                <a
                                  href={`mailto:${order.recipientEmail}`}
                                  className="contact-pill email"
                                  title="Send email"
                                >
                                  <Mail size={13} /> Email
                                </a>
                              )}
                            </div>
                          </div>

                          {/* Gift Package Alert if selected */}
                          {order.giftWrapped && (
                            <div className="order-gift-alert">
                              <Gift size={16} className="gift-alert-icon" />
                              <div>
                                <strong>Include Wooden Gift Box &amp; Seal</strong>
                                {order.giftMessage && <p>"{order.giftMessage}"</p>}
                              </div>
                            </div>
                          )}

                          {/* Courier / AWB Tracking Section */}
                          <div className="order-courier-box">
                            {editingAwb === order.orderId ? (
                              <div className="edit-courier-form">
                                <label>Courier Company:</label>
                                <input
                                  type="text"
                                  value={tempCarrier}
                                  onChange={(e) => setTempCarrier(e.target.value)}
                                  placeholder="e.g. Blue Dart, Delhivery, DTDC"
                                />
                                <label>Airway Bill / Tracking AWB #:</label>
                                <input
                                  type="text"
                                  value={tempAwb}
                                  onChange={(e) => setTempAwb(e.target.value)}
                                  placeholder="AWB Tracking Number"
                                />
                                <div className="courier-edit-actions">
                                  <button className="btn-save-sm" onClick={() => saveCarrier(order.orderId)}>
                                    Save &amp; Mark In Transit
                                  </button>
                                  <button className="btn-cancel-sm" onClick={() => setEditingAwb(null)}>
                                    Cancel
                                  </button>
                                </div>
                              </div>
                            ) : (
                              <div className="courier-display-row">
                                <div>
                                  <span className="courier-label">Courier: <strong>{order.carrier || "Blue Dart Air"}</strong></span>
                                  <span className="awb-label">AWB: <code>{order.awbNumber || "Pending Dispatch"}</code></span>
                                </div>
                                <button
                                  className="edit-awb-btn"
                                  onClick={() => startEditCarrier(order)}
                                  title="Edit Courier or AWB Tracking Number"
                                >
                                  <Edit3 size={13} /> Edit Tracking
                                </button>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Right: Items to Pack */}
                        <div className="packing-dossier">
                          <h4 className="dossier-heading">
                            <Package size={15} /> Watches to Pack ({order.items ? order.items.reduce((s, i) => s + (i.qty || 1), 0) : 1} items)
                          </h4>

                          <ul className="packing-items-list">
                            {(order.items || []).map((item, idx) => (
                              <li key={idx} className="packing-item-card">
                                <div className="item-thumb-box">
                                  {item.image ? (
                                    <img src={item.image} alt={item.name} className="thumb-img" />
                                  ) : (
                                    <div className="thumb-placeholder"><Package size={20} /></div>
                                  )}
                                </div>

                                <div className="item-desc-block">
                                  <strong className="item-title">{item.name}</strong>
                                  <div className="item-strap-highlight">
                                    <span>Strap / Finish:</span>
                                    <span className="strap-badge">{item.option || "Standard"}</span>
                                  </div>
                                  <div className="item-qty-price">
                                    <span className="qty-tag">Quantity: <strong>{item.qty}</strong></span>
                                    <span className="price-tag">{money(item.price * item.qty)}</span>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>

                          {/* Total Financial Summary */}
                          <div className="order-financial-bar">
                            <span>Total Collected:</span>
                            <strong className="total-gold-amount">{money(order.totalPaid || 0)}</strong>
                          </div>
                        </div>
                      </div>

                      {/* Card Footer: Packing & Dispatch Workflow Actions */}
                      <div className="order-workflow-actions">
                        <div className="workflow-status-buttons">
                          <span className="workflow-label">Update Status:</span>

                          <button
                            className={`status-flow-btn ${isPending ? "current" : ""}`}
                            onClick={() => onUpdateOrderStatus(order.orderId, "Pending Packing", { currentStep: 1 })}
                          >
                            1. Pending Packing
                          </button>

                          <button
                            className={`status-flow-btn ${isPacked ? "current" : ""}`}
                            onClick={() => onUpdateOrderStatus(order.orderId, "Packed & Sealed (Ready for Courier)", { currentStep: 2 })}
                          >
                            2. Packed &amp; Sealed
                          </button>

                          <button
                            className={`status-flow-btn ${isInTransit ? "current" : ""}`}
                            onClick={() => {
                              onUpdateOrderStatus(order.orderId, "In Transit", {
                                currentStep: 3,
                                carrier: order.carrier || "Blue Dart Express Air",
                                awbNumber: order.awbNumber || `BD${Math.floor(100000000 + Math.random() * 900000000)}IN`
                              });
                            }}
                          >
                            3. Dispatched with Courier
                          </button>

                          <button
                            className={`status-flow-btn ${isDelivered ? "current" : ""}`}
                            onClick={() => onUpdateOrderStatus(order.orderId, "Delivered & Signed", { currentStep: 5 })}
                          >
                            4. Delivered
                          </button>
                        </div>

                        <div className="secondary-order-actions">
                          {/* Print Packing Slip / Shipping Label */}
                          <button
                            className="btn-print-slip"
                            onClick={() => setSelectedOrderForPrint(order)}
                            title="Print Shipping Label to stick onto the watch package box"
                          >
                            <Printer size={15} />
                            <span>Print Shipping Label</span>
                          </button>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Printable Shipping Label & Packing Slip Modal */}
      {selectedOrderForPrint && (
        <div className="print-modal-overlay" onClick={() => setSelectedOrderForPrint(null)}>
          <div className="print-dialog-card" onClick={(e) => e.stopPropagation()}>
            <div className="print-actions-bar no-print">
              <button className="btn-primary" onClick={() => window.print()}>
                <Printer size={16} /> Print Shipping Label
              </button>
              <button className="modal-close-btn" onClick={() => setSelectedOrderForPrint(null)}>
                <X size={18} />
              </button>
            </div>

            {/* Actual Printable Label Sheet */}
            <div className="printable-shipping-sheet" id="printable-area">
              <div className="label-header">
                <div className="carrier-badge">
                  <strong>BLUE DART EXPRESS AIR</strong>
                  <span>PRIORITY PARCEL DELIVERY</span>
                </div>
                <div className="awb-barcode-mock">
                  <code>*{selectedOrderForPrint.awbNumber || selectedOrderForPrint.orderId}*</code>
                  <div className="barcode-bars">||| | |||| | ||||| || | |||| ||| | |||</div>
                </div>
              </div>

              <div className="label-addresses-grid">
                <div className="from-address-box">
                  <span className="addr-tag">SHIP FROM:</span>
                  <strong>AGS &amp; Horology Luxury Hub</strong>
                  <p>Plot 48, Horology Avenue, BKC<br />Mumbai, Maharashtra - 400051<br />Tel: +91 1800 209 8899</p>
                </div>

                <div className="to-address-box">
                  <span className="addr-tag to">SHIP TO (CUSTOMER):</span>
                  <h3 className="recipient-name-print">{selectedOrderForPrint.recipientName}</h3>
                  <p className="full-address-print">
                    {selectedOrderForPrint.fullAddress || selectedOrderForPrint.destination}
                  </p>
                  <strong className="phone-print">Tel: {selectedOrderForPrint.recipientPhone}</strong>
                </div>
              </div>

              <div className="label-contents-table">
                <div className="table-header">
                  <span>ORDER REF: {selectedOrderForPrint.orderId}</span>
                  <span>DATE: {selectedOrderForPrint.date}</span>
                </div>
                <div className="table-body">
                  {(selectedOrderForPrint.items || []).map((it, idx) => (
                    <div key={idx} className="print-item-row">
                      <span><strong>{it.name}</strong> ({it.option || 'Standard'})</span>
                      <span>Qty: {it.qty}</span>
                      <span>{money(it.price * it.qty)}</span>
                    </div>
                  ))}
                  {selectedOrderForPrint.giftWrapped && (
                    <div className="print-gift-note">
                      <strong>🎁 SPECIAL GIFT PACKAGING INCLUDED</strong>
                      {selectedOrderForPrint.giftMessage && <p>"{selectedOrderForPrint.giftMessage}"</p>}
                    </div>
                  )}
                </div>
              </div>

              <div className="label-footer-warning">
                <div className="fragile-stamp">
                  ⚠️ FRAGILE: LUXURY HOROLOGICAL TIMEPIECE — HANDLE WITH UTMOST CARE
                </div>
                <div className="payment-confirmation">
                  <span>PAYMENT: <strong>{selectedOrderForPrint.paymentMethod || "PAID SECURELY"}</strong></span>
                  <span>INSURED TRANSIT COVERAGE INCLUDED</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

