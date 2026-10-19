import { useState } from "react";
import { Search, Heart, ShoppingBag, Truck, Sun, Moon, X, Sparkles, SlidersHorizontal } from "lucide-react";
import { money } from "../data.js";

export default function Header({
  query,
  setQuery,
  wishlistCount,
  onOpenWishlist,
  cartCount,
  cartTotal,
  onOpenCart,
  onOpenTracking,
  darkMode,
  setDarkMode,
  onToggleFilters,
  filtersActive
}) {
  const [searchFocused, setSearchFocused] = useState(false);

  return (
    <header className="site-header">
      {/* Top Announcement Bar */}
      <div className="announcement-bar">
        <div className="announcement-content">
          <span><Sparkles size={13} className="inline-icon" /> <strong>Complimentary Insured Air Delivery</strong> across India</span>
          <span className="bullet-sep">•</span>
          <span><strong>2-Year International Warranty</strong> on all timepieces</span>
          <span className="bullet-sep">•</span>
          <span className="highlight-tag">Use code <strong>FIRSTWATCH</strong> for ₹1,500 off</span>
        </div>
      </div>

      {/* Main Header Container */}
      <div className="header-main">
        {/* Brand / Logo */}
        <a href="/" className="brand-logo" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}>
          <div className="logo-emblem">AGS</div>
          <div className="brand-text">
            <span className="brand-name">AGS &amp; HOROLOGY</span>
            <span className="brand-sub">FINE TIMEPIECES • EST. 2026</span>
          </div>
        </a>

        {/* Global Search Bar */}
        <div className={`search-wrapper ${searchFocused ? "is-focused" : ""}`}>
          <Search size={18} className="search-icon" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            placeholder="Search luxury chronographs, ladies, smart, wall clocks..."
            aria-label="Search watches and clocks"
          />
          {query && (
            <button className="clear-search-btn" onClick={() => setQuery("")} aria-label="Clear search">
              <X size={15} />
            </button>
          )}
        </div>

        {/* Action Controls */}
        <div className="header-actions">
          {/* Mobile Filter Toggle */}
          <button
            className={`action-btn filter-toggle-btn ${filtersActive ? "is-active" : ""}`}
            onClick={onToggleFilters}
            aria-label="Toggle Filters"
          >
            <SlidersHorizontal size={19} />
            <span className="action-label">Filters</span>
          </button>

          {/* Theme Toggle */}
          <button
            className="action-btn theme-toggle-btn"
            onClick={() => setDarkMode((prev) => !prev)}
            aria-label="Toggle Dark/Light Mode"
            title={darkMode ? "Switch to Daylight Mode" : "Switch to Midnight Mode"}
          >
            {darkMode ? <Sun size={19} /> : <Moon size={19} />}
          </button>

          {/* Track Order */}
          <button
            className="action-btn track-order-btn"
            onClick={onOpenTracking}
            aria-label="Track your order"
          >
            <Truck size={19} />
            <span className="action-label">Track Order</span>
          </button>

          {/* Wishlist */}
          <button
            className="action-btn wishlist-btn"
            onClick={onOpenWishlist}
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <div className="badge-wrapper">
              <Heart size={19} className={wishlistCount > 0 ? "fill-current text-rose" : ""} />
              {wishlistCount > 0 && <span className="action-badge">{wishlistCount}</span>}
            </div>
            <span className="action-label">Wishlist</span>
          </button>

          {/* Cart Button */}
          <button
            className="action-btn cart-btn"
            onClick={onOpenCart}
            aria-label={`Shopping cart with ${cartCount} items`}
          >
            <div className="badge-wrapper">
              <ShoppingBag size={20} />
              {cartCount > 0 && <span className="action-badge gold-badge">{cartCount}</span>}
            </div>
            <div className="cart-preview">
              <span className="cart-heading">Cart</span>
              <span className="cart-total-amount">{money(cartTotal)}</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
}

