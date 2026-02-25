import { BusinessRepository } from "../../../infra/repository/business/BusinessRepository";

class GetById {

  constructor(readonly businessRepository: BusinessRepository) { }

  async execute(businessId: string): Promise<Output> {
    const business = await this.businessRepository.getById(businessId);
    return {
      businessId: business.businessId,
      name: business.name,
      email: business.getEmail(),
    }
  }

}

type Output = {
  businessId: string;
  name: string;
  email: string;
}

export { GetById }

