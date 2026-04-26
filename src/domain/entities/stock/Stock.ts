
class Stock {

  productId: string;
  businessId: string;
  title: string;
  price: number;
  quantity: number;
  minimumStock: number;
  createdAt: Date;

  constructor(
    productId: string,
    businessId: string,
    title: string,
    price: number,
    quantity: number,
    minimumStock: number,
    createdAt: Date
  ) {
    if (!businessId) {
      throw new Error('Você não está logado');
    }
    if (title === '' || title === undefined) {
      throw new Error('O titulo é obrigatório.');
    }
    if (price <= 0 || price === undefined) {
      throw new Error('O preço é obrigatório e precisa ser maior que zero.');
    }
    if (quantity <= 0 || price === undefined) {
      throw new Error('A quantidade é obrigatória e precisa ser maior ou igual a 1.');
    }
    if (minimumStock < 1 || minimumStock === undefined) {
      throw new Error('O estoque minimo precisa ser maior que 1 e é obrigatório');
    }
    this.productId = productId;
    this.businessId = businessId;
    this.title = title;
    this.price = price;
    this.quantity = quantity;
    this.minimumStock = minimumStock;
    this.createdAt = createdAt;
  }

  static create(
    businessId: string,
    title: string,
    price: number,
    quantity: number,
    minimumStock: number
  ) {
    const productId = crypto.randomUUID();
    const createdAt = new Date();
    return new Stock(
      productId,
      businessId,
      title,
      price,
      quantity,
      minimumStock,
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

