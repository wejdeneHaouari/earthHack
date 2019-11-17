import { BaseModel, schemaOptions } from '../../shared/base.module';
import { ModelType , prop } from 'typegoose';

export class Point extends BaseModel<Point> {
 @prop({ required: true})
  value: number;

 @prop({ required: true})
 userId: string;


 static get model(): ModelType<Point> {
   return new Point().getModelForClass(Point, {schemaOptions});
 }
  static get modelName(): string {
   return this.model.modelName;
  }
}
