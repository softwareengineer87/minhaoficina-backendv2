import { v4 as uuidv4 } from 'uuid';
class Service {

  constructor(
    readonly serviceId: string,
    readonly businessId: string,
    readonly serviceTitle: string,
    readonly price: number,
  ) {
    if (serviceTitle === '') {
      throw new Error('O titulo é obrigatório!');
    }
    if (price < 0 || price !== Number(price)) {
      throw new Error('O preço precisabser maior que zero e é origatório!');
    }
  }

  static create(
    businessId: string,
    serviceTitle: string,
    price: number,
  ) {
    const serviceId = uuidv4();
    return new Service(
      serviceId,
      businessId,
      serviceTitle,
      price,
    )
  }

}

export { Service }

