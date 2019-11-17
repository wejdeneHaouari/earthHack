import { Module } from '@nestjs/common';
import { PointService } from './point.service';
import { PointController } from './point.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Point} from './models/point.model';

@Module({
  imports: [MongooseModule.forFeature([{name: Point.modelName, schema: Point.model.schema}])],
  exports: [PointService],
  providers: [PointService],
  controllers: [PointController],
})
export class PointModule {}
