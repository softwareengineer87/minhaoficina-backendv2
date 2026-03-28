import { Elysia, HTTPMethod, t } from "elysia";
import type { NoteRepository } from "../../infra/repository/note/NoteRepository";
import { MakeNote } from "../../domain/usecases/note/MakeNote";
import { CustomerRepository } from "../../infra/repository/customer/CustomerRepository";
import { GetAllNotes } from "../../domain/usecases/note/GetAllNotes";
import { DatabaseConnection, PgPromiseAdapter } from "../../infra/database/PgPromiseAdapter";
import { authMiddleware } from "../../middlewares/authMiddleware";

class NoteController {

  constructor(
    readonly app: Elysia,
    readonly noteRepository: NoteRepository,
    readonly customerRepository: CustomerRepository,
    readonly connection: DatabaseConnection
  ) { }

  async save() {
    this.app.post('/notes/:business_id', async ({ body, params, set }) => {
      try {
        const { business_id } = params;
        const {
          email,
          name,
          cpf,
          phone,
          model,
          kilometer,
          plate,
          observation,
          date,
        } = body as {
          email: string,
          name: string,
          cpf: string,
          phone: string,
          model: string,
          kilometer: number,
          plate: string,
          observation: string,
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
        console.log(inputMakeNote);
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

}

export { NoteController }

