import { Elysia, t } from "elysia";
import { Signup } from "../../domain/usecases/business/Signup";
import { GetByEmail } from "../../domain/usecases/business/GetByEmail";
import { SignIn } from "../../domain/usecases/business/SignIn";
import type { BusinessRepository } from "../../infra/repository/business/BusinessRepository";

class BusinessController {

  constructor(readonly app: Elysia, readonly businessRepository: BusinessRepository) { }

  save() {
    const signup = new Signup(this.businessRepository);
    this.app.post('/business/signup', async ({ body, set }) => {
      try {
        const { name, email, password } = body;
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
      } catch (error: any) {
        set.status = 500;
        console.error(`Erro no login: ${error.message}`);
        return {
          statusCode: 500,
          message: error.message || 'Erro interno no servidor',
          error: true
        }
      }
    }, {
      body: t.Object({
        name: t.String(),
        email: t.String(),
        password: t.String()
      })
    });
  }

  signIn() {
    const signIn = new SignIn(this.businessRepository);
    this.app.post('/business/sign-in', async ({ body, set }) => {
      try {
        const { email, password } = body;
        const { token, payload } = await signIn.execute(email, password);
        set.status = 201;
        return {
          token,
          payload,
          message: 'Login efetuado com sucesso! Você está sendo redirecionado.'
        }
      } catch (error: any) {
        set.status = 401;
        console.error(`Erro no login: ${error.message}`);
        return {
          statusCode: 500,
          message: error.message || 'Erro interno no servidor',
          error: true
        }
      }
    }, {
      body: t.Object({
        email: t.String(),
        password: t.String()
      })
    });
  }

}

export { BusinessController }

