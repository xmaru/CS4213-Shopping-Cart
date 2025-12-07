import React from "react";

export default function Cart({
  items,
  onIncrease,
  onDecrease,
  onClear
}) {
  const isEmpty = items.length === 0;

  return (
    <div className="card">
      <h2 className="card-title">Cart</h2>
      {isEmpty && <p className="muted">Your cart is empty.</p>}

      {!isEmpty && (
        <>
          <ul className="cart-list">
            {items.map((item) => (
              <li key={item.id} className="cart-item">
                <div className="cart-item-info">
                  <div className="cart-item-name">{item.name}</div>
                  <div className="cart-item-meta">
                    ${item.price.toFixed(2)} × {item.quantity}
                  </div>
                </div>
                <div className="cart-item-actions">
                  <button
                    className="btn ghost"
                    onClick={() => onDecrease(item.id)}
                  >
                    −
                  </button>
                  <span className="cart-item-qty">{item.quantity}</span>
                  <button
                    className="btn ghost"
                    onClick={() => onIncrease(item.id)}
                  >
                    +
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button className="btn danger full-width" onClick={onClear}>
            Clear Cart
          </button>
        </>
      )}
    </div>
  );
}
