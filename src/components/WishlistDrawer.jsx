import { useEffect } from "react";
import { X, Heart, ShoppingBag, Trash2 } from "lucide-react";
import Visual from "./Visual.jsx";
import { money } from "../data.js";

export default function WishlistDrawer({
  isOpen,
  onClose,
  items = [],
  onRemove,
  onAddToCart
}) {
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

  return (
    <div className="cart-backdrop" onClick={onClose}>
      <aside
        className="cart-drawer-panel wishlist-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Your luxury wishlist"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="drawer-header">
          <div className="drawer-title-group">
            <Heart size={20} className="gold-accent-icon fill-current text-rose" />
            <h2>Saved Timepieces</h2>
            <span className="items-count-pill">{items.length}</span>
          </div>
          <button className="drawer-close-btn" onClick={onClose} aria-label="Close wishlist">
            <X size={20} />
          </button>
        </div>

        <div className="drawer-items-container">
          {items.length === 0 ? (
            <div className="empty-cart-state">
              <Heart size={44} className="empty-heart-icon" />
              <h3>Your wishlist is empty</h3>
              <p>Tap the heart icon on any timepiece to save it to your curated wishlist.</p>
              <button className="btn-primary" onClick={onClose}>
                Explore Horology
              </button>
            </div>
          ) : (
            <ul className="cart-lines-list">
              {items.map((prod) => (
                <li key={prod.id} className="cart-item-row">
                  <div className="cart-item-visual">
                    <Visual product={prod} label={prod.name} />
                  </div>

                  <div className="cart-item-details">
                    <div className="item-title-row">
                      <strong className="item-name">{prod.name}</strong>
                      <button
                        className="remove-item-btn"
                        onClick={() => onRemove(prod.id)}
                        aria-label={`Remove ${prod.name} from wishlist`}
                        title="Remove"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <span className="item-option-label">{prod.brand} • {prod.collection}</span>

                    <div className="item-price-qty-row">
                      <span className="item-unit-price">{money(prod.price)}</span>

                      <button
                        className="btn-move-cart"
                        disabled={prod.stock === 0}
                        onClick={() => {
                          onAddToCart(prod, prod.options?.values[0] || "Standard");
                          onRemove(prod.id);
                        }}
                      >
                        <ShoppingBag size={14} />
                        <span>{prod.stock === 0 ? "Sold Out" : "Move to Cart"}</span>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </aside>
    </div>
  );
}

