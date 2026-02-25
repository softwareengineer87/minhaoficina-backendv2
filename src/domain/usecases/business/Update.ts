import { BusinessRepository } from "../../../infra/repository/business/BusinessRepository";

class Update {

  constructor(readonly businessRepository: BusinessRepository) { }

  async execute(businessId: string, input: Input): Promise<Output> {
    if (input.name === '' || input.name === undefined) {
      throw new Error('O nome da empresa é origatório.');
    }
    if (input.email === '' || input.email === undefined) {
      throw new Error('O email da empresa é origatório.');
    }
    const businessData = await this.businessRepository.getByEmail(input.email);
    const pass = input.password ? input.password : businessData?.password.getValue();
    await this.businessRepository.update(
      businessId,
      input.name,
      input.email,
      pass
    );
    return {
      businessId
    }
  }

}

type Input = {
  name: string,
  email: string,
  password?: string,
}

type Output = {
  businessId: string;
}

export { Update }

