import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../shared/base.service';
import { Collector } from './models/collector.model';
import { ModelType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { CollectorParams } from './models/view-model/collector-params.model';
import { TrashService } from '../trash/trash.service';
import { TrashVm } from '../trash/models/view-model/trash-vm.model';


@Injectable()
export class CollectorService extends BaseService<Collector> {
  constructor(
    @InjectModel(Collector.modelName) private readonly collectorModel: ModelType<Collector>,
    private readonly mapperService: MapperService,
    private readonly trashService: TrashService,
  ) {
    super();
    this._model = collectorModel;
    this._mapper = mapperService.mapper;
  }

  async createCollector(params: CollectorParams): Promise<Collector> {
    const { firstName , lastName, phone, address, email } = params;
    const newCollector = new this._model();
    newCollector.firstName = firstName;
    newCollector.lastName = lastName;
    newCollector.phone = phone;
    newCollector.address = address;
    newCollector.email = email;
    try {
      const result = await this.create(newCollector);
      return result.toJSON() as Collector;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

 async takeTrash(trashId: string, collectorId: string): Promise<TrashVm> {
    const exist = await this.trashService.findById(trashId);

    if (!exist) {
      throw new HttpException(`${trashId} Not Found`, HttpStatus.NOT_FOUND);
    }
    exist.idCollector = collectorId;

    try {
      const updated = await this.trashService.update(trashId, exist);
      return this.trashService.map<TrashVm>(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
