import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import config from '../config/env';

export interface JwtToken {
  sub: string;
}

export default class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(sub: string): string {
    return jwt.sign({ sub }, config.SECRET_KEY as string, {
      expiresIn: '20000000',
    });
  }

  public static decodeToken(token: string): JwtToken {
    return jwt.verify(token, config.SECRET_KEY as string) as JwtToken;
  }
}
