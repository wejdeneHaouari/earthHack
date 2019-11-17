import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../shared/base.service';
import { Trash } from './models/trash.model';
import { TrashModule } from './trash.module';
import { ModelType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { TrashParams } from './models/view-model/trash-params.model';

@Injectable()
export class TrashService extends BaseService<Trash> {
  constructor(
    @InjectModel(Trash.modelName) private readonly trashModel: ModelType<Trash>,
    private readonly mapperService: MapperService,
  ) {
    super();
    this._model = trashModel;
    this._mapper = mapperService.mapper;
  }

  async createTrash(params: TrashParams): Promise<Trash> {
    const { quantity, type, idUser, idCollector, region} = params;
    const newTrash = new this._model();
    newTrash.quantity = quantity;

    if (type) {
      newTrash.type = type;
    }
    if (idUser) {
      newTrash.idUser = idUser;
    }
    if (idCollector) {
      newTrash.idCollector = idCollector;
    }
    if (region) {
      newTrash.region = region;
    }
    try {
      const result = await this.create(newTrash);
      return result.toJSON() as Trash;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
