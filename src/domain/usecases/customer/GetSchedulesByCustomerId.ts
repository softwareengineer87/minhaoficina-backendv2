import { DatabaseConnection } from "../../../../infra/database/PgPromiseAdapter";
import { Schedule } from "../../../entities/Schedule";

class GetSchedulesByCustomerId {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(customerId: string): Promise<Schedule[]> {
    const schedules = this.connection.query(`SELECT * FROM schedules
    WHERE customer_id = $1`, customerId);

    return schedules;
  }

}

export { GetSchedulesByCustomerId }

