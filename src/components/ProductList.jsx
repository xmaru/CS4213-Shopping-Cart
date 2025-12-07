import React from "react";

export default function ProductList({ products, onAdd }) {
  return (
    <div className="card">
      <h2 className="card-title">Products</h2>
      <p className="card-subtitle">
        Click <strong>Add</strong> to put an item into the cart.
      </p>
      <div className="product-list">
        {products.map((p) => (
          <div key={p.id} className="product-item">
            <div>
              <div className="product-name">{p.name}</div>
              <div className="product-meta">
                <span>{p.category}</span> •{" "}
                <span>${p.price.toFixed(2)}</span>
              </div>
              <div className="product-description">{p.description}</div>
            </div>
            <button
              className="btn primary"
              onClick={() => onAdd(p)}
            >
              Add
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
