import { BusinessRepository } from "../../../infra/repository/business/BusinessRepository";
import { Logo } from "../../entities/business/Logo";

class MakeLogo {

  constructor(readonly businessRepository: BusinessRepository) { }

  async execute(
    businessId: string,
    url: string
  ): Promise<Output> {
    const logo = Logo.create(businessId, url);
    await this.businessRepository.saveLogo(logo);

    return {
      logoId: logo.logoId
    }
  }

}

type Output = {
  logoId: string;
}

export { MakeLogo }
