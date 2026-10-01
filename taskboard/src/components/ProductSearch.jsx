import { useEffect, useState } from "react";

// Lab 5.1: I search DummyJSON as I type, with a 400ms debounce and AbortController.
function ProductSearch() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [result, setResult] = useState({ query: "", products: [], error: null });

  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedQuery(query), 400);
    return () => clearTimeout(timeoutId);
  }, [query]);

  const tooShort = debouncedQuery.trim().length < 2;

  useEffect(() => {
    if (tooShort) return;

    const controller = new AbortController();
    const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(debouncedQuery)}`;

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return response.json();
      })
      .then((json) => {
        setResult({ query: debouncedQuery, products: json.products ?? [], error: null });
      })
      .catch((err) => {
        if (err.name !== "AbortError") {
          setResult({ query: debouncedQuery, products: [], error: err.message });
        }
      });

    return () => controller.abort();
  }, [debouncedQuery, tooShort]);

  // Lab 5.1: I derive loading instead of calling setLoading in the fetch effect.
  const loading = !tooShort && result.query !== debouncedQuery;

  let content;
  if (tooShort) {
    content = <p className="product-search-hint">Type at least 2 characters.</p>;
  } else if (loading) {
    content = <p className="product-search-hint">Searching...</p>;
  } else if (result.error) {
    content = <p role="alert">Search failed: {result.error}</p>;
  } else if (result.products.length === 0) {
    content = <p className="product-search-hint">No products found.</p>;
  } else {
    content = (
      <ul className="product-search-list">
        {result.products.map((product) => (
          <li key={product.id} className="product-search-item">
            <span>{product.title}</span>
            <strong>${product.price}</strong>
          </li>
        ))}
      </ul>
    );
  }

  return (
    <section className="product-search">
      <h2>Lab 5.1 product search</h2>
      <label htmlFor="product-search">Search products</label>
      <input
        id="product-search"
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="phone, laptop, cream..."
      />
      {content}
    </section>
  );
}

export default ProductSearch;
