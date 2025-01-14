import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/publicDecorator';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { ResponseMessage } from 'src/decorators/responseMessage';
import { RegisterUserDto } from 'src/users/dtos/create-user.dto';
import {Request, Response} from 'express';
import { ConfigService } from '@nestjs/config';
const ms = require('ms');

@Controller('/auth')
export class AuthController {
  constructor(private authService: AuthService,private configService: ConfigService) {}

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  @ResponseMessage('login')
  login(@Req() req, @Res({ passthrough: true }) res) {
    return this.authService.login(req.user,res);
  }

  @Post('/register')
  @Public()
  @ResponseMessage('register a user')
  register(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.register(registerUserDto);
  }

  @Post('/logout')
  @ResponseMessage('logout')
  logout(@Req() req: Request) {
    return 'hello';
  }

  @UseGuards(JwtAuthGuard)
  @Get('/jwt')
  getProfile(@Req() req) {
    return req.user;
  }
}
