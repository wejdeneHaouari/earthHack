import { ApiModelProperty } from '@nestjs/swagger';
import { BaseModel, BaseModelVm } from '../../../shared/base.module';
import { Trash } from '../trash.model';
import { TrashType } from '../trash-type.enum';

export class TrashVm extends BaseModelVm {
  @ApiModelProperty() quantity: number;
  @ApiModelProperty({ enum: TrashType })
  type: TrashType;
  @ApiModelProperty() idUser: string;
  @ApiModelProperty() idCollector: string;
  @ApiModelProperty() region: string;
}

