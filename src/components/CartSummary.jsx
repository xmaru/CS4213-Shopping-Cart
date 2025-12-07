import React from "react";

export default function CartSummary({
  subtotal,
  discountOptions,
  selectedDiscountId,
  onDiscountChange,
  discountLabel,
  discountDescription,
  finalTotal
}) {
  const totalItems = subtotal.itemsCount;
  const rawTotal = subtotal.rawTotal;

  return (
    <div className="card">
      <h2 className="card-title">Summary</h2>
      <div className="summary-row">
        <span>Items</span>
        <span>{totalItems}</span>
      </div>
      <div className="summary-row">
        <span>Subtotal</span>
        <span>${rawTotal.toFixed(2)}</span>
      </div>

      <div className="summary-discount">
        <label htmlFor="discount-select">Discount</label>
        <select
          id="discount-select"
          value={selectedDiscountId}
          onChange={(e) => onDiscountChange(e.target.value)}
        >
          {discountOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>
              {opt.label}
            </option>
          ))}
        </select>
        <p className="muted">
          <strong>{discountLabel}</strong> – {discountDescription}
        </p>
      </div>

      <div className="summary-total">
        <span>Total</span>
        <span className="summary-total-value">
          ${finalTotal.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
