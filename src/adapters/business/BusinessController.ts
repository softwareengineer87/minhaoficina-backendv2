import { Elysia, t } from "elysia";
import { Signup } from "../../domain/usecases/business/Signup";
import { GetByEmail } from "../../domain/usecases/business/GetByEmail";
import { SignIn } from "../../domain/usecases/business/SignIn";
import type { BusinessRepository } from "../../infra/repository/business/BusinessRepository";
import { MakeLogo } from "../../domain/usecases/business/MakeLogo";
import { Update } from "../../domain/usecases/business/Update";
import { GetById } from "../../domain/usecases/business/GetById";
import { GetLogo } from "../../domain/usecases/business/GetLogo";
import { Cloudinary } from "../Cloudinary";
import { CloudinaryModel } from "../CloudinaryModel";
import { authMiddleware } from "../../middlewares/authMiddleware";

class BusinessController {

  constructor(readonly app: Elysia, readonly businessRepository: BusinessRepository) { }

  save() {
    this.app.post('/business/signup', async ({ body, set }) => {
      try {
        const signup = new Signup(this.businessRepository);
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

  makeLogo() {
    this.app.post('/business/logo/:business_id', async ({ body, params, set }) => {
      try {
        const cloudinary = new Cloudinary();
        const makeLogo = new MakeLogo(this.businessRepository);
        const { business_id } = params as { business_id: string };
        const photo = body as { imagem: File };
        const arrayBuffer = await photo.imagem.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
        const uploadResult: CloudinaryModel = await cloudinary.upload(buffer, 'minhaoficina');

        const { logoId } = await makeLogo.execute(
          business_id,
          uploadResult.secure_url,
          uploadResult.public_id
        );
        return {
          logoId,
          message: 'Logotipo salvo com sucesso!'
        }

      } catch (error: any) {
        set.status = 500;
        return {
          statusCode: 500,
          message: error.message || 'Erro interno no servidor',
          error: true
        }
      }
    }, {
      body: t.Object({
        imagem: t.File({
          type: ['image/jpeg', 'image/png', 'image/webp'],
          maxSize: '5m' // Opcional: limite de tamanho
        })
      })
    });
  }

  getLogo() {
    this.app.get('business/logo/:business_id', async ({ params, set }) => {
      try {
        const { business_id } = params as { business_id: string };
        const getLogo = new GetLogo(this.businessRepository);
        const { logoId, businessId, url } = await getLogo.execute(business_id);
        return {
          logoId,
          businessId,
          url
        }
      } catch (error: any) {
        set.status = 500;
        return {
          statusCode: 500,
          message: error.message || 'Erro interno no servidor',
          error: true
        }
      }
    });
  }

  update() {
    this.app.put('/business/update/:business_id', async ({ body, params, set }) => {
      try {
        const update = new Update(this.businessRepository);
        const {
          name,
          email,
          password
        } = body as {
          name: string,
          email: string,
          password: string
        };
        const { business_id } = params;
        const businessData: any = {
          name,
          email
        }
        if (password) {
          businessData.password = await Bun.password.hash(password);
        }
        const { businessId } = await update.execute(business_id, businessData);
        set.status = 201;
        return {
          businessId,
          message: 'Empresa atualizada com sucesso!'
        }
      } catch (error: any) {
        set.status = 500;
        return {
          statusCode: 500,
          message: error.message || 'Erro interno no servidor',
          error: true
        }
      }
    }, {
      params: t.Object({
        business_id: t.String()
      })
    });
  }

  getById() {
    this.app.get('business/getbyid/:business_id', async ({ params, set }) => {
      try {
        const getById = new GetById(this.businessRepository);
        const { business_id } = params;
        const business = await getById.execute(business_id);
        set.status = 200;
        return business;
      } catch (error: any) {
        set.status = 500;
        return {
          statusCode: 500,
          message: error.message || 'Erro interno no servidor',
          error: true
        }
      }
    });
  }

}

export { BusinessController }

