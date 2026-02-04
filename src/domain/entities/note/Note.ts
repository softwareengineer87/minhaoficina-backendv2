import { Part } from "./Part";

class Note {

  noteId: string;
  businessId: string;
  customerId: string;
  model: string;
  kilometer: number;
  plate: string;
  observation: string;
  date: string;
  parts: Part[];

  constructor(
    noteId: string,
    businessId: string,
    customerId: string,
    model: string,
    kilometer: number,
    plate: string,
    observation: string,
    date: string,
  ) {
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
    this.customerId = customerId;
    this.model = model;
    this.kilometer = kilometer;
    this.plate = plate;
    this.observation = observation;
    this.date = date;
    this.parts = [];
  }

  static create(
    businessId: string,
    customerid: string,
    model: string,
    kilometer: number,
    plate: string,
    observation: string,
    date: string
  ) {
    const noteId = crypto.randomUUID();
    return new Note(
      noteId,
      businessId,
      customerid,
      model,
      kilometer,
      plate,
      observation,
      date
    );
  }

  addPart(part: Part) {
    this.parts.push(part);
  }

}

export { Note }

