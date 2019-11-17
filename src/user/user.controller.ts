import { Body, Controller, HttpException, HttpStatus, Post, UseGuards , Request, Req} from '@nestjs/common';
import { LitterVm } from '../litter/models/view-model/litter-vm.model';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { Litter } from '../litter/models/litter.model';
import { LitterParams } from '../litter/models/view-model/litter-params.model';
import { ApiUseTags, ApiResponse, ApiOperation, ApiOkResponse, ApiCreatedResponse,  ApiBadRequestResponse , ApiImplicitQuery } from '@nestjs/swagger';
import { LitterService } from '../litter/litter.service';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserVm } from './models/view-models/user-vm.model';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
             /* private readonly litterService: LitterService*/) {}
/*  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({ type: LitterVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Litter.modelName, 'takeOfLitter'))
  async takeOfLitter(@Body() params: LitterParams, @Request() req): Promise<LitterVm> {
    try {
      const currentUser: UserVm = req.user;
      const newLitter = await this.userService.takeOfLitter(params, currentUser.id);
      return this.litterService.map<LitterVm>(newLitter);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }*/
}
