import { ApiModelProperty } from '@nestjs/swagger';
import { BaseModel, BaseModelVm } from '../../../shared/base.module';
import { prop } from 'typegoose';

export class ProductVm extends BaseModelVm {

 @ApiModelProperty() name: string;

 @ApiModelProperty() companyId: string;

  @ApiModelProperty() description: string;

  @ApiModelProperty() price: number;

  @ApiModelProperty() points: number;
}

