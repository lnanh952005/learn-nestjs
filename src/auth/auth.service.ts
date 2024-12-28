import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByUsername(username);
    if (user == null) {
      return null;
    }
    const match = this.usersService.checkPassword(password, user.password);
    if (match) {
      return user;
    }
    return null;
  }

  async login(user: any) {
    const {password, ...payload} = user._doc;
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
