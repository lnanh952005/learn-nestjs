import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user) {
      const isPasswordMatch = this.usersService.checkPassword(
        pass,
        user.password,
      );
      return isPasswordMatch ? user : null;
    }
    return null;
  }

  async login(user: any) {
    const {password,...payload} = user._doc;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
