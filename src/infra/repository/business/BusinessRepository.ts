import { Business } from "../../../domain/entities/business/Business";
import { Logo } from "../../../domain/entities/business/Logo";
import type { DatabaseConnection } from "../../database/PgPromiseAdapter";

export interface BusinessRepository {
  save(
    businessId: string,
    name: string,
    email: string,
    password: string
  ): Promise<void>;
  getByEmail(email: string): Promise<Business | null>;
  saveLogo(logo: Logo): Promise<void>;
  update(
    businessId: string,
    name: string,
    email: string,
    password?: string
  ): Promise<void>;
  getById(businessId: string): Promise<Business>;
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

  async saveLogo(logo: Logo): Promise<void> {
    await this.connection.query(`INSERT INTO logos
    (photo_id, business_id, url) VALUES ($1, $2, $3)`,
      [logo.logoId, logo.businessId, logo.url]);
  }

  async update(
    businessId: string,
    name: string,
    email: string,
    password?: string
  ): Promise<void> {
    await this.connection.query(`UPDATE business SET
    name = $1, email = $2, password = $3
    WHERE business_id = $4`, [name, email,
      password, businessId]);
  }

  async getById(businessId: string): Promise<Business> {
    const [businessData] = await this.connection.query(`SELECT * FROM business
    WHERE business_id = $1`, businessId);
    return new Business(
      businessData.business_id,
      businessData.name,
      businessData.email,
      businessData.password
    );
  }

}

export { BusinessRepositoryDatabase }
