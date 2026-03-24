
import { BusinessRepository } from "../../../infra/repository/business/BusinessRepository";

class GetLogoById {

  constructor(readonly businessRepository: BusinessRepository) { }

  async execute(logoId: string): Promise<Output> {
    const logo = await this.businessRepository.getLogoById(logoId);

    return {
      logoId: logo.logoId,
      businessId: logo.businessId,
      url: logo.url
    }
  }

}

type Output = {
  logoId: string;
  businessId: string;
  url: string;
}

export { GetLogoById }
