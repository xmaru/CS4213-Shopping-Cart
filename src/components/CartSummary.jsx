import React from "react";

export default function CartSummary({
  subtotal,
  discountType,
  onDiscountChange
}) {
  const totalItems = subtotal.itemsCount;
  const rawTotal = subtotal.rawTotal;

  // ❗ Pre-pattern discount logic (intentionally if/else spaghetti)
  let discountLabel = "No discount";
  let finalTotal = rawTotal;

  if (discountType === "student10") {
    discountLabel = "Student discount 10%";
    finalTotal = rawTotal * 0.9;
  } else if (discountType === "bf20") {
    discountLabel = "Black Friday 20%";
    finalTotal = rawTotal * 0.8;
  } else if (discountType === "flat5") {
    discountLabel = "Flat $5 off";
    finalTotal = Math.max(0, rawTotal - 5);
  }

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
          value={discountType}
          onChange={(e) => onDiscountChange(e.target.value)}
        >
          <option value="none">None</option>
          <option value="student10">Student 10% off</option>
          <option value="bf20">Black Friday 20% off</option>
          <option value="flat5">Flat $5 off</option>
        </select>
        <p className="muted">{discountLabel}</p>
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
