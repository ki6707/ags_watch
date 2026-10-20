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
  Edit3,
  Lock,
  Unlock,
  KeyRound,
  ShieldCheck,
  UserCheck,
  Banknote,
  DollarSign,
  ArrowRight
} from "lucide-react";
import { money } from "../data.js";
import Visual from "./Visual.jsx";

const DEFAULT_ADMIN_PIN = "1234";

const DELIVERY_BOYS = [
  { id: "db1", name: "Suresh Kumar", phone: "98765 12345", vehicle: "Express Bike (MH-02-AB-4021)" },
  { id: "db2", name: "Rajesh Patel", phone: "98201 67890", vehicle: "Delivery Van (MH-02-CD-8819)" },
  { id: "db3", name: "Amit Verma", phone: "98199 44332", vehicle: "City Bike (MH-03-EF-1920)" },
  { id: "db4", name: "Blue Dart Air Express", phone: "1800 209 8899", vehicle: "Insured Air Cargo" }
];

export default function AdminOrdersModal({
  isOpen,
  onClose,
  orders = [],
  onUpdateOrderStatus,
  onDeleteOrder
}) {
  // Authentication State (Admin Only Security Gate)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    try {
      return localStorage.getItem("ags_admin_logged_in") === "true";
    } catch {
      return false;
    }
  });
  const [pinInput, setPinInput] = useState("");
  const [pinError, setPinError] = useState("");

  // Portal Modes: 'admin' (Check & Pack items) vs 'delivery' (Delivery Boy delivery completion)
  const [portalMode, setPortalMode] = useState("admin"); // 'admin' | 'delivery'

  // Search & Filter States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all"); // 'all' | 'pending' | 'packed' | 'in_delivery' | 'delivered'
  const [selectedOrderForPrint, setSelectedOrderForPrint] = useState(null);

  // Delivery Completion Dialog State
  const [deliveryFinishOrder, setDeliveryFinishOrder] = useState(null);
  const [deliveryReceivedBy, setDeliveryReceivedBy] = useState("");
  const [deliveryCashCollected, setDeliveryCashCollected] = useState(true);
  const [selectedDeliveryBoy, setSelectedDeliveryBoy] = useState(DELIVERY_BOYS[0].name);

  // Quick Tracking Edit State
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
        (o.destination && o.destination.toLowerCase().includes(q)) ||
        (o.assignedDeliveryBoy && o.assignedDeliveryBoy.toLowerCase().includes(q));

      const status = (o.status || "").toLowerCase();
      let matchStatus = true;
      if (statusFilter === "pending") {
        matchStatus = status.includes("pending") || status.includes("placed") || status.includes("confirmed");
      } else if (statusFilter === "packed") {
        matchStatus = status.includes("packed") || status.includes("quality");
      } else if (statusFilter === "in_delivery") {
        matchStatus = status.includes("transit") || status.includes("delivery") || status.includes("dispatched");
      } else if (statusFilter === "delivered") {
        matchStatus = status.includes("delivered") || status.includes("finish") || status.includes("signed");
      }

      return matchQuery && matchStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // Statistics & Metrics for the Store Owner
  const totalRevenue = orders.reduce((sum, o) => sum + (o.totalPaid || 0), 0);

  const pendingPackingCount = orders.filter((o) => {
    const s = (o.status || "").toLowerCase();
    return s.includes("pending") || s.includes("placed") || s.includes("confirmed");
  }).length;

  const packedReadyCount = orders.filter((o) => {
    const s = (o.status || "").toLowerCase();
    return s.includes("packed") || s.includes("quality");
  }).length;

  const inDeliveryCount = orders.filter((o) => {
    const s = (o.status || "").toLowerCase();
    return (s.includes("transit") || s.includes("delivery") || s.includes("dispatched")) && !s.includes("delivered");
  }).length;

  const deliveredFinishedCount = orders.filter((o) => {
    const s = (o.status || "").toLowerCase();
    return s.includes("delivered") || s.includes("finish") || s.includes("signed");
  }).length;

  // COD Cash collected / pending collection
  const codPendingSettlement = orders
    .filter((o) => (o.paymentMethod || "").includes("COD") && (o.status || "").toLowerCase().includes("delivered"))
    .reduce((sum, o) => sum + (o.totalPaid || 0), 0);

  const handlePinSubmit = (e) => {
    e.preventDefault();
    if (pinInput.trim() === DEFAULT_ADMIN_PIN) {
      setIsAuthenticated(true);
      setPinError("");
      try {
        localStorage.setItem("ags_admin_logged_in", "true");
      } catch {}
    } else {
      setPinError("Invalid Admin PIN. Default PIN is 1234.");
    }
  };

  const handleLogoutAdmin = () => {
    setIsAuthenticated(false);
    setPinInput("");
    try {
      localStorage.removeItem("ags_admin_logged_in");
    } catch {}
  };

  const handleCopy = (id) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(""), 2000);
  };

  const handleExportCsv = () => {
    const headers = ["Order ID", "Date", "Customer Name", "Phone", "Email", "Address", "Items", "Total Paid", "Status", "Delivery Person", "AWB", "Delivery Finished At"];
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
      `"${o.assignedDeliveryBoy || o.carrier || "Not Assigned"}"`,
      `"${o.awbNumber || ""}"`,
      `"${o.proofOfDelivery?.deliveredAt || "Pending"}"`,
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

  // Assign delivery boy and mark out for delivery
  const handleAssignDelivery = (orderId, boyName) => {
    onUpdateOrderStatus(orderId, `Out for Delivery (With ${boyName})`, {
      assignedDeliveryBoy: boyName,
      currentStep: 4,
      carrier: boyName,
      awbNumber: `DEL-${boyName.slice(0, 3).toUpperCase()}-${Math.floor(10000 + Math.random() * 90000)}`
    });
  };

  // Open delivery finish dialog
  const openDeliveryFinishDialog = (order) => {
    setDeliveryFinishOrder(order);
    setDeliveryReceivedBy(order.recipientName || "");
    setDeliveryCashCollected(true);
  };

  // Complete delivery finish
  const confirmDeliveryFinish = () => {
    if (!deliveryFinishOrder) return;

    const timeString = new Date().toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short"
    }) + ", " + new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" });

    const proof = {
      deliveredBy: deliveryFinishOrder.assignedDeliveryBoy || selectedDeliveryBoy || "Delivery Partner",
      deliveredAt: timeString,
      receivedBy: deliveryReceivedBy || deliveryFinishOrder.recipientName || "Customer",
      cashCollectedAmount: deliveryFinishOrder.paymentMethod?.includes("COD") ? deliveryFinishOrder.totalPaid : 0
    };

    onUpdateOrderStatus(deliveryFinishOrder.orderId, "Delivered & Signed (Finish)", {
      currentStep: 5,
      proofOfDelivery: proof
    });

    setDeliveryFinishOrder(null);
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
          {/* Security PIN Gate — Admin Only */}
          {!isAuthenticated ? (
            <div className="admin-lock-screen">
              <div className="lock-card">
                <div className="lock-icon-circle">
                  <Lock size={32} className="lock-icon" />
                </div>
                <h2>Store Owner &amp; Admin Security Verification</h2>
                <p>
                  This portal is restricted to the store owner only to inspect customer order items,
                  check delivery addresses, and track delivery boy fulfillments.
                </p>

                <form onSubmit={handlePinSubmit} className="pin-form">
                  <label htmlFor="admin-pin-input">Enter 4-Digit Owner Security PIN</label>
                  <div className="pin-input-group">
                    <KeyRound size={18} className="key-icon" />
                    <input
                      id="admin-pin-input"
                      type="password"
                      maxLength={6}
                      placeholder="••••"
                      autoFocus
                      value={pinInput}
                      onChange={(e) => setPinInput(e.target.value)}
                    />
                  </div>
                  {pinError && <p className="pin-error-text">{pinError}</p>}

                  <button type="submit" className="btn-unlock-portal">
                    <Unlock size={17} /> Unlock Orders &amp; Packing Portal
                  </button>
                </form>

                <div className="quick-pin-hint">
                  <span>Default Owner PIN: <strong>1234</strong></span>
                  <button
                    type="button"
                    className="auto-fill-btn"
                    onClick={() => {
                      setPinInput("1234");
                      setPinError("");
                    }}
                  >
                    Click to Auto-fill "1234"
                  </button>
                </div>
              </div>
            </div>
          ) : (
            /* Authenticated Admin Dashboard */
            <>
              {/* Header */}
              <div className="admin-header">
                <div className="admin-title-row">
                  <div className="admin-crest">AGS</div>
                  <div>
                    <div className="owner-status-line">
                      <h2>Store Owner &amp; Delivery Management Hub</h2>
                      <span className="auth-verified-badge">
                        <ShieldCheck size={13} /> Verified Admin Only
                      </span>
                    </div>
                    <p>Inspect incoming orders, check watch models &amp; straps, assign delivery boys, and verify delivery completion.</p>
                  </div>
                </div>

                <div className="admin-header-actions">
                  {/* View Mode Switcher: Admin View vs Delivery Boy View */}
                  <div className="portal-view-toggle">
                    <button
                      className={`view-toggle-btn ${portalMode === "admin" ? "active" : ""}`}
                      onClick={() => setPortalMode("admin")}
                      title="Inspect items, pack watches, and check customer addresses"
                    >
                      <Package size={14} /> Admin Packing View
                    </button>
                    <button
                      className={`view-toggle-btn ${portalMode === "delivery" ? "active" : ""}`}
                      onClick={() => setPortalMode("delivery")}
                      title="Delivery Boy view to mark deliveries as finished"
                    >
                      <Truck size={14} /> Delivery Boy View
                    </button>
                  </div>

                  <button className="admin-export-btn" onClick={handleExportCsv} title="Download CSV for Courier manifest">
                    <Download size={15} />
                    <span>Export CSV</span>
                  </button>

                  <button className="admin-logout-btn" onClick={handleLogoutAdmin} title="Lock portal for security">
                    <Lock size={15} />
                    <span>Lock</span>
                  </button>

                  <button className="modal-close-btn" onClick={onClose} aria-label="Close portal">
                    <X size={20} />
                  </button>
                </div>
              </div>

              {/* Real-Time Live Counters & Metrics Panel */}
              <div className="admin-metrics-grid">
                {/* Metric 1: Total Orders */}
                <div
                  className={`metric-box ${statusFilter === "all" ? "is-selected-metric" : ""}`}
                  onClick={() => setStatusFilter("all")}
                >
                  <div className="metric-icon total">
                    <Layers size={18} />
                  </div>
                  <div className="metric-details">
                    <span className="metric-label">Total Orders</span>
                    <strong className="metric-val">{orders.length}</strong>
                    <span className="metric-sub">All timepieces</span>
                  </div>
                </div>

                {/* Metric 2: Pending (Need to check & pack) */}
                <div
                  className={`metric-box ${statusFilter === "pending" ? "is-selected-metric" : ""}`}
                  onClick={() => setStatusFilter("pending")}
                >
                  <div className="metric-icon pending">
                    <Clock size={18} />
                  </div>
                  <div className="metric-details">
                    <span className="metric-label">Pending Checking</span>
                    <strong className="metric-val highlight-yellow">{pendingPackingCount}</strong>
                    <span className="metric-sub">Waiting for Admin to pack</span>
                  </div>
                </div>

                {/* Metric 3: Packed & Ready */}
                <div
                  className={`metric-box ${statusFilter === "packed" ? "is-selected-metric" : ""}`}
                  onClick={() => setStatusFilter("packed")}
                >
                  <div className="metric-icon packed">
                    <Package size={18} />
                  </div>
                  <div className="metric-details">
                    <span className="metric-label">Packed &amp; Sealed</span>
                    <strong className="metric-val highlight-purple">{packedReadyCount}</strong>
                    <span className="metric-sub">Ready for Delivery Boy</span>
                  </div>
                </div>

                {/* Metric 4: In Delivery / Out with Boy */}
                <div
                  className={`metric-box ${statusFilter === "in_delivery" ? "is-selected-metric" : ""}`}
                  onClick={() => setStatusFilter("in_delivery")}
                >
                  <div className="metric-icon transit">
                    <Truck size={18} />
                  </div>
                  <div className="metric-details">
                    <span className="metric-label">In Delivery</span>
                    <strong className="metric-val highlight-blue">{inDeliveryCount}</strong>
                    <span className="metric-sub">With Delivery Boy</span>
                  </div>
                </div>

                {/* Metric 5: Delivered Finish */}
                <div
                  className={`metric-box ${statusFilter === "delivered" ? "is-selected-metric" : ""}`}
                  onClick={() => setStatusFilter("delivered")}
                >
                  <div className="metric-icon delivered">
                    <CheckCircle2 size={18} />
                  </div>
                  <div className="metric-details">
                    <span className="metric-label">Delivery Finished</span>
                    <strong className="metric-val highlight-green">{deliveredFinishedCount}</strong>
                    <span className="metric-sub">Customer Signed</span>
                  </div>
                </div>

                {/* Metric 6: Total Revenue */}
                <div className="metric-box revenue-box">
                  <div className="metric-icon revenue">
                    <TrendingUp size={18} />
                  </div>
                  <div className="metric-details">
                    <span className="metric-label">Total Revenue</span>
                    <strong className="metric-val gold-text">{money(totalRevenue)}</strong>
                    {codPendingSettlement > 0 && (
                      <span className="cod-alert-badge">
                        COD to Collect: {money(codPendingSettlement)}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Mode Notice Banner */}
              {portalMode === "delivery" && (
                <div className="delivery-mode-notice-bar">
                  <Truck size={18} />
                  <div>
                    <strong>Delivery Boy Portal Active</strong> — Delivery personnel can check customer address, call customer, and tap <em>"Mark Delivery Finished"</em> upon delivering the watch!
                  </div>
                  <button className="switch-back-btn" onClick={() => setPortalMode("admin")}>
                    Back to Admin View
                  </button>
                </div>
              )}

              {/* Filter & Search Toolbar */}
              <div className="admin-filter-bar">
                <div className="admin-search-wrapper">
                  <Search size={16} className="search-icon" />
                  <input
                    type="text"
                    placeholder="Search by customer name, phone, city, delivery boy, or Order ID..."
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
                    ⏳ Needs Checking ({pendingPackingCount})
                  </button>
                  <button
                    className={`tab-pill ${statusFilter === "packed" ? "on" : ""}`}
                    onClick={() => setStatusFilter("packed")}
                  >
                    🎁 Packed ({packedReadyCount})
                  </button>
                  <button
                    className={`tab-pill ${statusFilter === "in_delivery" ? "on" : ""}`}
                    onClick={() => setStatusFilter("in_delivery")}
                  >
                    🚴 In Delivery ({inDeliveryCount})
                  </button>
                  <button
                    className={`tab-pill ${statusFilter === "delivered" ? "on" : ""}`}
                    onClick={() => setStatusFilter("delivered")}
                  >
                    ✅ Delivered Finish ({deliveredFinishedCount})
                  </button>
                </div>
              </div>

              {/* Orders List */}
              <div className="admin-orders-scroll">
                {filteredOrders.length === 0 ? (
                  <div className="admin-empty-orders">
                    <Package size={48} className="empty-icon" />
                    <h3>No orders found in this category</h3>
                    <p>When customers place orders from the store, they will appear here for the Admin to inspect and pack.</p>
                  </div>
                ) : (
                  <div className="admin-orders-list">
                    {filteredOrders.map((order) => {
                      const isPending =
                        (order.status || "").toLowerCase().includes("pending") ||
                        (order.status || "").toLowerCase().includes("placed") ||
                        (order.status || "").toLowerCase().includes("confirmed");
                      const isPacked = (order.status || "").toLowerCase().includes("packed") && !order.status.toLowerCase().includes("finish");
                      const isInDelivery = (order.status || "").toLowerCase().includes("transit") || (order.status || "").toLowerCase().includes("delivery") || (order.status || "").toLowerCase().includes("dispatched");
                      const isFinished = (order.status || "").toLowerCase().includes("delivered") || (order.status || "").toLowerCase().includes("finish") || (order.status || "").toLowerCase().includes("signed");

                      const cleanPhone = (order.recipientPhone || "").replace(/\D/g, "");
                      const whatsappMessage = encodeURIComponent(
                        `Hello ${order.recipientName || "Valued Customer"}, this is from AGS Watch Store regarding your watch order #${order.orderId}. We are preparing your shipment.`
                      );

                      return (
                        <article
                          key={order.orderId}
                          className={`admin-order-card ${
                            isPending ? "is-pending-card" : isFinished ? "is-finished-card" : isInDelivery ? "is-delivery-card" : ""
                          }`}
                        >
                          {/* Card Header */}
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
                                <Clock size={13} /> {order.date || "Today"}
                              </span>
                            </div>

                            <div className="status-indicator-block">
                              {/* Assigned Delivery Person Pill */}
                              {order.assignedDeliveryBoy && (
                                <span className="assigned-boy-pill">
                                  <Truck size={13} /> Delivery Person: <strong>{order.assignedDeliveryBoy}</strong>
                                </span>
                              )}

                              {/* Status Badge */}
                              <span
                                className={`order-status-badge ${
                                  isFinished
                                    ? "status-delivered"
                                    : isInDelivery
                                    ? "status-transit"
                                    : isPacked
                                    ? "status-packed"
                                    : "status-pending"
                                }`}
                              >
                                <span className="status-dot"></span>
                                {order.status || "Order Placed"}
                              </span>

                              <span className={`payment-pill ${order.paymentMethod?.includes("COD") ? "cod" : "paid"}`}>
                                {order.paymentMethod || "PAID ONLINE"}
                              </span>
                            </div>
                          </div>

                          {/* Card Body */}
                          <div className="order-card-body">
                            {/* Left Column: Customer Address & Delivery Details */}
                            <div className="customer-dossier">
                              <h4 className="dossier-heading">
                                <MapPin size={15} /> Customer Delivery Address &amp; Contact
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
                                        <Phone size={13} /> Call {order.recipientPhone}
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

                              {/* Special Gift Request */}
                              {order.giftWrapped && (
                                <div className="order-gift-alert">
                                  <Gift size={16} className="gift-alert-icon" />
                                  <div>
                                    <strong>🎁 Special Wooden Gift Packaging Requested</strong>
                                    {order.giftMessage && <p>Gift Note: "{order.giftMessage}"</p>}
                                  </div>
                                </div>
                              )}

                              {/* Proof of Delivery Card (Once Delivery Boy Finishes Delivery) */}
                              {order.proofOfDelivery ? (
                                <div className="proof-of-delivery-card">
                                  <div className="pod-header">
                                    <CheckCircle2 size={16} className="text-success" />
                                    <strong>Delivery Finished &amp; Signed</strong>
                                  </div>
                                  <div className="pod-grid">
                                    <div>
                                      <span>Delivered By:</span>
                                      <strong>{order.proofOfDelivery.deliveredBy}</strong>
                                    </div>
                                    <div>
                                      <span>Delivered At:</span>
                                      <strong>{order.proofOfDelivery.deliveredAt}</strong>
                                    </div>
                                    <div>
                                      <span>Received By:</span>
                                      <strong>{order.proofOfDelivery.receivedBy}</strong>
                                    </div>
                                    {order.proofOfDelivery.cashCollectedAmount > 0 && (
                                      <div>
                                        <span>Cash Collected:</span>
                                        <strong className="text-success">{money(order.proofOfDelivery.cashCollectedAmount)}</strong>
                                      </div>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                /* Delivery Assignment Box */
                                <div className="delivery-assignment-box">
                                  <label className="assign-label">
                                    <Truck size={14} /> Assign Delivery Boy / Courier:
                                  </label>
                                  <div className="assign-controls-row">
                                    <select
                                      value={order.assignedDeliveryBoy || DELIVERY_BOYS[0].name}
                                      onChange={(e) => handleAssignDelivery(order.orderId, e.target.value)}
                                      className="delivery-boy-select"
                                    >
                                      {DELIVERY_BOYS.map((db) => (
                                        <option key={db.id} value={db.name}>
                                          {db.name} ({db.vehicle})
                                        </option>
                                      ))}
                                    </select>
                                    <button
                                      className="btn-assign-action"
                                      onClick={() => handleAssignDelivery(order.orderId, order.assignedDeliveryBoy || DELIVERY_BOYS[0].name)}
                                    >
                                      Dispatch with Boy
                                    </button>
                                  </div>
                                </div>
                              )}
                            </div>

                            {/* Right Column: Watches to Pack (Admin Verification) */}
                            <div className="packing-dossier">
                              <h4 className="dossier-heading">
                                <Package size={15} /> Watches to Pack (Admin Verification)
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
                                        <span>Customer Strap Choice:</span>
                                        <span className="strap-badge">{item.option || "Standard"}</span>
                                      </div>
                                      <div className="item-qty-price">
                                        <span className="qty-tag">Quantity to Pack: <strong>{item.qty} piece(s)</strong></span>
                                        <span className="price-tag">{money(item.price * item.qty)}</span>
                                      </div>
                                    </div>
                                  </li>
                                ))}
                              </ul>

                              <div className="order-financial-bar">
                                <div>
                                  <span>Order Total:</span>
                                  <strong className="total-gold-amount">{money(order.totalPaid || 0)}</strong>
                                </div>
                                <span className="payment-type-badge">
                                  {order.paymentMethod?.includes("COD") ? "⚠️ Cash on Delivery (Collect Cash)" : "✅ Paid Online"}
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Footer Action Bar */}
                          <div className="order-workflow-actions">
                            <div className="workflow-status-buttons">
                              <span className="workflow-label">Step Status:</span>

                              <button
                                className={`status-flow-btn ${isPending ? "current" : ""}`}
                                onClick={() => onUpdateOrderStatus(order.orderId, "Pending Packing", { currentStep: 1 })}
                              >
                                1. Pending
                              </button>

                              <button
                                className={`status-flow-btn ${isPacked ? "current" : ""}`}
                                onClick={() => onUpdateOrderStatus(order.orderId, "Packed & Sealed (Ready)", { currentStep: 2 })}
                              >
                                2. Packed &amp; Sealed
                              </button>

                              <button
                                className={`status-flow-btn ${isInDelivery && !isFinished ? "current" : ""}`}
                                onClick={() => handleAssignDelivery(order.orderId, order.assignedDeliveryBoy || DELIVERY_BOYS[0].name)}
                              >
                                3. Out for Delivery
                              </button>

                              {/* Big Delivery Boy Completion Action */}
                              <button
                                className={`btn-finish-delivery ${isFinished ? "is-finished" : ""}`}
                                onClick={() => openDeliveryFinishDialog(order)}
                              >
                                <CheckCircle2 size={16} />
                                <span>{isFinished ? "Delivery Finished (Complete)" : "Delivery Boy: Mark Delivery Finished"}</span>
                              </button>
                            </div>

                            <div className="secondary-order-actions">
                              <button
                                className="btn-print-slip"
                                onClick={() => setSelectedOrderForPrint(order)}
                                title="Print shipping label to stick on watch box"
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
            </>
          )}
        </div>
      </div>

      {/* Delivery Boy Finish Confirmation Modal */}
      {deliveryFinishOrder && (
        <div className="delivery-finish-overlay" onClick={() => setDeliveryFinishOrder(null)}>
          <div className="delivery-finish-card" onClick={(e) => e.stopPropagation()}>
            <div className="finish-modal-header">
              <CheckCircle2 size={32} className="text-success" />
              <h3>Confirm Watch Delivery Completed</h3>
              <p>Record delivery completion by the delivery boy for Order <strong>#{deliveryFinishOrder.orderId}</strong>.</p>
            </div>

            <div className="finish-form-fields">
              <div className="field-row">
                <label>Delivery Boy Who Delivered:</label>
                <select
                  value={selectedDeliveryBoy}
                  onChange={(e) => setSelectedDeliveryBoy(e.target.value)}
                  className="finish-select"
                >
                  {DELIVERY_BOYS.map((db) => (
                    <option key={db.id} value={db.name}>
                      {db.name} ({db.vehicle})
                    </option>
                  ))}
                </select>
              </div>

              <div className="field-row">
                <label>Customer Name Who Received &amp; Signed:</label>
                <input
                  type="text"
                  value={deliveryReceivedBy}
                  onChange={(e) => setDeliveryReceivedBy(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                />
              </div>

              {deliveryFinishOrder.paymentMethod?.includes("COD") && (
                <div className="cod-confirmation-alert">
                  <Banknote size={20} className="cash-icon" />
                  <div>
                    <strong>Collect Cash on Delivery: {money(deliveryFinishOrder.totalPaid)}</strong>
                    <label className="cod-check-row">
                      <input
                        type="checkbox"
                        checked={deliveryCashCollected}
                        onChange={(e) => setDeliveryCashCollected(e.target.checked)}
                      />
                      <span>Confirmed: Delivery Boy collected {money(deliveryFinishOrder.totalPaid)} in cash from customer</span>
                    </label>
                  </div>
                </div>
              )}
            </div>

            <div className="finish-actions-row">
              <button className="btn-cancel" onClick={() => setDeliveryFinishOrder(null)}>
                Cancel
              </button>
              <button className="btn-confirm-finish" onClick={confirmDeliveryFinish}>
                <Check size={16} /> Confirm Delivery Finished &amp; Update Admin
              </button>
            </div>
          </div>
        </div>
      )}

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
                  <strong>AGS &amp; HOROLOGY EXPRESS DELIVERY</strong>
                  <span>DELIVERY BOY / COURIER CONSIGNMENT</span>
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
                  <span>DELIVERY BOY: <strong>{selectedOrderForPrint.assignedDeliveryBoy || "Assigned"}</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
