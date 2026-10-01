import { formatPrice } from "./formatPrice.js";

// Lab 4.2: Product card adds in-stock products to the cart.
function ProductCard({ id, name, price, rating, inStock, category, onAddToCart }) {
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
      <button type="button" disabled={!inStock} onClick={() => onAddToCart(id)}>
        {inStock ? "Add to cart" : "Unavailable"}
      </button>
    </article>
  );
}

export default ProductCard;
