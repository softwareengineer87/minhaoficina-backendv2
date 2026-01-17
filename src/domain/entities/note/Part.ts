import { v4 as uuidv4 } from 'uuid';
class Part {

  partId: string;
  launchId: string;
  name: string;
  price: number;

  constructor(
    partId: string,
    launchId: string,
    name: string,
    price: number
  ) {
    if (launchId === '' || launchId === undefined) {
      throw new Error('Cadastre o lancamento primeiro.');
    }
    if (name === '') {
      throw new Error('O nome e origatorio.');
    }
    if (String(price) === '') {
      throw new Error('O preco e obrigatorio.');
    }
    this.partId = partId;
    this.launchId = launchId;
    this.name = name;
    this.price = price;
  }

  static create(launchId: string, name: string, price: number) {
    const partId = uuidv4();
    return new Part(
      partId,
      launchId,
      name,
      price
    );
  }

}

export { Part }

