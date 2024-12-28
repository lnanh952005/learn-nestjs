import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { Model } from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  checkPassword = (passwordLogin: string,encodedPassword: string) => {
    const match = compareSync(passwordLogin,encodedPassword);
    return match;
  }

  // async login(username: string,password: string):Promise<object>{
  //   try {
  //     const user = await this.userModel.findOne({ username: username });
  //     if(user == null){
  //       return null;
  //     }
  //     const match = compareSync(password, user.password);
  //     if(match){
  //       const { password, ...result } = user;
  //       return result;
  //     }
  //     return null;
  //   } catch (error) {
  //     console.log('ERROR =>>>>>>>>>', error);
  //   }
  // }

  async create(createUserDto: CreateUserDto) {
    try {
      const hashPassword = this.getHashPassword(createUserDto.password);
      createUserDto.password = hashPassword;
      const user = await this.userModel.create(createUserDto);
      return user;
    } catch (error) {
      console.log('ERROR =>>>>>>>>>', error);
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string) {
    try {
      return await this.userModel.findOne({ _id: id });
    } catch (error) {
      console.log('ERROR =>>>>>>>>>', error);
    }
  }

  async findOneByUsername(username: string) {
    try {
      return await this.userModel.findOne({username: username});
    } catch (error) {
      console.log('ERROR =>>>>>>>>>', error);
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    try {
      return await this.userModel.updateOne({ _id: id }, updateUserDto);
    } catch (error) {
      console.log('ERROR =>>>>>>>>>', error);
    }
  }

  async remove(id: string) {
    return await this.userModel.deleteOne({ _id: id });
  }
}
