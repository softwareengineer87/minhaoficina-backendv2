import type { Note } from "../../../domain/entities/note/Note";
import type { DatabaseConnection } from "../../database/PgPromiseAdapter";

export interface NoteRepository {
  save(note: Note): Promise<void>;
  get(noteId: string): Promise<Note[]>;
}

class NoteRepositoryDatabase implements NoteRepository {

  constructor(readonly connection: DatabaseConnection) { }

  async save(note: Note): Promise<void> {
    await this.connection.query(`INSERT INTO notes 
    (note_id, business_id, customer_id, model,
    kilometer, plate, observation, date) 
    VALUES($1,$2,$3,$4,$5,$6,$7, $8)`, [note.noteId,
    note.businessId, note.customerId, note.model, note.kilometer,
    note.plate, note.observation, note.date]);
  }

  async get(noteId: string): Promise<Note[]> {
    const notes = await this.connection.query(`SELECT * FROM notes
    WHERE note_id = $1`, [noteId]);

    return notes;
  }
}

export { NoteRepositoryDatabase }

