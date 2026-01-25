import { Business } from "../../../domain/entities/business/Business";
import type { DatabaseConnection } from "../../database/PgPromiseAdapter";

export interface BusinessRepository {
  save(
    businessId: string,
    name: string,
    email: string,
    password: string
  ): Promise<void>;
  getByEmail(email: string): Promise<Business | null>;
}

class BusinessRepositoryDatabase implements BusinessRepository {

  constructor(readonly connection: DatabaseConnection) { }

  async save(
    businessId: string,
    name: string,
    email: string,
    password: string
  ): Promise<void> {
    await this.connection.query(`INSERT INTO business (business_id,
    name, email, password) VALUES($1, $2, $3, $4)`,
      [businessId, name, email, password])
  }

  async getByEmail(email: string): Promise<Business | null> {
    const [business] = await this.connection.query(`SELECT * FROM business
    WHERE email = $1`, [email]);
    if (!business) return null;

    return new Business(
      business.business_id,
      business.name,
      business.email,
      business.password
    );

  }

}

export { BusinessRepositoryDatabase }
