import { sign, verify } from 'jsonwebtoken';
import { Email } from '../../Email';

class Customer {

  private email: Email;
  private name: string;
  private cpf: string;
  private phone: string;

  constructor(
    readonly customerId: string,
    email: string,
    name: string,
    cpf: string,
    phone: string,
  ) {
    this.email = new Email(email);
    this.name = name;
    this.cpf = cpf;
    this.phone = phone;
  }

  static create(
    email: string,
    name: string,
    cpf: string,
    phone: string,
  ) {
    const businessId = crypto.randomUUID();
    return new Customer(
      businessId,
      email,
      name,
      cpf,
      phone,
    );
  }

  generateToken() {
    const payload = {
      customerId: this.customerId,
      name: this.name,
      email: this.email.getValue(),
      phone: this.phone,
    }
    const token = sign(payload, 'webdesign', { algorithm: 'HS256' });
    return token;
  }

  verifyToken(token: string) {
    return verify(token, 'webdesign');
  }

  getEmail() {
    return this.email.getValue();
  }

  getName() {
    return this.name;
  }

  getCPF() {
    return this.cpf;
  }

  getPhone() {
    return this.phone;
  }

  // getPassword() {
  // return this.password.getValue();
  // }

}

export { Customer }

