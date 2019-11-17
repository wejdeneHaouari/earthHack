
import { ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
export class CompanyParams {
  @ApiModelProperty() name: string;

  @ApiModelProperty() phone: string;

  @ApiModelProperty() website: string;
}
