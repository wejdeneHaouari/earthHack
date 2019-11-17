import { BaseModel, schemaOptions } from '../../shared/base.module';
import { ModelType, prop, Typegoose } from 'typegoose';
import { LitterService } from '../litter.service';
import { LitterStatus } from './litter-type.enum';

export class Litter extends Typegoose {
 @prop()
 id: string;
 @prop({ required: true})
 quantity: number;
 @prop({enum: LitterStatus, default: LitterStatus.request})
  status: LitterStatus;
 @prop({default: false})
 region?: string;
 @prop({default: false})
 collectorId?: string;

 static get model(): ModelType<Litter> {
   return new Litter().getModelForClass(Litter, {schemaOptions});
 }
  static get modelName(): string {
   return this.model.modelName;
  }
}
