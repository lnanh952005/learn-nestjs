import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, RegisterUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Public } from 'src/decorators/publicDecorator';
import { ResponseMessage } from 'src/decorators/responseMessage';
import { UserInfor } from 'src/decorators/userInformation';
import { IUser } from './users.interface';

@Controller('/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @ResponseMessage('create a user')
  create(@Body() createUserDto: CreateUserDto, @UserInfor() iUser: IUser) {
    return this.usersService.create(createUserDto,iUser);
  }

  @Get()
  @ResponseMessage('fetch all users')
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query() queryString: string,
  ) {
    page = page ?? '1';
    limit = limit ?? '10';

    return this.usersService.findAll(+page,+limit,queryString);
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto,@UserInfor() iUser: IUser) {
    return this.usersService.update(id, updateUserDto,iUser);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
