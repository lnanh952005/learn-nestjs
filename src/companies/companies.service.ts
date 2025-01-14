import { Injectable } from '@nestjs/common';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company} from './schemas/company.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import aqp from 'api-query-params';

@Injectable()
export class CompaniesService {

  constructor(@InjectModel(Company.name) private companyModel: Model<Company>) {}

  async create(createCompanyDto: CreateCompanyDto) {
    try {
      return await this.companyModel.create(createCompanyDto);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(page: number,limit: number,query) { 
    const {filter,sort,projection,population} = aqp(query);
    delete query.page;
    const skip = (page - 1) * limit;
    const totalItems = (await this.companyModel.find(filter)).length;
    const totalpages = Math.ceil(totalItems/limit);
    const result =  await this.companyModel 
    .find(filter).skip(skip).limit(limit).populate(population).sort(sort as any).exec();
    return {
      meta: {
        page,limit,totalpages,totalItems
      },
      result
    }
  }

  async findOneById(id: string) {
    return await this.companyModel.findOne({_id: id});
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    return await this.companyModel.updateOne({_id: id},updateCompanyDto);
  }

  async remove(id: string) {
    return await this.companyModel.deleteOne({_id: id});
  }
}
