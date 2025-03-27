import ProductList from "./components/ProductList";
import Cart from "./components/Cart";

function App() {
  return (
    <div style={{ display: "flex", maxWidth: "1000px", margin: "40px auto", gap: "40px" }}>
      <ProductList />
      <Cart />
    </div>
  );
}

export default App;
