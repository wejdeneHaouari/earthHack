import { ApiModelProperty } from '@nestjs/swagger';
import { BaseModel, BaseModelVm } from '../../../shared/base.module';


export class PointVm extends BaseModelVm {
  @ApiModelProperty() value: number;
  @ApiModelProperty() userId: string;
}

