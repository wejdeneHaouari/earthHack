
import { ApiModelProperty, ApiModelPropertyOptional} from '@nestjs/swagger';
export class ProductParams {
  @ApiModelProperty() name: string;

  @ApiModelProperty() companyId: string;

  @ApiModelProperty() description: string;

  @ApiModelProperty() price: number;

  @ApiModelProperty() points: number;
}
