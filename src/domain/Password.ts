
class Password {
  value: string;

  constructor(password: string) {
    if (password === '') {
      throw new Error('A senha é obrigatória.');
    }
    this.value = password;
  }

  async emcryptPassword(plainPassword: string) {
    return await Bun.password.hash(plainPassword);
  }

  async decryptPassword(plainPassword: string, hashPassword: string) {
    return await Bun.password.verify(plainPassword, hashPassword);
  }

  getValue() {
    return this.value;
  }
}

export { Password }

