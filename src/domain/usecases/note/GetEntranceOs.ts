
import { DatabaseConnection } from "../../../infra/database/PgPromiseAdapter";
import { EntranceOS } from "../../entities/note/EntranceOS";
import { Note } from "../../entities/note/Note";
import { Pagination } from "../../Pagination";

class GetEntranceOs {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(
    businessId: string,
    page: number,
    name?: string
  ): Promise<Output> {
    const LIMIT = 10;
    const items = await this.connection.query(`SELECT e.*, c.* FROM entrances_os AS e
    JOIN customers AS c ON c.customer_id = e.customer_id
    WHERE e.business_id = $1`, [businessId]);
    const pagination = new Pagination(LIMIT);
    pagination.paginator(page, items);

    let entrances: EntranceOS[] = [];
    if (name) {
      entrances = await this.connection.query(`SELECT e.text, c.email, c.name, c.phone FROM entrances_os AS e
      JOIN customers AS c ON c.customer_id = e.customer_id
      WHERE e.business_id = $1 AND c.name ILIKE $2 LIMIT $3 OFFSET $4`,
        [businessId, `%${name}%`, LIMIT, pagination.offset]);
    } else {
      entrances = await this.connection.query(`SELECT e.text, c.email, c.name, c.phone FROM entrances_os AS e
      JOIN customers AS c ON c.customer_id = e.customer_id
      WHERE e.business_id = $1 LIMIT $2 OFFSET $3`,
        [businessId, LIMIT, pagination.offset]);
    }
    return {
      entrances,
      pagination
    }
  }

}

type Output = {
  entrances: EntranceOS[],
  pagination: PaginationType
}

type PaginationType = {
  actualPage: number;
  lastPage: number;
  totalItems: number;
  prevPage: number;
  nextPage: number;
  totalPages: number;
  offset: number;
}

export { GetEntranceOs }

