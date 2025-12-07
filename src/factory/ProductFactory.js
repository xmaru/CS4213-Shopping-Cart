// src/factory/ProductFactory.js
import { PRODUCTS as PRODUCT_DEFINITIONS } from "../data/products";

// Domain model for a product (could have behavior, not just data)
export class Product {
  constructor({ id, name, price, category, description }) {
    this.id = id;
    this.name = name;
    this.price = price;
    this.category = category;
    this.description = description;
  }

  // Example behavior: compute total for some quantity
  totalForQuantity(qty) {
    return this.price * qty;
  }
}

// Factory Method: central place to create Product objects
export class ProductFactory {
  // Create a single product from its ID
  static createById(id) {
    const def = PRODUCT_DEFINITIONS.find((p) => p.id === id);
    if (!def) {
      throw new Error(`Unknown product id: ${id}`);
    }
    return new Product(def);
  }

  // Create all products (for the UI list)
  static createAllProducts() {
    return PRODUCT_DEFINITIONS.map((def) => new Product(def));
  }
}
