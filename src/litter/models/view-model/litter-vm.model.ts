import { ApiModelProperty } from '@nestjs/swagger';
import { BaseModel, BaseModelVm } from '../../../shared/base.module';

import { TrashStatus } from '../../../trash/models/trash-status.enum';
import { LitterStatus } from '../litter-type.enum';

export class LitterVm extends BaseModelVm {
  @ApiModelProperty() quantity: number;
  @ApiModelProperty() region?: number;
  @ApiModelProperty() collectorId: string;
  @ApiModelProperty({ enum: LitterStatus })
  status: LitterStatus;
}

