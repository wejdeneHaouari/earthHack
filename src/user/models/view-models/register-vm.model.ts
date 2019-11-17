import { ApiModelPropertyOptional } from '@nestjs/swagger';
import { LoginVm } from './login-vm.model';
import { prop } from 'typegoose';

export class RegisterVm extends LoginVm {
  @ApiModelPropertyOptional({ example: 'John' })
  firstName?: string;

  @ApiModelPropertyOptional({ example: 'Doe' })
  lastName?: string;

  @ApiModelPropertyOptional({ example: '99999999' })
   phone?: string;
  @ApiModelPropertyOptional({ example: 'Doe' })
   address?: string;
   @ApiModelPropertyOptional({ example: 'Doe@gmail.com' })
   email?: string;
  @ApiModelPropertyOptional({ example: 'tunisie' })
  country?: string;
  @ApiModelPropertyOptional({ example: 'tunis' })
  region?: string;
}
