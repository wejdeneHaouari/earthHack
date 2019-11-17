
import { ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import { TrashType } from '../trash-type.enum';
export class TrashParams {
  @ApiModelProperty()
  quantity: number;
  @ApiModelPropertyOptional({ enum: TrashType, example: TrashType.plastic})
  type?: TrashType;
  @ApiModelProperty() idUser: string;
  @ApiModelProperty() idCollector: string;
  @ApiModelProperty() region: string;
}
