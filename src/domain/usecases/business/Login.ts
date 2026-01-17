import { LaunchRepository } from "../../../../infra/repository/LaunchRepository";

class Login {

  constructor(readonly launchRepository: LaunchRepository) { }

  async execute(email: string, password: string): Promise<any> {
    const business = await this.launchRepository.getByEmail(email);
    if (!business) {
      throw new Error('Empresa não encontrada, verifique as informações.');
    }

    const mathPassword = await business.password.decryptPassword(password, business.getPassword());
    if (!mathPassword) {
      throw new Error('Email ou senha inválidos, tente novamente.');
    }

    const token = business.generateToken();
    const payload = business.verifyToken(token);

    return {
      token,
      payload
    }

  }

}

export { Login }

