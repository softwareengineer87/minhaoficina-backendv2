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
  getLogo(businessId: string): Promise<Logo>;
  update(
    businessId: string,
    name: string,
    email: string,
    password?: string
  ): Promise<void>;
  getById(businessId: string): Promise<Business>;
  updateLogo(logo: Logo): Promise<void>;
  getLogoById(businessId: string): Promise<Logo | null>;
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
    (logo_id, business_id, url, public_id) VALUES ($1, $2, $3, $4)`,
      [logo.logoId, logo.businessId, logo.url, logo.publicId]);
  }

  async getLogo(businessId: string): Promise<Logo> {
    const [logoData] = await this.connection.query(`SELECT * FROM logos 
    WHERE business_id = $1`, [businessId]);
    return new Logo(
      logoData.logo_id,
      logoData.business_id,
      logoData.url,
      logoData.public_id
    );
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

  async updateLogo(logo: Logo): Promise<void> {
    await this.connection.query(`UPDATE logos SET business_id = $1, 
      url = $2, public_id = $3`,
      [logo.businessId, logo.url, logo.publicId]);
  }

  async getLogoById(businessId: string): Promise<Logo | null> {
    const [logoData] = await this.connection.query(`SELECT * FROM logos
    WHERE business_id = $1`, [businessId]);
    if (logoData) {
      return new Logo(
        logoData.logo_id,
        logoData.business_id,
        logoData.url,
        logoData.public_id
      );
    }
    return null;
  }

}

export { BusinessRepositoryDatabase }
