
import { Company } from 'src/companies/schemas/company.schema';
import { IsNotEmpty, MinLength } from 'class-validator';

export class UpdateUserDto {
   
      username: string;
    
      @IsNotEmpty()
      @MinLength(6)
      password: string;
    
      fullname: string;
    
      age: number;
    
      phone: number;
    
      address: string;

      role: string;
      
      company: Company;
    
      createdAt: Date;
    
      updatedAt: Date;
    
      createdBy: string;
    
      updatedBy: string;
    
}
