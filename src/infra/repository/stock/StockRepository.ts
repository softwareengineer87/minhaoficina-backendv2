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
    minimumStock: number,
    createdAt: Date
  ): Promise<void>;
  getAll(businessId: string): Promise<Stock[]>;
  delete(productId: string): Promise<void>;
}

class StockRepositoryDadabase implements StockRepository {

  constructor(readonly connection: DatabaseConnection) { }

  async save(stock: Stock): Promise<void> {
    await this.connection.query(`INSERT INTO stocks 
    (product_id, business_id, title, price, quantity, minimum_stock, created_at)
    VALUES($1, $2, $3, $4, $5, $6, $7)`, [stock.productId, stock.businessId, stock.title,
    stock.price, stock.quantity, stock.minimumStock, stock.createdAt]);
  }

  async update(
    productId: string,
    businessId: string,
    title: string,
    price: number,
    quantity: number,
    minimumStock: number,
    createdAt: Date
  ): Promise<void> {
    await this.connection.query(`UPDATE stocks SET 
    business_id = $1, title = $2, price = $3, 
    quantity = $4, minimum_stock = $5, created_at = $6
    WHERE product_id = $7`, [businessId, title,
      price, quantity, minimumStock, createdAt, productId]);
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
      stockData.minimumStock,
      stockData.created_at
    );
  }

  async getAll(businessId: string): Promise<Stock[]> {
    const stocks = await this.connection.query(`SELECT * FROM stocks
    WHERE business_id = $1`, [businessId]);
    return stocks;
  }

  async delete(productId: string): Promise<void> {
    await this.connection.query(`DELETE FROM stocks
    WHERE product_id = $1`, [productId]);
  }

}

export { StockRepositoryDadabase }

