import Elysia from "elysia";
import { Create } from "../../domain/usecases/stock/Create";
import { StockRepository } from "../../infra/repository/stock/StockRepository";
import { Update } from "../../domain/usecases/stock/Update";
import { GetAll } from "../../domain/usecases/stock/GetAll";
import { DatabaseConnection } from "../../infra/database/PgPromiseAdapter";
import { Delete } from "../../domain/usecases/stock/Delete";

class StockController {

  private app;
  private stockRepository;

  constructor(
    app: Elysia,
    stockRepository: StockRepository
  ) {
    this.app = app;
    this.stockRepository = stockRepository
  }

  save() {
    this.app.post('/stock/:business_id', async ({ body, params, set }) => {
      try {
        const { business_id } = params as { business_id: string };
        const {
          title,
          price,
          quantity
        } = body as {
          title: string,
          price: number,
          quantity: number
        };
        const createStock = new Create(this.stockRepository);
        const inputStock = {
          businessId: business_id,
          title,
          price,
          quantity
        }
        const { productId } = await createStock.execute(inputStock);
        set.status = 201;
        return {
          productId,
          message: 'Produto cadastrado com sucesso!',
          error: false
        }
      } catch (error: any) {
        set.status = 500;
        console.log(`Erro ao cadastrar peca: ${error.message}`);
        return {
          statusCode: 500,
          message: error.message || 'Erro interno no servidor',
          error: true
        }
      }
    });
  }

  update() {
    this.app.put('/stock/:product_id/:business_id', async ({ body, params, set }) => {
      try {
        const { product_id, business_id } = params as
          { product_id: string, business_id: string };
        const {
          title,
          price,
          quantity
        } = body as {
          title: string,
          price: number,
          quantity: number
        };
        const updateStock = new Update(this.stockRepository);
        const createdAt = new Date();
        const inputStock = {
          businessId: business_id,
          title,
          price,
          quantity,
          createdAt
        }
        const { productId } = await updateStock.execute(product_id, inputStock);
        set.status = 201;
        return {
          productId,
          message: 'Produto atualizado com sucesso!',
          error: false
        }
      } catch (error: any) {
        set.status = 500;
        console.log(`Erro ao atualizar peça: ${error.message}`);
        return {
          statusCode: 500,
          message: error.message || 'Erro interno no servidor',
          error: true
        }
      }
    });
  }

  getAll(connection: DatabaseConnection) {
    this.app.get('/stocks/:business_id', async ({ params, query, set }) => {
      try {
        const { business_id } = params as { business_id: string };
        const { page, title } = query;
        const LIMIT = 10;
        const convertPage = Number(page);
        const getAll = new GetAll(connection);
        const { stocks, pagination } = await getAll.execute(
          business_id,
          LIMIT,
          convertPage,
          title
        );
        return {
          stocks,
          pagination
        }
      } catch (error: any) {
        set.status = 500;
        console.log(`Erro ao buscar produtos: ${error.message}`);
        return {
          statusCode: 500,
          message: error.message || 'Erro interno no servidor',
          error: true
        }
      }
    });
  }

  deleteStock() {
    this.app.delete('/stock/:product_id', async ({ params, set }) => {
      try {
        const { product_id } = params as { product_id: string };
        const deleteProduct = new Delete(this.stockRepository);
        const { productId } = await deleteProduct.execute(product_id);
        return {
          message: 'Produto deletado com sucesso!',
          productId,
          error: false
        }
      } catch (error: any) {
        set.status = 500;
        console.log(`Erro ao deletar produto: ${error.message}`);
        return {
          statusCode: 500,
          message: error.message || 'Erro interno no servidor',
          error: true
        }
      }
    });
  }

}

export { StockController }

