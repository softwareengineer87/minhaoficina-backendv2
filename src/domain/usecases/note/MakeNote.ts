import type { NoteRepository } from "../../../infra/repository/note/NoteRepository";
import { Note } from "../../entities/note/Note";

class MakeNote {

  constructor(readonly noteRepository: NoteRepository) { }

  async execute(input: Input): Promise<Output> {
    const note = Note.create(
      input.businessId,
      input.name,
      input.date,
      input.tel,
      input.cpf,
      input.model,
      input.kilometer,
      input.plate,
      input.observation,
    );

    await this.noteRepository.save(note);
    return {
      noteId: note.noteId
    }
  }

}

type Input = {
  businessId: string;
  name: string;
  date: string;
  tel: string;
  cpf: string;
  model: string;
  kilometer: number;
  plate: string;
  observation: string;
}

type Output = {
  noteId: string;
}

export { MakeNote }

