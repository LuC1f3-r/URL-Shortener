import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  validateUser(_username: string, _password: string) {
    throw new Error('Method not implemented.');
  }
  register(
    _username: string,
    _password: string,
  ): { token: string } | PromiseLike<{ token: string }> {
    throw new Error('Method not implemented.');
  }
  constructor(private readonly jwtService: JwtService) {}

  async generateToken(payload: any): Promise<string> {
    return this.jwtService.sign(payload);
  }
}
