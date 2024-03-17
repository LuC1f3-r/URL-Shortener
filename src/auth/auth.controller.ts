import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { body } from 'express-validator';
import { userInfo } from 'os';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body() body: { username: string; password: string },
  ): Promise<{ token: string }> {
    return this.authService.register(body.username, body.password);
  }

  @Post('login')
  async login(
    @Body() body: { username: string; password: string },
  ): Promise<{ token: string }> {
    // return this.authService.login(body.username, body.password);
    const user = await this.validateUser(body.username, body.password);
    if (!user) throw new Error('Invalid credentials');
    const token = await this.authService.generateToken({
      sub: user.userId,
      username: user.username,
    });
    return { token };
  }

  async validateUser(
    username: string,
    password: string,
  ): Promise<{ userId: string; username: string } | null> {
    const user = await this.authService.validateUser(username, password);
    if (user == null || user == undefined) {
      return null;
    } 
    // return { message: 'success', ...user };
  }
}
