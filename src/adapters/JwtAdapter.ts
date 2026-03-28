import { sign, verify } from 'jsonwebtoken';
class JwtAdapter {

  generateToken(payload: {}) {
    const token = sign(payload, 'webdesign', { algorithm: 'HS256' });
    return token;
  }

  verifyToken(token: string) {
    return verify(token, 'webdesign');
  }

}

export { JwtAdapter }
