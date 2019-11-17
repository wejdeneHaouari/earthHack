import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../shared/base.service';
import { Litter } from './models/litter.model';
import { LitterModule } from './litter.module';
import { ModelType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { LitterParams } from './models/view-model/litter-params.model';

@Injectable()
export class LitterService extends BaseService<Litter> {
 /* constructor(
    @InjectModel(Litter.modelName) private readonly litterModel: ModelType<Litter>,
    private readonly mapperService: MapperService,
  ) {
    super();
    this._model = litterModel;
    this._mapper = mapperService.mapper;
  }

  async createLitter(params: LitterParams): Promise<Litter> {
    const { quantity, status, region } = params;
    const newLitter = new this._model();
    if (quantity) {
      newLitter.quantity = quantity;
    }
    if (status) {
      newLitter.status = status;
    }
    newLitter.region = region;

    try {
      const result = await this.create(newLitter);
      return result.toJSON() as Litter;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }*/
}
