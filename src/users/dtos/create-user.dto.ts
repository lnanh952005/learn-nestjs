import { DefaultValuePipe } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  MinLength,
  ValidateNested,
} from 'class-validator';
import mongoose from 'mongoose';

class Company {
  @IsNotEmpty()
  _id: mongoose.Schema.Types.ObjectId;

  @IsNotEmpty()
  name: string;
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  fullname: string;

  age: number;

  phone: number;

  address: string;

  @IsNotEmpty()
  role: string;

  @IsNotEmptyObject()
  @IsObject()
  @ValidateNested()
  @Type(() => Company)
  company: Company;

  createdAt: Date;

  updatedAt: Date;

  createdBy: string;

  updatedBy: string;
}

export class RegisterUserDto {
  @IsEmail()
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  fullname: string;

  age: number;

  phone: number;

  address: string;

  role: string;
}
