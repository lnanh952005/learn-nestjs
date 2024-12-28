import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

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
}
