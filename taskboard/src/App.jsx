import "./App.css";
import Button from "./components/ui/Button.jsx";
import Card from "./components/ui/Card.jsx";
import ProductGrid from "./components/catalogue/ProductGrid.jsx";
import { products } from "./components/catalogue/products.js";

function App() {
  return (
    <main>
      <header className="page-header">
        <p className="page-kicker">Damian Grobler</p>
        <h1>TaskBoard</h1>
      </header>
      <Card title="Sprint 12">
        <Button>Save</Button>
        <Button variant="secondary">Cancel</Button>
      </Card>
      <Card>
        <p>This card has no title.</p>
      </Card>

      {/* Lab 3.2: temporary. Remove ProductGrid from App when you start Lab 3.3. */}
      <h2 className="catalogue-title">Product catalogue</h2>
      <ProductGrid products={products} />
    </main>
  );
}

export default App;
