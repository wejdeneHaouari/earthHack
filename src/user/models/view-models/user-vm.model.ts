import { ApiModelProperty, ApiModelPropertyOptional } from '@nestjs/swagger';
import { UserRole } from '../user-role.enum';
import { BaseModelVm } from '../../../shared/base.module';

export class UserVm extends BaseModelVm {
  @ApiModelProperty() username: string;
  @ApiModelPropertyOptional() firstName?: string;
  @ApiModelPropertyOptional() lastName?: string;
  @ApiModelPropertyOptional() fullName?: string;
  @ApiModelPropertyOptional({ enum: UserRole })
  @ApiModelPropertyOptional({ example: '99999999' })
  phone?: string;
  @ApiModelPropertyOptional({ example: 'Doe' })
  address?: string;
  @ApiModelPropertyOptional({ example: 'tunisie' })
  country?: string;
  @ApiModelPropertyOptional({ example: 'tunis' })
  region?: string;
  @ApiModelPropertyOptional({ example: 'Doe@gmail.com' })
  email?: string;
  role?: UserRole;
}
