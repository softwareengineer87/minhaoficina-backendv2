import { DatabaseConnection } from "../../../infra/database/PgPromiseAdapter";
import { Logo } from "../../entities/business/Logo";

class GetLogo {

  constructor(readonly connection: DatabaseConnection) { }

  async execute(businessId: string): Promise<Output> {
    const [logo] = await this.connection.query(`SELECT * FROM logos 
    WHERE business_id = $1`, [businessId]);
    return new Logo(logo.logo_id, logo.business_id, logo.url);
  }

}

type Output = {
  logoId: string;
  businessId: string;
  url: string;
}

export { GetLogo }

