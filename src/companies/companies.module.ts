import { Module } from '@nestjs/common';
import { CompaniesService } from './companies.service';
import { CompaniesController } from './companies.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, companySchema } from './schemas/company.schema';

@Module({
  imports:[MongooseModule.forFeature([{name: Company.name,schema: companySchema}])],
  controllers: [CompaniesController],
  providers: [CompaniesService]
})
export class CompaniesModule {}
