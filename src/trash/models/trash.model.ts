import { BaseModel, schemaOptions } from '../../shared/base.module';

import { ModelType , prop } from 'typegoose';
import { TrashType } from './trash-type.enum';

export class Trash extends BaseModel<Trash> {
 @prop({ required: [true, 'Content is required']})
  quantity: number;
 @prop({enum: TrashType})
  type: TrashType;
 @prop({default: false})
  idUser: string;
 @prop({default: false})
 idCollector: string;
 @prop({default: false})
 region: string;

 static get model(): ModelType<Trash> {
   return new Trash().getModelForClass(Trash, {schemaOptions});
 }
  static get modelName(): string {
   return this.model.modelName;
  }
}
