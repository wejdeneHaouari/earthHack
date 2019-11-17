import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../shared/base.service';
import { Collector } from './models/collector.model';
import { ModelType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { CollectorParams } from './models/view-model/collector-params.model';
import { LitterService } from '../litter/litter.service';
import { LitterVm } from '../litter/models/view-model/litter-vm.model';


@Injectable()
export class CollectorService extends BaseService<Collector> {
  constructor(
    @InjectModel(Collector.modelName) private readonly collectorModel: ModelType<Collector>,
    private readonly mapperService: MapperService,
   // @Inject(forwardRef(() => LitterService))
   // private readonly litterService: LitterService,
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

/*  async takeLitter(litterId: string, collectorId: string): Promise<LitterVm> {
    const exist = await this.litterService.findById(litterId);

    if (!exist) {
      throw new HttpException(`${litterId} Not Found`, HttpStatus.NOT_FOUND);
    }
    exist.collectorId = collectorId;

    try {
      const updated = await this.litterService.update(litterId, exist);
      return this.litterService.map<LitterVm>(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }*/
}
