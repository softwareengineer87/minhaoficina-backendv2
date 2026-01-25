import { Elysia, t } from "elysia";
import type { NoteRepository } from "../../infra/repository/note/NoteRepository";
import { MakeNote } from "../../domain/usecases/note/MakeNote";

class NoteController {

  constructor(readonly app: Elysia, readonly noteRepository: NoteRepository) { }

  async save() {
    this.app.post('/notes/:business_id', async ({ body, params, set }) => {
      try {
        const { business_id } = params;
        const {
          name,
          date,
          tel,
          cpf,
          model,
          kilometer,
          plate,
          observation
        } = body;
        const inputMakeNote = {
          businessId: business_id,
          name,
          date,
          tel,
          cpf,
          model,
          kilometer,
          plate,
          observation
        }
        const makeNote = new MakeNote(this.noteRepository);
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
    }, {
      body: t.Object({
        name: t.String(),
        date: t.String(),
        tel: t.String(),
        cpf: t.String(),
        model: t.String(),
        kilometer: t.Number(),
        plate: t.String(),
        observation: t.String()
      }),
      params: t.Object({
        business_id: t.String()
      })
    })
  }

}

export { NoteController }

