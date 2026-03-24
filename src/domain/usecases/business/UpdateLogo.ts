import { BusinessRepository } from "../../../infra/repository/business/BusinessRepository";

class UpdateLogo {

  constructor(readonly businessRepository: BusinessRepository) { }

  async execute(businessId: string): Promise<void> {
    await this.businessRepository.updateLogo(businessId);
  }

}

export { UpdateLogo }

