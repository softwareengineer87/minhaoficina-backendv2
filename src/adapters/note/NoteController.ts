import { Elysia, HTTPMethod, t } from "elysia";
import type { NoteRepository } from "../../infra/repository/note/NoteRepository";
import { MakeNote } from "../../domain/usecases/note/MakeNote";
import { CustomerRepository } from "../../infra/repository/customer/CustomerRepository";
import { GetAllNotes } from "../../domain/usecases/note/GetAllNotes";
import { DatabaseConnection, PgPromiseAdapter } from "../../infra/database/PgPromiseAdapter";
import { authMiddleware } from "../../middlewares/authMiddleware";
import { SaveOs } from "../../domain/usecases/note/SaveOs";
import { GetEntranceOs } from "../../domain/usecases/note/GetEntranceOs";
class NoteController {
  constructor(readonly app: Elysia, readonly noteRepository: NoteRepository, readonly customerRepository: CustomerRepository, readonly connection: DatabaseConnection) { } async save() {
    this.app.post('/notes/:business_id', async ({ body, params, set }) => {
      try {
        const { business_id } = params; const { email, name, cpf, phone, model, kilometer, plate, observation, date, } = body as {
          email: string, name: string, cpf: string, phone: string, model: string, kilometer: number, plate: string, observation: string,
          date: string,
        };
        const inputMakeNote = {
          businessId: business_id,
          email,
          name,
          cpf,
          phone,
          model,
          kilometer,
          plate,
          observation,
          date,
        }
        const makeNote = new MakeNote(this.noteRepository, this.customerRepository);
        const { noteId } = await makeNote.execute(inputMakeNote);
        set.status = 201;
        return {
          noteId,
          message: 'Nota cadastrada com sucesso!'
        }
      } catch (error: any) {
        set.status = 500;
        console.error(`Erro ao cadastrar: ${error.message}`);
        return {
          statusCode: 500,
          message: error.message || 'Erro interno no servidor',
          error: true
        }

      }
    }), {
      params: t.Object({
        business_id: t.String()
      })
    }
  }

  allNotes() {
    this.app.get('/notes/:business_id', async ({ query, params, set }) => {
      try {
        const getAllNotes = new GetAllNotes(this.connection);
        const { name, page } = query as { name: string, page: string };
        const { business_id } = params as { business_id: string };
        const convertPage = Number(page);
        let notes;
        if (name) {
          const lowerName = name.toLocaleLowerCase();
          notes = await getAllNotes.execute(business_id, convertPage, lowerName);
        } else {
          notes = await getAllNotes.execute(business_id, convertPage);
        }
        set.status = 200;
        return notes;
      } catch (error: any) {
        set.status = 500;
        return {
          statusCode: 500,
          message: error.message || 'Error interno no servidor',
          error: true
        }
      }
    });
  }

  async getNotes(query: any, params: any, set: any) {
    try {
      const getAllNotes = new GetAllNotes(this.connection);
      const { name, page } = query as { name: string, page: string };
      const { business_id } = params as { business_id: string };
      const convertPage = Number(page);
      let notes;
      if (name) {
        const lowerName = name.toLocaleLowerCase();
        notes = await getAllNotes.execute(business_id, convertPage, lowerName);
      } else {
        notes = await getAllNotes.execute(business_id, convertPage);
      }
      set.status = 200;
      return notes;
    } catch (error: any) {
      set.status = 500;
      return {
        statusCode: 500,
        message: error.message || 'Error interno no servidor',
        error: true
      }
    }
  }

  async saveOs() {
    this.app.post('/notes/os/:business_id', async ({ body, params, set }) => {
      try {
        const { business_id } = params as { business_id: string };
        const {
          email,
          name,
          cpf,
          phone,
          text
        } = body as {
          email: string,
          name: string,
          cpf: string,
          phone: string,
          text: string,
        };
        const inputOs = {
          businessId: business_id,
          email,
          name,
          cpf,
          phone,
          text
        }
        const entranceOs = new SaveOs(this.noteRepository, this.customerRepository);
        const { osId } = await entranceOs.execute(inputOs);
        set.status = 201;
        return {
          osId,
          message: 'Os de entrada cadastrada com sucesso!'
        }
      } catch (error: any) {
        set.status = 500;
        console.error(`Erro ao cadastrar os: ${error.message}`);
        return {
          statusCode: 500,
          message: error.message || 'Erro interno no servidor',
          error: true
        }

      }
    }), {
      params: t.Object({
        business_id: t.String()
      })
    }
  }

  getEntrancesOs(connection: DatabaseConnection) {
    this.app.get('notes/os/:business_id', async ({ params, query, set }) => {
      try {
        const getEntrances = new GetEntranceOs(connection);
        const { name, page } = query as { name: string, page: string };
        const { business_id } = params as { business_id: string };
        const convertPage = Number(page);
        let entrances;
        if (name) {
          const lowerName = name.toLocaleLowerCase();
          entrances = await getEntrances.execute(business_id, convertPage, lowerName);
        } else {
          entrances = await getEntrances.execute(business_id, convertPage);
        }
        set.status = 200;
        return entrances;
      } catch (error: any) {
        set.status = 500;
        return {
          statusCode: 500,
          message: error.message || 'Error interno no servidor',
          error: true
        }
      }
    });
  }

}

export { NoteController }

