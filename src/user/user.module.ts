import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { User } from './models/user.model';
import { schema } from 'typegoose/lib/data';
import {MongooseModule} from '@nestjs/mongoose';
import { TrashService } from '../trash/trash.service';
import { Trash } from '../trash/models/trash.model';
import { PointService } from '../point/point.service';
import { Point } from '../point/models/point.model';

@Module({
  imports: [MongooseModule.forFeature([{name: User.modelName, schema: User.model.schema}]),
    MongooseModule.forFeature([{name: Trash.modelName, schema: Trash.model.schema}]),
    MongooseModule.forFeature([{name: Point.modelName, schema: Point.model.schema}])],
  controllers: [UserController],
  providers: [UserService, TrashService, PointService],
  exports: [UserService],
})
export class UserModule {}
