import { ApiModelProperty } from '@nestjs/swagger';

export class TakeLitterParams {
  @ApiModelProperty()
  litterId?: string;
  @ApiModelProperty() collectorId?: string;

}
