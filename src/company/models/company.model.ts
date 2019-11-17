import { BaseModel, schemaOptions } from '../../shared/base.module';
import { ModelType , prop } from 'typegoose';

export class Company extends BaseModel<Company> {

@prop({ required: true})
 name: string;

@prop({default: false})
 phone: string;

@prop({default: false})
 website: string;

static get model(): ModelType<Company> {
   return new Company().getModelForClass(Company, {schemaOptions});
 }
  static get modelName(): string {
   return this.model.modelName;
  }
}
