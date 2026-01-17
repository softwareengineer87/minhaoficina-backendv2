import type { BusinessRepository } from "../../../infra/repository/BusinessRepository";
import { Business } from "../../entities/business/Business";

class Signup {

  constructor(readonly businessRepository: BusinessRepository) { }

  async execute(input: Input): Promise<Output> {
    const businessEmail = await this.businessRepository.getByEmail(input.email);
    if (businessEmail) {
      throw new Error('Empresa já cadastrada no sistema, faça login.')
    }
    const business = Business.create(
      input.name,
      input.email,
      input.password,
    );
    const hashPass = await business.password.emcryptPassword(input.password);
    await this.businessRepository.save(
      business.businessId,
      business.name,
      business.getEmail(),
      hashPass,
    );

    return {
      businessId: business.businessId
    }
  }

}

type Input = {
  name: string;
  email: string;
  password: string;
}

type Output = {
  businessId: string;
}

export { Signup }

