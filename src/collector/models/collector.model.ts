import { BaseModel, schemaOptions } from '../../shared/base.module';
import { ModelType , prop } from 'typegoose';
import { UserRole } from '../../user/models/user-role.enum';

export class Collector extends BaseModel<Collector> {
 @prop() firstName?: string;

 @prop() lastName?: string;

 @prop() phone?: string;

 @prop() address?: string;

 @prop() email?: string;

 @prop({ enum: UserRole, default: UserRole.Collector})
 role?: UserRole;

 static get model(): ModelType<Collector> {
   return new Collector().getModelForClass(Collector, {schemaOptions});
 }
  static get modelName(): string {
   return this.model.modelName;
  }
}
