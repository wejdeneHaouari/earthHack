
import { ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
export class PointParams {

  constructor(value: number, userId: string) {
    this.value = value;
    this.userId = userId;
  }

  @ApiModelProperty()
  value: number;
  @ApiModelProperty()
  userId: string;
}
