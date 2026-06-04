import { randomUUIDv7 } from "bun";

class EntranceOS {

  private osId: string;
  private customerId: string;
  businessId: string;
  private email: string;
  private name: string;
  private cpf: string;
  private phone: string;
  private text: string;

  constructor(
    osId: string,
    customerId: string,
    businessId: string,
    email: string,
    name: string,
    cpf: string,
    phone: string,
    text: string
  ) {
    this.osId = osId;
    this.customerId = customerId;
    this.businessId = businessId;
    this.email = email;
    this.name = name;
    this.cpf = cpf;
    this.phone = phone;
    this.text = text;
  }

  static create(
    customerId: string,
    businessId: string,
    email: string,
    name: string,
    cpf: string,
    phone: string,
    text: string
  ) {
    const osId = randomUUIDv7();
    return new EntranceOS(
      osId,
      customerId,
      businessId,
      email,
      name,
      cpf,
      phone,
      text
    );
  }

  getOsId() {
    return this.osId;
  }

  getCustomerId() {
    return this.customerId;
  }

  getEmail() {
    return this.email;
  }

  getName() {
    return this.name;
  }

  getCpf() {
    return this.cpf;
  }

  getPhone() {
    return this.phone;
  }

  getText() {
    return this.text;
  }

}

export { EntranceOS }

