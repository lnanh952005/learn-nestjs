import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { IUser } from 'src/users/users.interface';
import { RegisterUserDto } from 'src/users/dtos/create-user.dto';
import { ConfigService } from '@nestjs/config';
import { Response } from 'express';
const ms = require('ms');

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
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

  async login(user: IUser,res: Response) {
    const { _id, fullname, username, role } = user;
    const payload = {
      sub: 'access_token',
      iss: 'from server',
      _id,
      fullname,
      username,
      role,
    };
    const access_token = this.jwtService.sign(payload);
    const refresh_token = this.createRefreshToken(payload);
    //update refreshtoken in DB
    this.usersService.updateRefreshToken(_id, refresh_token);
    
    res.cookie('refresh_token', refresh_token, {
      maxAge: ms(this.configService.get<string>('JWT_REFRESH_EXPIRE')),
      httpOnly: true,
      secure: true,
    });
    //set cookie
    return {
      access_token,
      user: { _id, fullname, username, role },
    };
  }

  createRefreshToken = (payload: any) => {
    payload.sub = 'refresh_token';
    const refresh_token = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET_KEY'),
      expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRE'),
    });
    return refresh_token;
  };

  async register(registerUserDto: RegisterUserDto) {
    const user = await this.usersService.register(registerUserDto);
    return user;
  }
}
