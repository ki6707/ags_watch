import { useState, useMemo, useEffect } from "react";
import Header from "./components/Header.jsx";
import HeroBanner from "./components/HeroBanner.jsx";
import CategoryNav from "./components/CategoryNav.jsx";
import FilterSidebar from "./components/FilterSidebar.jsx";
import ProductCard from "./components/ProductCard.jsx";
import ProductDetailModal from "./components/ProductDetailModal.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import CheckoutModal from "./components/CheckoutModal.jsx";
import OrderTrackingModal from "./components/OrderTrackingModal.jsx";
import CompareModal from "./components/CompareModal.jsx";
import WishlistDrawer from "./components/WishlistDrawer.jsx";
import Footer from "./components/Footer.jsx";
import { PRODUCTS, TYPES, PRICE_BANDS, INITIAL_ORDERS } from "./data.js";
import { Layers, ArrowUp, Sparkles, Filter } from "lucide-react";

function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);
  return now;
}

export default function App() {
  const now = useClock();

  // Navigation & Filter States
  const [activeType, setActiveType] = useState("All");
  const [saleOnly, setSaleOnly] = useState(false);
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("best");
  const [brands, setBrands] = useState(new Set());
  const [bands, setBands] = useState(new Set());
  const [cols, setCols] = useState(new Set());
  const [inStock, setInStock] = useState(false);
  const [filtersOpen, setFiltersOpen] = useState(false);

  // Appearance & Modals
  const [darkMode, setDarkMode] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [wishlistOpen, setWishlistOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [trackingOpen, setTrackingOpen] = useState(false);
  const [compareOpen, setCompareOpen] = useState(false);
  const [compareEnabled, setCompareEnabled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cart, Wishlist, Orders
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem("ags_cart");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [wishlist, setWishlist] = useState(() => {
    try {
      const saved = localStorage.getItem("ags_wishlist");
      return saved ? new Set(JSON.parse(saved)) : new Set();
    } catch {
      return new Set();
    }
  });

  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("ags_orders");
      return saved ? JSON.parse(saved) : INITIAL_ORDERS;
    } catch {
      return INITIAL_ORDERS;
    }
  });

  const [appliedPromo, setAppliedPromo] = useState(null);
  const [compareIds, setCompareIds] = useState([]);
  const [toastMessage, setToastMessage] = useState("");
  const [checkoutTotals, setCheckoutTotals] = useState({ total: 0, discount: 0 });

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("ags_cart", JSON.stringify(cart));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem("ags_wishlist", JSON.stringify([...wishlist]));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [wishlist]);

  useEffect(() => {
    try {
      localStorage.setItem("ags_orders", JSON.stringify(orders));
    } catch (e) {
      console.warn("Storage error", e);
    }
  }, [orders]);

  // Dark Mode class toggle on body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
  }, [darkMode]);

  // Toast Helper
  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 2800);
  };

  // Set toggle helper
  const toggleSetItem = (set, setter, val) => {
    setter((prev) => {
      const next = new Set(prev);
      if (next.has(val)) next.delete(val);
      else next.add(val);
      return next;
    });
  };

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    const q = query.trim().toLowerCase();
    const list = PRODUCTS.filter((p) => {
      const matchCategory = activeType === "All" || p.type === activeType;
      const matchSale = !saleOnly || p.off >= 15;
      const matchStock = !inStock || p.stock > 0;
      const matchBrand = !brands.size || brands.has(p.brand);
      const matchCol = !cols.size || cols.has(p.collection);
      const matchBand =
        !bands.size ||
        PRICE_BANDS.some((b) => bands.has(b.id) && p.price >= b.min && p.price < b.max);
      const matchQuery =
        !q ||
        `${p.name} ${p.brand} ${p.collection} ${p.note} ${p.tagline} ${p.specs?.movement || ""}`
          .toLowerCase()
          .includes(q);

      return matchCategory && matchSale && matchStock && matchBrand && matchCol && matchBand && matchQuery;
    });

    const sortFn = {
      best: (a, b) => b.bought - a.bought,
      low: (a, b) => a.price - b.price,
      high: (a, b) => b.price - a.price,
      off: (a, b) => b.off - a.off,
      rate: (a, b) => b.rating - a.rating,
    };

    return [...list].sort(sortFn[sort] || sortFn.best);
  }, [activeType, saleOnly, query, sort, brands, bands, cols, inStock]);

  // Filter count counters
  const filterCounts = useMemo(() => {
    return {
      inStock: PRODUCTS.filter((p) => p.stock > 0).length,
      brand: (b) => PRODUCTS.filter((p) => p.brand === b).length,
      band: (id) => {
        const band = PRICE_BANDS.find((x) => x.id === id);
        return band ? PRODUCTS.filter((p) => p.price >= band.min && p.price < band.max).length : 0;
      },
      col: (c) => PRODUCTS.filter((p) => p.collection === c).length,
    };
  }, []);

  const clearAllFilters = () => {
    setBrands(new Set());
    setBands(new Set());
    setCols(new Set());
    setInStock(false);
    setQuery("");
    setSaleOnly(false);
    showToast("Filters reset to default view");
  };

  // Cart operations
  const handleAddToCart = (product, option = "Standard", qty = 1) => {
    const key = `${product.id}|${option}`;
    setCart((prev) => {
      const existing = prev.find((item) => item.key === key);
      if (existing) {
        return prev.map((item) =>
          item.key === key
            ? { ...item, qty: Math.min(item.qty + qty, product.stock) }
            : item
        );
      }
      return [...prev, { key, product, option, qty: Math.min(qty, product.stock) }];
    });
    showToast(`Added "${product.name}" to your cart`);
  };

  const handleBuyNow = (product, option = "Standard", qty = 1) => {
    handleAddToCart(product, option, qty);
    setCheckoutTotals({
      total: product.price * qty,
      discount: 0
    });
    setCheckoutOpen(true);
  };

  const handleCartQty = (key, delta) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.key === key
            ? { ...item, qty: Math.min(item.qty + delta, item.product.stock) }
            : item
        )
        .filter((item) => item.qty > 0)
    );
  };

  const handleRemoveCartItem = (key) => {
    setCart((prev) => prev.filter((item) => item.key !== key));
  };

  const handleProceedToCheckout = (finalTotal, discountAmount) => {
    setCheckoutTotals({ total: finalTotal, discount: discountAmount });
    setCartOpen(false);
    setCheckoutOpen(true);
  };

  const handleOrderSuccess = (newOrder) => {
    setOrders((prev) => [newOrder, ...prev]);
    setCart([]);
    setAppliedPromo(null);
    showToast(`Order ${newOrder.orderId} confirmed successfully!`);
  };

  // Wishlist toggle
  const handleToggleWishlist = (id) => {
    toggleSetItem(wishlist, setWishlist, id);
    const prod = PRODUCTS.find((p) => p.id === id);
    if (!wishlist.has(id)) {
      showToast(`Saved "${prod?.name}" to Wishlist`);
    } else {
      showToast(`Removed from Wishlist`);
    }
  };

  // Compare toggle
  const handleToggleCompare = (id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) {
        return prev.filter((x) => x !== id);
      }
      if (prev.length >= 3) {
        showToast("You can compare a maximum of 3 timepieces simultaneously.");
        return prev;
      }
      showToast("Added timepiece to comparison matrix.");
      return [...prev, id];
    });
  };

  const handleSelectCategory = (categoryId, isSale) => {
    if (isSale) {
      setSaleOnly(true);
      setActiveType("All");
    } else {
      setSaleOnly(false);
      setActiveType(categoryId);
    }
    const resultsElement = document.getElementById("results");
    if (resultsElement) {
      resultsElement.scrollIntoView({ behavior: "smooth" });
    }
  };

  const cartTotalAmount = cart.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const cartItemsCount = cart.reduce((n, item) => n + item.qty, 0);
  const wishlistedProducts = PRODUCTS.filter((p) => wishlist.has(p.id));
  const comparedProducts = PRODUCTS.filter((p) => compareIds.includes(p.id));

  const pageTitle = saleOnly
    ? "Festive Offers & Exclusive Reductions"
    : activeType === "All"
    ? "Curated Horological Masterpieces"
    : TYPES.find((t) => t.id === activeType)?.label || "Horology Collection";

  const hasActiveFilters = brands.size > 0 || bands.size > 0 || cols.size > 0 || inStock || query.length > 0;

  return (
    <div className="store-app-wrapper">
      <a className="skip-link" href="#results">
        Skip to horology products
      </a>

      {/* Header */}
      <Header
        query={query}
        setQuery={setQuery}
        wishlistCount={wishlist.size}
        onOpenWishlist={() => setWishlistOpen(true)}
        cartCount={cartItemsCount}
        cartTotal={cartTotalAmount}
        onOpenCart={() => setCartOpen(true)}
        onOpenTracking={() => setTrackingOpen(true)}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        onToggleFilters={() => setFiltersOpen((o) => !o)}
        filtersActive={hasActiveFilters}
      />

      {/* Category Pills Navigation */}
      <CategoryNav
        activeType={activeType}
        saleOnly={saleOnly}
        onSelectCategory={handleSelectCategory}
      />

      {/* Hero Showcase Banner */}
      <HeroBanner
        time={now}
        onExplore={() => {
          const el = document.getElementById("results");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }}
        onSelectSale={() => handleSelectCategory("Sale", true)}
      />

      {/* Main Catalog Section */}
      <div className="catalog-layout-container">
        {/* Breadcrumb & Results Toolbar */}
        <div className="catalog-toolbar">
          <div className="breadcrumbs">
            <span>Home</span>
            <span className="crumb-sep">/</span>
            <span className="crumb-active">{pageTitle}</span>
            <span className="results-counter">
              ({filteredProducts.length} timepieces found)
            </span>
          </div>

          <div className="toolbar-controls">
            <button
              className="toolbar-filter-btn"
              onClick={() => setFiltersOpen((o) => !o)}
            >
              <Filter size={16} />
              <span>Filters {hasActiveFilters && "• Active"}</span>
            </button>

            <label className="compare-mode-toggle">
              <input
                type="checkbox"
                checked={compareEnabled}
                onChange={(e) => {
                  setCompareEnabled(e.target.checked);
                  if (!e.target.checked) setCompareIds([]);
                }}
              />
              <span className="toggle-switch-ui" />
              <span className="toggle-label">
                <Layers size={14} className="inline-icon" /> Compare Mode
              </span>
            </label>
          </div>
        </div>

        <div className="catalog-grid-layout">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={filtersOpen}
            onClose={() => setFiltersOpen(false)}
            sort={sort}
            setSort={setSort}
            brands={brands}
            onToggleBrand={(b) => toggleSetItem(brands, setBrands, b)}
            bands={bands}
            onToggleBand={(id) => toggleSetItem(bands, setBands, id)}
            cols={cols}
            onToggleCol={(c) => toggleSetItem(cols, setCols, c)}
            inStock={inStock}
            setInStock={setInStock}
            onClearAll={clearAllFilters}
            counts={filterCounts}
          />

          {/* Product Cards Grid */}
          <main id="results" className="products-results-area">
            {filteredProducts.length === 0 ? (
              <div className="empty-catalog-state">
                <Sparkles size={48} className="empty-icon" />
                <h3>No timepieces match your criteria</h3>
                <p>Try refining your search keyword or clearing selected brand/price filters.</p>
                <button className="btn-primary" onClick={clearAllFilters}>
                  Clear All Filters
                </button>
              </div>
            ) : (
              <div className="products-grid">
                {filteredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onSelect={(p) => setSelectedProduct(p)}
                    isWishlisted={wishlist.has(product.id)}
                    onToggleWishlist={handleToggleWishlist}
                    isComparing={compareIds.includes(product.id)}
                    onToggleCompare={handleToggleCompare}
                    compareEnabled={compareEnabled}
                    onAddToCart={handleAddToCart}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Floating Compare Floating Bar */}
      {compareEnabled && compareIds.length > 0 && (
        <div className="floating-compare-dock">
          <div className="dock-content">
            <Layers size={18} className="gold-accent" />
            <span>
              <strong>{compareIds.length}</strong> of 3 timepieces selected
            </span>
          </div>
          <button
            className="btn-dock-action"
            disabled={compareIds.length < 2}
            onClick={() => setCompareOpen(true)}
          >
            {compareIds.length < 2 ? "Select 1 More to Compare" : `Compare (${compareIds.length})`}
          </button>
        </div>
      )}

      {/* Footer */}
      <Footer onCategoryClick={(type) => handleSelectCategory(type, type === "Sale")} />

      {/* Modals & Drawers */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
          onBuyNow={handleBuyNow}
          isWishlisted={wishlist.has(selectedProduct.id)}
          onToggleWishlist={handleToggleWishlist}
        />
      )}

      <CartDrawer
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        cart={cart}
        onQty={handleCartQty}
        onRemove={handleRemoveCartItem}
        onProceedToCheckout={handleProceedToCheckout}
        appliedPromo={appliedPromo}
        setAppliedPromo={setAppliedPromo}
      />

      <CheckoutModal
        isOpen={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        cart={cart}
        totalAmount={checkoutTotals.total}
        discountAmount={checkoutTotals.discount}
        appliedPromo={appliedPromo}
        onOrderSuccess={handleOrderSuccess}
      />

      <OrderTrackingModal
        isOpen={trackingOpen}
        onClose={() => setTrackingOpen(false)}
        orders={orders}
      />

      <CompareModal
        isOpen={compareOpen}
        onClose={() => setCompareOpen(false)}
        items={comparedProducts}
        onRemoveItem={handleToggleCompare}
        onAddToCart={handleAddToCart}
      />

      <WishlistDrawer
        isOpen={wishlistOpen}
        onClose={() => setWishlistOpen(false)}
        items={wishlistedProducts}
        onRemove={handleToggleWishlist}
        onAddToCart={handleAddToCart}
      />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="global-toast-notification" role="status" aria-live="polite">
          <span className="toast-bullet">•</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
