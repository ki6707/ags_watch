import { Heart, Eye, ShoppingBag, Star, Layers } from "lucide-react";
import Visual from "./Visual.jsx";
import { money } from "../data.js";

export default function ProductCard({
  product,
  onSelect,
  isWishlisted,
  onToggleWishlist,
  isComparing,
  onToggleCompare,
  compareEnabled,
  onAddToCart
}) {
  const isOutOfStock = product.stock === 0;
  const isLowStock = product.stock > 0 && product.stock <= 4;

  return (
    <article className={`luxury-product-card ${isOutOfStock ? "is-sold-out" : ""}`}>
      {/* Media / Visual Container */}
      <div className="card-media-wrapper">
        <Visual
          product={product}
          label={`${product.name} luxury timepiece`}
          className="card-visual"
          onClick={() => onSelect(product)}
        />

        {/* Badges */}
        <div className="card-badges">
          {product.badge && (
            <span className={`badge-pill badge-${product.badge.toLowerCase().replace(/\s+/g, "-")}`}>
              {product.badge}
            </span>
          )}
          {product.off > 0 && (
            <span className="badge-pill badge-discount">
              -{product.off}%
            </span>
          )}
        </div>

        {/* Floating Quick Action Buttons */}
        <div className="card-action-overlay">
          <button
            className={`action-circle-btn wishlist-circle-btn ${isWishlisted ? "is-active" : ""}`}
            onClick={(e) => {
              e.stopPropagation();
              onToggleWishlist(product.id);
            }}
            aria-label={isWishlisted ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
            title={isWishlisted ? "Saved in Wishlist" : "Save to Wishlist"}
          >
            <Heart size={16} className={isWishlisted ? "fill-current" : ""} />
          </button>

          <button
            className="action-circle-btn quickview-circle-btn"
            onClick={(e) => {
              e.stopPropagation();
              onSelect(product);
            }}
            aria-label={`Quick preview for ${product.name}`}
            title="Quick View Details"
          >
            <Eye size={16} />
          </button>
        </div>

        {/* Compare Checkbox Pill */}
        {compareEnabled && (
          <label
            className={`compare-pill-overlay ${isComparing ? "is-selected" : ""}`}
            onClick={(e) => e.stopPropagation()}
          >
            <input
              type="checkbox"
              checked={isComparing}
              onChange={() => onToggleCompare(product.id)}
            />
            <Layers size={13} />
            <span>Compare</span>
          </label>
        )}
      </div>

      {/* Card Content & Details */}
      <div className="card-content" onClick={() => onSelect(product)}>
        {/* Rating and Reviews */}
        <div className="card-meta-row">
          <div className="star-rating">
            <Star size={13} className="star-filled" />
            <span className="rating-value">{product.rating.toFixed(1)}</span>
            <span className="reviews-count">({product.reviews})</span>
          </div>
          <span className="collection-chip">{product.collection}</span>
        </div>

        {/* Brand & Name */}
        <div className="card-header-info">
          <span className="card-brand">{product.brand}</span>
          <h3 className="card-title">{product.name}</h3>
        </div>

        {/* Tagline / Spec Snippet */}
        <p className="card-tagline">
          {product.specs?.movement ? `${product.specs.movement} • ${product.specs.caseDiameter || ""}` : product.tagline}
        </p>

        {/* Price & Discount */}
        <div className="card-price-row">
          <div className="price-block">
            <span className="current-price">{money(product.price)}</span>
            {product.mrp > product.price && (
              <span className="mrp-price">{money(product.mrp)}</span>
            )}
          </div>
        </div>

        {/* Stock / Social Proof Status */}
        <div className="stock-status-row">
          {isOutOfStock ? (
            <span className="stock-alert out-of-stock">Currently Unavailable</span>
          ) : isLowStock ? (
            <span className="stock-alert low-stock">Only {product.stock} pieces remaining</span>
          ) : (
            <span className="social-proof">
              ★ {product.bought} discerning buyers this week
            </span>
          )}
        </div>
      </div>

      {/* Direct Add to Cart Button */}
      <div className="card-footer">
        <button
          className={`card-add-btn ${isOutOfStock ? "disabled" : ""}`}
          disabled={isOutOfStock}
          onClick={(e) => {
            e.stopPropagation();
            if (!isOutOfStock) {
              onAddToCart(product, product.options?.values[0] || "Standard");
            }
          }}
          aria-label={`Add ${product.name} to cart`}
        >
          <ShoppingBag size={16} />
          <span>{isOutOfStock ? "Sold Out" : "Add to Cart"}</span>
        </button>
      </div>
    </article>
  );
}

