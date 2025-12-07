import { useState, useMemo } from "react";
import { PRODUCTS } from "./data/products";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CartSummary from "./components/CartSummary";

export default function App() {
  const [cartItems, setCartItems] = useState([]);
  const [discountType, setDiscountType] = useState("none");

  function handleAddToCart(product) {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          name: product.name,
          price: product.price,
          quantity: 1
        }
      ];
    });
  }

  function handleIncreaseQuantity(productId) {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  }

  function handleDecreaseQuantity(productId) {
    setCartItems((prev) =>
      prev
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function handleClearCart() {
    setCartItems([]);
  }

  const subtotal = useMemo(() => {
    const itemsCount = cartItems.reduce(
      (sum, item) => sum + item.quantity,
      0
    );
    const rawTotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
    return { itemsCount, rawTotal };
  }, [cartItems]);

  return (
    <div className="app">
      <header className="app-header">
        <h1>CS 4213 – Shopping Cart Prototype</h1>
        <p className="muted">
          Demonstrating Strategy, Factory Method, and Observer using a
          mini cart.
        </p>
      </header>

      <main className="layout">
        <ProductList products={PRODUCTS} onAdd={handleAddToCart} />

        <div className="right-column">
          <Cart
            items={cartItems}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
            onClear={handleClearCart}
          />
          <CartSummary
            subtotal={subtotal}
            discountType={discountType}
            onDiscountChange={setDiscountType}
          />
        </div>
      </main>
    </div>
  );
}
