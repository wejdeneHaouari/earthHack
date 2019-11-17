import { ApiModelProperty } from '@nestjs/swagger';
import { BaseModel, BaseModelVm } from '../../../shared/base.module';
import { prop } from 'typegoose';

export class CompanyVm extends BaseModelVm {

 @ApiModelProperty() name: string;

 @ApiModelProperty() phone: string;

 @ApiModelProperty() website: string;
}

