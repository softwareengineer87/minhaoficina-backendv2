
class Stock {

  productId: string;
  businessId: string;
  title: string;
  price: number;
  quantity: number;
  createdAt: Date;

  constructor(
    productId: string,
    businessId: string,
    title: string,
    price: number,
    quantity: number,
    createdAt: Date
  ) {
    this.productId = productId;
    this.businessId = businessId;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
    this.createdAt = createdAt;
  }

  static create(
    businessId: string,
    title: string,
    price: number,
    quantity: number
  ) {
    const productId = crypto.randomUUID();
    const createdAt = new Date();
    return new Stock(
      productId,
      businessId,
      title,
      price,
      quantity,
      createdAt
    );
  }

  calculateTotalPrice(): number {
    return this.price * this.quantity;
  }

  getProductId(): string {
    return this.productId;
  }

  getTitle(): string {
    return this.title;
  }

  getPrice() {
    return this.price;
  }

  getQuantity() {
    return this.quantity;
  }

}

export { Stock }

