import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dtos/create-user.dto';
import { UpdateUserDto } from './dtos/update-user.dto';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { genSaltSync, hashSync, compareSync } from 'bcrypt';
import aqp from 'api-query-params';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  };

  checkPassword = (passwordLogin: string, encodedPassword: string) => {
    const match = compareSync(passwordLogin, encodedPassword);
    return match;
  };

  async register(registerUserDto: RegisterUserDto) {
    const isUsernameExist = await this.userModel.findOne({username: registerUserDto.username});
    if (isUsernameExist) {
      throw new BadRequestException(`username: ${registerUserDto.username} already existed`);
    }
    const hashPassword = this.getHashPassword(registerUserDto.password);
    registerUserDto.password = hashPassword; 
    registerUserDto.role = 'USER';
    const user = await this.userModel.create(registerUserDto);
    const {_id,username,createdAt} = user;
    return { _id, username,createdAt};
  }

  async create(createUserDto: CreateUserDto, iUser: IUser) {
    const isUsernameExist = await this.userModel.findOne({username: createUserDto.username,});
    if (isUsernameExist) {
      throw new BadRequestException('user already exist');
    }
    const hashPassword = this.getHashPassword(createUserDto.password);
    createUserDto.password = hashPassword;
    createUserDto.createdBy = iUser.username;
    return await this.userModel.create(createUserDto);
  }

  async findAll(page: number,limit: number,queryString: string) {
    const { filter, sort, projection, population } = aqp(queryString);
    delete filter.page;
    filter.deleted = false;
    const skip = (page - 1) * limit;
    const result = await this.userModel.find(filter).skip(skip).limit(limit).select('-password').sort(sort as any).populate(population).exec();
    const totalItems = (await this.userModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / limit);

    return {
      "meta": {page,limit,totalPages,totalItems},
      "result": result,
    };
  }

  async findOne(id: string) {
    return await this.userModel.findOne({ _id: id }, { deleted: false });
  }

  async findOneByUsername(username: string) {
    return await this.userModel.findOne({ username: username });
  }

  async update(id: string, updateUserDto: UpdateUserDto,iUser: IUser) {
    updateUserDto.updatedBy = iUser.username;
    return await this.userModel.updateOne({ _id: id }, updateUserDto);
  }

  async updateRefreshToken(id: string,refreshToken: string){
    return await this.userModel.updateOne({_id:id},{refreshToken});
  }

  async remove(id: string) {
    return await this.userModel.updateOne({_id: id},{deleted:true});
  }
}
