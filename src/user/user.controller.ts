import { Body, Controller, HttpException, HttpStatus, Post, UseGuards , Request, Req} from '@nestjs/common';
import { TrashVm } from '../trash/models/view-model/trash-vm.model';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { Trash } from '../trash/models/trash.model';
import { TrashParams } from '../trash/models/view-model/trash-params.model';
import { ApiUseTags, ApiResponse, ApiOperation, ApiOkResponse, ApiCreatedResponse,  ApiBadRequestResponse , ApiImplicitQuery } from '@nestjs/swagger';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import { UserVm } from './models/view-models/user-vm.model';
import { TrashService } from '../trash/trash.service';
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService,
              private readonly trashService: TrashService) {}
 @Post('take-of-trash')
  @ApiCreatedResponse({ type: TrashVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Trash.modelName, 'takeOfTrash'))
  async takeOfTrash(@Body() params: TrashParams): Promise<TrashVm> {
    try {
      const newTrash = await this.userService.takeOfTrash(params, params.idUser);
      return this.trashService.map<TrashVm>(newTrash);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
