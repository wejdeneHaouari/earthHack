import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../shared/base.service';
import { Point } from './models/point.model';
import { PointModule } from './point.module';
import { ModelType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { PointParams } from './models/view-model/point-params.model';

@Injectable()
export class PointService extends BaseService<Point> {
  constructor(
    @InjectModel(Point.modelName) private readonly pointModel: ModelType<Point>,
    private readonly mapperService: MapperService,
  ) {
    super();
    this._model = pointModel;
    this._mapper = mapperService.mapper;
  }

  async createPoint(params: PointParams): Promise<Point> {
    const { value } = params;
    const newPoint = new this._model();
    newPoint.value = value;
    newPoint.userId = params.userId;
    try {
      const result = await this.create(newPoint);
      return result.toJSON() as Point;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
