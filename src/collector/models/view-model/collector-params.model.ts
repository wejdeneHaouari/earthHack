import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { BaseModelVm } from '../../../shared/base.module';

export class CollectorParams  {
  @ApiModelProperty() username: string;
  @ApiModelPropertyOptional() firstName?: string;
  @ApiModelPropertyOptional() lastName?: string;
  @ApiModelPropertyOptional() fullName?: string;
  @ApiModelPropertyOptional({ example: '99999999' })
  phone?: string;
  @ApiModelPropertyOptional({ example: 'Doe' })
  address?: string;
  @ApiModelPropertyOptional({ example: 'Doe@gmail.com' })
  email?: string;
}
