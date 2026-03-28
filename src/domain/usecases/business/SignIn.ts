import { JwtAdapter } from "../../../adapters/JwtAdapter";
import { BusinessRepository } from "../../../infra/repository/business/BusinessRepository";

class SignIn {

  private jwt;

  constructor(readonly businessRepository: BusinessRepository) {
    this.jwt = new JwtAdapter();
  }

  async execute(email: string, password: string): Promise<any> {
    const business = await this.businessRepository.getByEmail(email);
    if (!business) {
      throw new Error('Empresa não encontrada, verifique as informações.');
    }

    const mathPassword =
      await business.getPassword().decryptPassword(password, business.getPassword().getValue());
    if (!mathPassword) {
      throw new Error('Email ou senha inválidos, tente novamente.');
    }

    const businesPayload = {
      businessId: business.businessId,
      name: business.name,
      email: business.getEmail(),
    }

    const token = this.jwt.generateToken(businesPayload);
    const payload = this.jwt.verifyToken(token);

    return {
      token,
      payload
    }

  }

}

export { SignIn }

