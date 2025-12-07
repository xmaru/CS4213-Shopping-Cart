import { useState, useMemo } from "react";
import ProductList from "./components/ProductList";
import Cart from "./components/Cart";
import CartSummary from "./components/CartSummary";
import { DISCOUNT_STRATEGIES } from "./discounts/StrategyDiscounts";
import { ProductFactory } from "./factory/ProductFactory";

export default function App() {
  // Create the catalog once using the ProductFactory (Factory Method)
  const products = useMemo(
    () => ProductFactory.createAllProducts(),
    []
  );

  const [cartItems, setCartItems] = useState([]);
  const [selectedDiscountId, setSelectedDiscountId] = useState("none");

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

  // Subtotal calculation
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

  // Strategy selection (which discount algorithm to use)
  const currentDiscountConfig = useMemo(
    () =>
      DISCOUNT_STRATEGIES.find((d) => d.id === selectedDiscountId) ??
      DISCOUNT_STRATEGIES[0],
    [selectedDiscountId]
  );

  // Apply selected discount strategy
  const finalTotal = useMemo(
  () =>
    currentDiscountConfig.strategy.apply(
      subtotal.rawTotal,
      cartItems
    ),
  [currentDiscountConfig, subtotal, cartItems]
);


  return (
    <div className="app">
      <header className="app-header">
        <h1>CS 4213 | Group J – Shopping Cart Prototype</h1>
        <p className="muted">
          Demonstrating Strategy, Factory Method, and Observer using a
          mini cart.
        </p>
      </header>

      <main className="layout">
        <ProductList products={products} onAdd={handleAddToCart} />

        <div className="right-column">
          <Cart
            items={cartItems}
            onIncrease={handleIncreaseQuantity}
            onDecrease={handleDecreaseQuantity}
            onClear={handleClearCart}
          />
          <CartSummary
            subtotal={subtotal}
            discountOptions={DISCOUNT_STRATEGIES}
            selectedDiscountId={selectedDiscountId}
            onDiscountChange={setSelectedDiscountId}
            discountLabel={currentDiscountConfig.label}
            discountDescription={currentDiscountConfig.description}
            finalTotal={finalTotal}
          />
        </div>
      </main>
    </div>
  );
}
