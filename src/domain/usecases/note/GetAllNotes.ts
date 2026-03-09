import { DatabaseConnection } from "../../../infra/database/PgPromiseAdapter";
import { Pagination } from "../../Pagination";
import { Stack } from "../../Stack";

class GetAllNotes {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(page: number, name?: string): Promise<Output> {
    const LIMIT = 10;
    const items = await this.connection.query(`SELECT n.*, c.* FROM notes AS n
    JOIN customers AS c ON c.customer_id = n.customer_id`, []);
    const pagination = new Pagination(LIMIT);
    pagination.paginator(page, items);
    const paginationObj = {
      actualPage: pagination.actualPage,
      lastPage: pagination.lastPage,
      totalItems: pagination.totalItems,
      prevPage: pagination.prevPage,
      nextPage: pagination.nextPage,
      totalPages: pagination.totalPages
    }
    const data = await this.connection.query(`SELECT n.*, c.* FROM notes AS n
    JOIN customers AS c ON c.customer_id = n.customer_id
    LIMIT $1 OFFSET $2`, [LIMIT, pagination.offset]);
    const stack = new Stack();
    for (let i = 0; i < data.length; i++) {
      stack.push(data[i]);
    }
    if (name) {
      console.log(stack.getItems());
      return {
        notes: stack.search(name),
        pagination: paginationObj
      }
    }

    return {
      notes: stack.getItems(),
      pagination: paginationObj
    }
  }

}

type Output = {
  notes: any,
  pagination: PaginationType
}

type PaginationType = {
  actualPage: number;
  lastPage: number;
  totalItems: number;
  prevPage: number;
  nextPage: number;
  totalPages: number;
}

export { GetAllNotes }

