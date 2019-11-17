import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { BaseModelVm } from '../../../shared/base.module';

export class TakeTrashParams  {
  @ApiModelProperty() trashId: string;
  @ApiModelPropertyOptional() collectorId: string;
}
