import type { Stock } from "../../../domain/entities/stock/Stock";
import type { DadabaseConnection } from "../../database/PgPromiseAdapter";

export interface StockRepository {
  save(stock: Stock): Promise<void>;
}

class StockRepositoryDadabase implements StockRepository {

  constructor(readonly connection: DadabaseConnection) { }

  async save(stock: Stock): Promise<void> {
    await this.connection.query(`INSERT INTO stocks 
    product_id, business_id, title, price, quantity, created_at
    VALUES($1, $2, $3, $4, $5, %6)`, [stock.productId, stock.businessId, stock.title,
    stock.price, stock.quantity, stock.createdAt])
  }

}

export { StockRepositoryDadabase }

