import { BaseModel, schemaOptions } from '../../shared/base.module';
import { ModelType , prop } from 'typegoose';

export class Product extends BaseModel<Product> {

 @prop({ required: true})
  name: string;

 @prop({ required: true})
  companyId: string;

 @prop({default: false})
  description: string;

 @prop({default: false})
 price: number;

 @prop({default: false})
 points: number;

 static get model(): ModelType<Product> {
   return new Product().getModelForClass(Product, {schemaOptions});
 }
  static get modelName(): string {
   return this.model.modelName;
  }
}
