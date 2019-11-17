
import { ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import { LitterStatus } from '../litter-type.enum';
export class TakeLitterParams {
  @ApiModelProperty()
  litterId?: string;
  @ApiModelProperty() collectorId?: string;

}
