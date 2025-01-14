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

import * as qs from 'qs';
var assert = require('assert');

import { CompaniesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { ResponseMessage } from 'src/decorators/responseMessage';

@Controller('/companies')
export class CompaniesController {
  constructor(private companiesService: CompaniesService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companiesService.create(createCompanyDto);
  }

  @ResponseMessage('fetch all companies')
  @Get()
  findAll(@Query() queryString) {
    let { page, limit, ...query } = queryString;
    page = page ?? 1;
    limit = limit ?? 10;
    const qstring: any = qs.parse(queryString);
    console.log(qstring);
    return null;
    // return this.companiesService.findAll(+page, +limit, query);
  }

  @Get('/:id')
  findOneById(@Param('id') id: string) {
    return this.companiesService.findOneById(id);
  }

  @Patch('/:id')
  update(@Param('id') id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companiesService.update(id, updateCompanyDto);
  }

  @Delete('/:id')
  remove(@Param('id') id: string) {
    return this.companiesService.remove(id);
  }
  
}
