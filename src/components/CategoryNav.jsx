import { Watch, Sparkles, Activity, Clock, Smile, Tag, Grid } from "lucide-react";

export const CATEGORIES = [
  { id: "All", label: "All Timepieces", icon: Grid },
  { id: "Gents", label: "Men's Horology", icon: Watch },
  { id: "Ladies", label: "Ladies' Elegance", icon: Sparkles },
  { id: "Smart", label: "Smartwatches", icon: Activity },
  { id: "Wall", label: "Horological Wall Clocks", icon: Clock },
  { id: "Kids", label: "Junior Collection", icon: Smile },
  { id: "Sale", label: "Festive Offers", icon: Tag, isSale: true },
];

export default function CategoryNav({ activeType, saleOnly, onSelectCategory }) {
  return (
    <nav className="category-navigation" aria-label="Product categories">
      <div className="category-scroll-container">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isActive = cat.isSale ? saleOnly : !saleOnly && activeType === cat.id;

          return (
            <button
              key={cat.id}
              className={`category-pill ${isActive ? "is-active" : ""} ${cat.isSale ? "sale-pill" : ""}`}
              onClick={() => onSelectCategory(cat.id, !!cat.isSale)}
              aria-current={isActive ? "page" : undefined}
            >
              <Icon size={16} className="category-pill-icon" />
              <span>{cat.label}</span>
              {cat.isSale && <span className="sale-badge">SALE</span>}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

