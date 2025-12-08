// Conceptual "interface" for a discount strategy.
// In JS this is just documentation, not enforced.
// class DiscountStrategy {
//   apply(total) {
//     throw new Error("apply() must be implemented");
//   }
// }

class NoDiscount {
  apply(total, items) {
    return total;
  }
} 

class PercentageDiscount {
  constructor(percent) {
    this.percent = percent;
  }

  apply(total, items) {
    return total * (1 - this.percent);
  }
}

class FlatAmountDiscount {
  constructor(amount) {
    this.amount = amount;
  }

  apply(total, items) {
    return Math.max(0, total - this.amount);
  }
}

class BuyOneGetOneDiscount {
  apply(total, items) {
    let discount = 0;

    items.forEach((item) => {
      const freeUnits = Math.floor(item.quantity / 2);
      discount += freeUnits * item.price;
    });

    return Math.max(0, total - discount);
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
  },
  {
    id: "veteran15",
    label: "Veteran 15% off",
    description: "15% off the subtotal for veterans.",
    strategy: new PercentageDiscount(0.15)
  },
  {
    id: "bogo", 
    label: "Buy 1 Get 1 Free",
    description: "Every second item of the same product is free.",
    strategy: new BuyOneGetOneDiscount()
  }
];
