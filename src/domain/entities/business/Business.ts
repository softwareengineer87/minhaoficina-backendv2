import { Email } from '../../Email';
import { Password } from '../../Password';
import { sign, verify } from 'jsonwebtoken';

class Business {

  private email: Email;
  password: Password;

  constructor(
    readonly businessId: string,
    readonly name: string,
    email: string,
    password: string,
  ) {
    if (name === '') {
      throw new Error('O nome é obrigatório.');
    }
    if (email === '') {
      throw new Error('O e-mail é obrigatório.');
    }
    if (password === '') {
      throw new Error('A senha é obrigatória.');
    }
    this.email = new Email(email);
    this.password = new Password(password);
  }

  static create(
    name: string,
    email: string,
    password: string,
  ) {
    const businessId = crypto.randomUUID();
    return new Business(
      businessId,
      name,
      email,
      password,
    );
  }

  generateToken() {
    const payload = {
      businessId: this.businessId,
      name: this.name,
      email: this.email.getValue(),
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

  getPassword() {
    return this.password;
  }

}

export { Business }

