import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiOkResponse, ApiCreatedResponse,  ApiBadRequestResponse , ApiImplicitQuery } from '@nestjs/swagger';
import { Trash } from './models/trash.model';
import { TrashService } from './trash.service';
import { TrashVm } from './models/view-model/trash-vm.model';
import { promises } from 'fs';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { map } from 'lodash';
import { TrashParams } from './models/view-model/trash-params.model';
import { TrashType } from './models/trash-type.enum';
import { isArray } from 'util';
import { ToBooleanPipe } from '../shared/pipes/to-boolean.pipe';
import { EnumToArray } from '../shared/utilities/enum-to-array';
import { TrashStatus } from './models/trash-status.enum';

@Controller('trashs')
@ApiUseTags(Trash.modelName)
export class TrashController {
  constructor(private readonly trashService: TrashService){}

  @Post()
  @ApiCreatedResponse({ type: TrashVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Trash.modelName, 'Create'))
  async create(@Body() params: TrashParams): Promise<TrashVm> {
    try {
      const newTrash = await this.trashService.createTrash(params);
      return this.trashService.map<TrashVm>(newTrash);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOkResponse({ type: TrashVm, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Trash.modelName, 'GetAll'))
  @ApiImplicitQuery({ name: 'type', enum: EnumToArray(TrashType), required: false, isArray: true })
  @ApiImplicitQuery({ name: 'status', enum: EnumToArray(TrashStatus), required: false, isArray: true })
  async get(
    @Query('type') type?: TrashType,
    @Query('status') status?: TrashStatus,
  ): Promise<TrashVm[]> {
    let filter = {};

    if (type) {
      filter['type'] = { $in: isArray(type) ? [...type] : [type] };
    }



    try {
      const trashs = await this.trashService.findAll(filter);
      return this.trashService.map<TrashVm[]>(map(trashs, trash => trash.toJSON()));
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @ApiResponse({ status: HttpStatus.CREATED, type: TrashVm})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException})
  @ApiOperation(GetOperationId(Trash.modelName, 'Update'))
  async update(@Body() vm: TrashVm): Promise<TrashVm> {
    const { id, quantity, type, idUser, idCollector, region, status}  = vm;
    if (!vm || !id) {
      throw new HttpException(`Missing parameters`, HttpStatus.BAD_REQUEST);
    }
    const exist = await this.trashService.findById(id);
    if (quantity) {
      exist.quantity = quantity;
    }
    if (type) {
      exist.type = type;
    }
    if (idUser) {
      exist.idUser = idUser;
    }
    if (idCollector) {
      exist.idCollector = idCollector;
    }
    if (region) {
      exist.idCollector = region;
    }
    if (status) {
      exist.status = status;
    }

    if (!exist) {
      throw new HttpException(`${id} Not Found`, HttpStatus.NOT_FOUND);
    }



    try {
      const updated = await this.trashService.update(id, exist);
      return this.trashService.map<TrashVm>(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: TrashVm})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException})
  @ApiOperation(GetOperationId(Trash.modelName, 'Delete'))
  async delete(@Param('id') id: string): Promise<TrashVm> {
    try {
      const deleted = await this.trashService.delete(id);
      return this.trashService.map<TrashVm>(deleted.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }
}
