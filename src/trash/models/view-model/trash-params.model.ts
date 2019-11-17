
import { ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import { TrashType } from '../trash-type.enum';
import { TrashStatus } from '../trash-status.enum';
export class TrashParams {
  @ApiModelProperty()
  quantity: number;
  @ApiModelPropertyOptional({ enum: TrashType, example: TrashType.plastic})
  type?: TrashType;
  @ApiModelPropertyOptional({ enum: TrashStatus, example: TrashStatus.request})
  status?: TrashStatus;
  @ApiModelProperty() idUser: string;
  @ApiModelProperty() idCollector: string;
  @ApiModelProperty() region: string;
}
