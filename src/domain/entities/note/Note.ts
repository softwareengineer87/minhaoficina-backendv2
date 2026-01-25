import { Part } from "./Part";

class Note {

  noteId: string;
  businessId: string;
  name: string;
  date: string;
  tel: string;
  cpf: string;
  model: string;
  kilometer: number;
  plate: string;
  observation: string;
  parts: Part[];

  constructor(
    noteId: string,
    businessId: string,
    name: string,
    date: string,
    tel: string,
    cpf: string,
    model: string,
    kilometer: number,
    plate: string,
    observation: string,
  ) {
    if (name === '' || name === undefined || name === null) {
      throw new Error('O nome é origatório.');
    }
    if (tel === '' || tel === undefined || tel === null) {
      throw new Error('O telefone é origatório.');
    }
    if (cpf === '' || cpf === undefined || cpf === null) {
      throw new Error('O cpf é origatório.');
    }
    if (model === '' || model === undefined || model === null) {
      throw new Error('O modelo é origatório.');
    }
    if (kilometer <= 0 || kilometer === undefined || kilometer === null) {
      throw new Error('A kilometragem é origatória.');
    }
    if (plate === '' || plate === undefined || plate === null) {
      throw new Error('A placa é origatória.');
    }
    this.noteId = noteId;
    this.businessId = businessId;
    this.name = name;
    this.date = date;
    this.tel = tel;
    this.cpf = cpf;
    this.model = model;
    this.kilometer = kilometer;
    this.plate = plate;
    this.observation = observation;
    this.parts = [];
  }

  static create(
    businessId: string,
    name: string,
    date: string,
    tel: string,
    cpf: string,
    model: string,
    kilometer: number,
    plate: string,
    observation: string,
  ) {
    const noteId = crypto.randomUUID();
    return new Note(
      noteId,
      businessId,
      name,
      date,
      tel,
      cpf,
      model,
      kilometer,
      plate,
      observation,
    );
  }

  addPart(part: Part) {
    this.parts.push(part);
  }

}

export { Note }

