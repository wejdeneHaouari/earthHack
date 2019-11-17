
import { ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
import { TrashType } from '../trash-type.enum';
import { TrashStatus } from '../trash-status.enum';
export class TakeTrashParams {
  @ApiModelProperty()
  trashId: string;
  @ApiModelProperty()
  collectorId: string;
}
