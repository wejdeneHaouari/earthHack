import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../shared/base.service';
import { Company } from './models/company.model';
import { CompanyModule } from './company.module';
import { ModelType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { CompanyParams } from './models/view-model/company-params.model';

@Injectable()
export class CompanyService extends BaseService<Company> {
  constructor(
    @InjectModel(Company.modelName) private readonly companyModel: ModelType<Company>,
    private readonly mapperService: MapperService,
  ) {
    super();
    this._model = companyModel;
    this._mapper = mapperService.mapper;
  }

  async createCompany(params: CompanyParams): Promise<Company> {
    const { name, phone, website } = params;
    const newCompany = new this._model();
    newCompany.name = name;
    newCompany.phone = phone;
    newCompany.website = website;
    try {
      const result = await this.create(newCompany);
      return result.toJSON() as Company;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
