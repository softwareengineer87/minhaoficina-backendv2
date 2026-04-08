import { Stock } from "../../../domain/entities/stock/Stock";
import { DatabaseConnection } from "../../database/PgPromiseAdapter";

export interface StockRepository {
  save(stock: Stock): Promise<void>;
  getById(productId: string): Promise<Stock>;
  update(
    productId: string,
    businessId: string,
    title: string,
    price: number,
    quantity: number,
    createdAt: Date
  ): Promise<void>;
  getAll(businessId: string): Promise<Stock[]>;
}

class StockRepositoryDadabase implements StockRepository {

  constructor(readonly connection: DatabaseConnection) { }

  async save(stock: Stock): Promise<void> {
    await this.connection.query(`INSERT INTO stocks 
    (product_id, business_id, title, price, quantity, created_at)
    VALUES($1, $2, $3, $4, $5, $6)`, [stock.productId, stock.businessId, stock.title,
    stock.price, stock.quantity, stock.createdAt]);
  }

  async update(
    productId: string,
    businessId: string,
    title: string,
    price: number,
    quantity: number,
    createdAt: Date
  ): Promise<void> {
    await this.connection.query(`UPDATE stocks SET 
    business_id = $1, title = $2, price = $3, 
    quantity = $4, created_at = $5
    WHERE product_id = $6`, [businessId, title,
      price, quantity, createdAt, productId]);
  }

  async getById(productId: string): Promise<Stock> {
    const [stockData] = await this.connection.query(`SELECT * FROM stocks
    WHERE product_id = $1`, [productId]);

    return new Stock(
      stockData.product_id,
      stockData.business_id,
      stockData.title,
      stockData.price,
      stockData.quantity,
      stockData.created_at
    );
  }

  async getAll(businessId: string): Promise<Stock[]> {
    const stocks = await this.connection.query(`SELECT * FROM stocks
    WHERE business_id = $1`, [businessId]);
    return stocks;
  }

}

export { StockRepositoryDadabase }

