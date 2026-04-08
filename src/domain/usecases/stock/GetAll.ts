import { DatabaseConnection } from "../../../infra/database/PgPromiseAdapter";
import { Stock } from "../../entities/stock/Stock";
import { Pagination } from "../../Pagination";

class GetAll {
  constructor(readonly connection: DatabaseConnection) { }

  async execute(
    businessId: string,
    limit: number,
    page: number,
    name?: string
  ): Promise<Output> {
    const allStocks = await this.connection.query(`SELECT * FROM stocks
    WHERE business_id = $1`, [businessId]);
    const pagination = new Pagination(limit);
    console.log(typeof page);
    pagination.paginator(page, allStocks);

    let stocks: Stock[] = [];
    if (name) {
      stocks = await this.connection.query(`SELECT * FROM stocks
      WHERE business_id = $1 AND title ILIKE $2 LIMIT $3 OFFSET $4`,
        [businessId, `%${name}%`, limit, pagination.offset]);
    } else {
      stocks = await this.connection.query(`SELECT * FROM stocks
      WHERE business_id = $1 LIMIT $2 OFFSET $3`,
        [businessId, limit, pagination.offset]);
    }
    return {
      stocks,
      pagination
    };
  }
}

type Output = {
  stocks: Stock[],
  pagination: Pagination
}

export { GetAll }

