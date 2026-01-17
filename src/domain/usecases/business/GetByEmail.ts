import type { BusinessRepository } from "../../../infra/repository/BusinessRepository";

class GetByEmail {

  constructor(readonly businessRepository: BusinessRepository) { }

  async execute(email: string): Promise<Output> {
    const business = await this.businessRepository.getByEmail(email);
    return {
      businessId: business?.businessId,
      name: business?.name,
      email: business?.getEmail(),
      password: business?.getPassword()
    }
  }

}

type Output = {
  businessId: string | undefined;
  name: string | undefined;
  email: string | undefined;
  password: string | undefined;
}

export { GetByEmail }

