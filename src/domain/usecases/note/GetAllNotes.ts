import { DatabaseConnection } from "../../../infra/database/PgPromiseAdapter";
import { Note } from "../../entities/note/Note";
import { Pagination } from "../../Pagination";

class GetAllNotes {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(
    businessId: string,
    page: number,
    name?: string
  ): Promise<Output> {
    const LIMIT = 10;
    const items = await this.connection.query(`SELECT n.*, c.* FROM notes AS n
    JOIN customers AS c ON c.customer_id = n.customer_id
    WHERE n.business_id = $1`, [businessId]);
    const pagination = new Pagination(LIMIT);
    pagination.paginator(page, items);

    let notes: Note[] = [];
    if (name) {
      notes = await this.connection.query(`SELECT n.*, c.* FROM notes AS n
      JOIN customers AS c ON c.customer_id = n.customer_id
      WHERE n.business_id = $1 AND name ILIKE $2 LIMIT $3 OFFSET $4`,
        [businessId, `%${name}%`, LIMIT, pagination.offset]);
    } else {
      notes = await this.connection.query(`SELECT n.*, c.* FROM notes AS n
      JOIN customers AS c ON c.customer_id = n.customer_id
      WHERE n.business_id = $1 LIMIT $2 OFFSET $3`,
        [businessId, LIMIT, pagination.offset]);
    }
    return {
      notes,
      pagination
    }
  }

}

type Output = {
  notes: Note[],
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

export { GetAllNotes }

