import { DatabaseConnection } from "../../../infra/database/PgPromiseAdapter";
import { Stack } from "../../Stack";

class GetAllNotes {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(name?: string): Promise<{}> {
    const notes = await this.connection.query(`SELECT n.*, c.* FROM notes AS n
    JOIN customers AS c ON c.customer_id = n.customer_id`, []);
    const stack = new Stack();
    for (let i = 0; i < notes.length; i++) {
      stack.push(notes[i]);
    }
    if (name) {
      return stack.seach(name);
    }

    return stack.getItems();
  }

}

export { GetAllNotes }

