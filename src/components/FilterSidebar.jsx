import { X, RotateCcw, ChevronDown, Check } from "lucide-react";
import { BRANDS, COLLECTIONS, PRICE_BANDS } from "../data.js";

const SORTS = [
  { id: "best", label: "Best Sellers & Popular" },
  { id: "low", label: "Price: Low to High" },
  { id: "high", label: "Price: High to Low" },
  { id: "off", label: "Biggest Discount (%)" },
  { id: "rate", label: "Customer Rating (Highest)" },
];

export default function FilterSidebar({
  isOpen,
  onClose,
  sort,
  setSort,
  brands,
  onToggleBrand,
  bands,
  onToggleBand,
  cols,
  onToggleCol,
  inStock,
  setInStock,
  onClearAll,
  counts
}) {
  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && <div className="filter-backdrop" onClick={onClose} aria-hidden="true" />}

      <aside className={`filter-sidebar ${isOpen ? "is-open" : ""}`} aria-label="Catalog filters">
        <div className="filter-header">
          <div className="filter-heading-row">
            <h2 className="filter-title">Filters &amp; Sort</h2>
            <button className="clear-all-link" onClick={onClearAll} title="Reset all applied filters">
              <RotateCcw size={13} /> Reset
            </button>
          </div>
          <button className="close-filter-mobile" onClick={onClose} aria-label="Close filters">
            <X size={20} />
          </button>
        </div>

        {/* Sort Section */}
        <div className="filter-group">
          <label className="filter-group-title" htmlFor="sort-select">
            Sort Order
          </label>
          <div className="custom-select-wrapper">
            <select
              id="sort-select"
              className="custom-select"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Stock Filter */}
        <div className="filter-group">
          <label className="custom-checkbox">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => setInStock(e.target.checked)}
            />
            <span className="checkbox-box">
              {inStock && <Check size={12} className="check-svg" />}
            </span>
            <span className="checkbox-text">In Stock Only</span>
            <span className="filter-count">({counts.inStock})</span>
          </label>
        </div>

        {/* Price Bands */}
        <details className="filter-details" open>
          <summary className="filter-summary">
            <span>Price Range</span>
            <ChevronDown size={16} className="summary-chevron" />
          </summary>
          <div className="filter-options-list">
            {PRICE_BANDS.map((b) => {
              const isChecked = bands.has(b.id);
              return (
                <label key={b.id} className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleBand(b.id)}
                  />
                  <span className="checkbox-box">
                    {isChecked && <Check size={12} className="check-svg" />}
                  </span>
                  <span className="checkbox-text">{b.label}</span>
                  <span className="filter-count">({counts.band(b.id)})</span>
                </label>
              );
            })}
          </div>
        </details>

        {/* Brands */}
        <details className="filter-details" open>
          <summary className="filter-summary">
            <span>Maison &amp; Brand</span>
            <ChevronDown size={16} className="summary-chevron" />
          </summary>
          <div className="filter-options-list">
            {BRANDS.map((b) => {
              const isChecked = brands.has(b);
              return (
                <label key={b} className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleBrand(b)}
                  />
                  <span className="checkbox-box">
                    {isChecked && <Check size={12} className="check-svg" />}
                  </span>
                  <span className="checkbox-text">{b}</span>
                  <span className="filter-count">({counts.brand(b)})</span>
                </label>
              );
            })}
          </div>
        </details>

        {/* Collections */}
        <details className="filter-details" open>
          <summary className="filter-summary">
            <span>Horological Collection</span>
            <ChevronDown size={16} className="summary-chevron" />
          </summary>
          <div className="filter-options-list">
            {COLLECTIONS.map((c) => {
              const isChecked = cols.has(c);
              return (
                <label key={c} className="custom-checkbox">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => onToggleCol(c)}
                  />
                  <span className="checkbox-box">
                    {isChecked && <Check size={12} className="check-svg" />}
                  </span>
                  <span className="checkbox-text">{c} Collection</span>
                  <span className="filter-count">({counts.col(c)})</span>
                </label>
              );
            })}
          </div>
        </details>
      </aside>
    </>
  );
}

