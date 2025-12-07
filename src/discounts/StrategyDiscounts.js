// Conceptual "interface" for a discount strategy.
// In JS this is just documentation, not enforced.
// class DiscountStrategy {
//   apply(total) {
//     throw new Error("apply() must be implemented");
//   }
// }

class NoDiscount {
  apply(total) {
    return total;
  }
}

class PercentageDiscount {
  constructor(percent) {
    this.percent = percent;
  }

  apply(total) {
    return total * (1 - this.percent);
  }
}

class FlatAmountDiscount {
  constructor(amount) {
    this.amount = amount;
  }

  apply(total) {
    return Math.max(0, total - this.amount);
  }
}

// List of available strategies for the UI
export const DISCOUNT_STRATEGIES = [
  {
    id: "none",
    label: "No discount",
    description: "Pay full price.",
    strategy: new NoDiscount()
  },
  {
    id: "student10",
    label: "Student 10% off",
    description: "10% off the subtotal for students.",
    strategy: new PercentageDiscount(0.1)
  },
  {
    id: "bf20",
    label: "Black Friday 20% off",
    description: "Limited-time 20% sale.",
    strategy: new PercentageDiscount(0.2)
  },
  {
    id: "flat5",
    label: "Flat $5 off",
    description: "Take $5 off any order.",
    strategy: new FlatAmountDiscount(5)
  }
];
