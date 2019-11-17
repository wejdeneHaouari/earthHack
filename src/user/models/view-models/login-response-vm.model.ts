import { ApiModelProperty } from '@nestjs/swagger';
import { UserVm } from './user-vm.model';

export class LoginResponseVm {
  @ApiModelProperty() token: string;

  @ApiModelProperty({ type: UserVm })
  user: UserVm;
   @ApiModelProperty({ type: String })
  phone?: string;
   @ApiModelProperty({ type: String  })
  address?: string;
   @ApiModelProperty({ type: String  })
  email?: string;
}
