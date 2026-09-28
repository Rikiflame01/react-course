import { formatPrice } from "./formatPrice.js";

function ProductCard({ name, price, rating, inStock, category }) {
  return (
    <article className="card product-card">
      <div className="product-card-top">
        <p className="product-category">{category}</p>
        {!inStock && <span className="badge">Out of stock</span>}
      </div>
      <h3>{name}</h3>
      <div className="product-meta">
        <p className="product-price">{formatPrice(price)}</p>
        {rating > 0 && (
          <p className="product-rating" aria-label={`${rating} out of 5`}>
            {"★".repeat(rating)}
          </p>
        )}
      </div>
    </article>
  );
}

export default ProductCard;
