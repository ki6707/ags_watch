import { useState } from "react";
import WatchFace from "./WatchFace.jsx";

export default function Visual({ product, src, label, className = "", onClick }) {
  const [failed, setFailed] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const imageSrc = src || (product?.images && product.images[0]) || product?.image || `/images/${product?.id}.jpg`;

  if (failed || !imageSrc) {
    return (
      <div className={`visual-wrapper visual-fallback ${className}`} onClick={onClick}>
        <WatchFace {...(product?.look || {})} label={label || product?.name} />
      </div>
    );
  }

  return (
    <div className={`visual-wrapper ${loaded ? "is-loaded" : "is-loading"} ${className}`} onClick={onClick}>
      {!loaded && <div className="visual-skeleton" aria-hidden="true" />}
      <img
        src={imageSrc}
        alt={label || product?.name || "Luxury timepiece"}
        loading="lazy"
        onLoad={() => setLoaded(true)}
        onError={() => setFailed(true)}
        className="visual-img"
      />
    </div>
  );
}

