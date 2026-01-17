import type Elysia from "elysia";
import { Signup } from "../../domain/usecases/business/Signup";
import { BusinessRepositoryDatabase } from "../../infra/repository/BusinessRepository";
import type { DadabaseConnection } from "../../infra/database/PgPromiseAdapter";
import { GetByEmail } from "../../domain/usecases/business/GetByEmail";

class BusinessController {

  businessRepository;

  constructor(readonly app: Elysia, readonly connection: DadabaseConnection) {
    this.businessRepository = new BusinessRepositoryDatabase(this.connection);
  }

  save() {
    const signup = new Signup(this.businessRepository);
    this.app.post('/business', async ({ body, set }) => {
      try {
        const { name, email, password } = body as {
          name: string, email: string, password: string
        }
        const inputSignup = {
          name,
          email,
          password
        }
        const getByEmail = new GetByEmail(this.businessRepository);
        await getByEmail.execute(email);
        set.status = 201;
        const { businessId } = await signup.execute(inputSignup);
        return {
          businessId,
          message: 'Empresa cadastrada com sucesso!'
        }
      } catch (error) {
        set.status = 500;
        console.log(`Erro no servidor: ${error}`);
        return error;
      }
    });
  }

}

export { BusinessController }

