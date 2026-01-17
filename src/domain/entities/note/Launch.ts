import { Part } from "./Part";
import { v4 as uuidv4 } from 'uuid';

class Launch {

  launchId: string;
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
    launchId: string,
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
    this.launchId = launchId;
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
    const launchId = uuidv4();
    return new Launch(
      launchId,
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

export { Launch }

