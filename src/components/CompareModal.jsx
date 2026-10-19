import { useEffect } from "react";
import { X, Check, ShoppingBag, Star, Layers } from "lucide-react";
import Visual from "./Visual.jsx";
import { money } from "../data.js";

export default function CompareModal({
  isOpen,
  onClose,
  items = [],
  onRemoveItem,
  onAddToCart
}) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const specRows = [
    { label: "Price", render: (p) => <strong className="comp-price">{money(p.price)}</strong> },
    { label: "Original MRP", render: (p) => <span className="comp-mrp">{money(p.mrp)} ({p.off}% off)</span> },
    { label: "Rating & Reviews", render: (p) => <span className="comp-rating"><Star size={13} className="inline-star" /> {p.rating} / 5.0 ({p.reviews} reviews)</span> },
    { label: "Collection & Maison", render: (p) => `${p.brand} (${p.collection})` },
    { label: "Movement / Engine", render: (p) => p.specs?.movement || "Precision Quartz" },
    { label: "Case Diameter", render: (p) => p.specs?.caseDiameter || p.specs?.diameter || "38 mm" },
    { label: "Water Resistance", render: (p) => p.specs?.waterResistance || "50m / 5 ATM" },
    { label: "Dial Glass", render: (p) => p.specs?.glass || "Scratch-Resistant Sapphire" },
    { label: "Warranty", render: (p) => p.specs?.warranty || "2 Years International" },
    { label: "Availability", render: (p) => p.stock > 0 ? <span className="comp-stock-in"><Check size={14} /> In Stock ({p.stock} available)</span> : <span className="comp-stock-out">Sold Out</span> },
  ];

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="compare-modal-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="compare-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close-btn" onClick={onClose} aria-label="Close comparison">
          <X size={20} />
        </button>

        <div className="compare-modal-header">
          <div className="compare-header-title">
            <Layers size={22} className="gold-accent-icon" />
            <h2 id="compare-modal-title">Horology Comparison Matrix</h2>
          </div>
          <p>Side-by-side comparative analysis of selected timepieces.</p>
        </div>

        {items.length === 0 ? (
          <div className="empty-compare-state">
            <p>Select at least 2 timepieces to compare specifications side-by-side.</p>
          </div>
        ) : (
          <div className="compare-table-container">
            <table className="compare-spec-table">
              <thead>
                <tr>
                  <th className="spec-label-col">Specifications</th>
                  {items.map((prod) => (
                    <th key={prod.id} className="comp-prod-header">
                      <button
                        className="remove-comp-btn"
                        onClick={() => onRemoveItem(prod.id)}
                        aria-label={`Remove ${prod.name} from comparison`}
                        title="Remove"
                      >
                        <X size={14} />
                      </button>
                      <div className="comp-thumb-box">
                        <Visual product={prod} />
                      </div>
                      <span className="comp-brand-text">{prod.brand}</span>
                      <strong className="comp-prod-title">{prod.name}</strong>

                      <button
                        className="comp-add-btn"
                        disabled={prod.stock === 0}
                        onClick={() => {
                          onAddToCart(prod, prod.options?.values[0] || "Standard");
                          onClose();
                        }}
                      >
                        <ShoppingBag size={14} />
                        <span>{prod.stock === 0 ? "Sold Out" : "Add to Cart"}</span>
                      </button>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {specRows.map((row, idx) => (
                  <tr key={idx}>
                    <th scope="row" className="spec-label-col">
                      {row.label}
                    </th>
                    {items.map((prod) => (
                      <td key={prod.id} className="spec-val-col">
                        {row.render(prod)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

