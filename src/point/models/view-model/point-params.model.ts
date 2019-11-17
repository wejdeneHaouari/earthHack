
import { ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
export class PointParams {
  @ApiModelProperty()
  value: number;
  @ApiModelProperty()
  userId: number;
}
