import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiOkResponse, ApiCreatedResponse,  ApiBadRequestResponse , ApiImplicitQuery } from '@nestjs/swagger';
import { Company } from './models/company.model';
import { CompanyService } from './company.service';
import { CompanyVm } from './models/view-model/company-vm.model';
import { promises } from 'fs';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { map } from 'lodash';
import { CompanyParams } from './models/view-model/company-params.model';
import { isArray } from 'util';
import { ToBooleanPipe } from '../shared/pipes/to-boolean.pipe';
import { EnumToArray } from '../shared/utilities/enum-to-array';

@Controller('companys')
@ApiUseTags(Company.modelName)
export class CompanyController {
  constructor(private readonly companyService: CompanyService){}

  @Post()
  @ApiCreatedResponse({ type: CompanyVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Company.modelName, 'Create'))
  async create(@Body() params: CompanyParams): Promise<CompanyVm> {
    try {
      const newCompany = await this.companyService.createCompany(params);
      return this.companyService.map<CompanyVm>(newCompany);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOkResponse({ type: CompanyVm, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Company.modelName, 'GetAll'))
  @ApiImplicitQuery({ name: 'name', required: false })
  async get(
    @Query('name') name?: string,
  ): Promise<CompanyVm[]> {
    let filter = {};

    if (name) {
      filter['name'] = name;
    }

    try {
      const companies = await this.companyService.findAll(filter);
      return this.companyService.map<CompanyVm[]>(map(companies, company => company.toJSON()));
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @ApiResponse({ status: HttpStatus.CREATED, type: CompanyVm})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException})
  @ApiOperation(GetOperationId(Company.modelName, 'Update'))
  async update(@Body() vm: CompanyVm): Promise<CompanyVm> {
    const { id, name, phone, website }  = vm;
    if (!vm || !id) {
      throw new HttpException(`Missing parameters`, HttpStatus.BAD_REQUEST);
    }
    const exist = await this.companyService.findById(id);

    if (!exist) {
      throw new HttpException(`${id} Not Found`, HttpStatus.NOT_FOUND);
    }
    exist.name = name;
    exist.website = website;
    exist.phone = phone;

    try {
      const updated = await this.companyService.update(id, exist);
      return this.companyService.map<CompanyVm>(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CompanyVm})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException})
  @ApiOperation(GetOperationId(Company.modelName, 'Delete'))
  async delete(@Param('id') id: string): Promise<CompanyVm> {
    try {
      const deleted = await this.companyService.delete(id);
      return this.companyService.map<CompanyVm>(deleted.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }
}
