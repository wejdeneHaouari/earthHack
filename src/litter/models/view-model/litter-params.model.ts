
import { ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import { LitterStatus } from '../litter-type.enum';
export class LitterParams {
  @ApiModelProperty()
  quantity?: number;
  @ApiModelProperty() region?: string;
  @ApiModelPropertyOptional({ enum: LitterStatus, example: LitterStatus.request})
  status?: LitterStatus;
}
