import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiOkResponse, ApiCreatedResponse,  ApiBadRequestResponse , ApiImplicitQuery } from '@nestjs/swagger';
import { Collector } from './models/collector.model';
import { CollectorService } from './collector.service';
import { CollectorVm } from './models/view-model/collector-vm.model';
import { promises } from 'fs';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { map } from 'lodash';
import { CollectorParams } from './models/view-model/collector-params.model';
import { isArray } from 'util';
import { ToBooleanPipe } from '../shared/pipes/to-boolean.pipe';
import { EnumToArray } from '../shared/utilities/enum-to-array';
import { TrashVm } from '../trash/models/view-model/trash-vm.model';
import { TakeTrashParams } from '../trash/models/view-model/take-trash-params';




@Controller('collectors')
@ApiUseTags(Collector.modelName)
export class CollectorController {
  constructor(private readonly collectorService: CollectorService){}

  @Post()
  @ApiCreatedResponse({ type: CollectorVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Collector.modelName, 'Create'))
  async create(@Body() params: CollectorParams): Promise<CollectorVm> {
    try {
      const exist = await this.collectorService.createCollector(params);
      return this.collectorService.map<CollectorVm>(exist);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  @Post('take-trash')
  @ApiCreatedResponse({ type: TrashVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Collector.modelName, 'Take trash'))
  async takeTrash(@Body() params: TakeTrashParams): Promise<TrashVm> {
    try {
      return this.collectorService.takeTrash(params.trashId, params.collectorId);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOkResponse({ type: CollectorVm, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Collector.modelName, 'GetAll'))
  @ApiImplicitQuery({ name: 'name', required: false })
  async get(
    @Query('name') name?: string,
  ): Promise<CollectorVm[]> {
    let filter = {};

    if (name) {
      filter['name'] = name;
    }

    try {
      const collectors = await this.collectorService.findAll(filter);
      return this.collectorService.map<CollectorVm[]>(map(collectors, collector => collector.toJSON()));
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @ApiResponse({ status: HttpStatus.CREATED, type: CollectorVm})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException})
  @ApiOperation(GetOperationId(Collector.modelName, 'Update'))
  async update(@Body() vm: CollectorVm): Promise<CollectorVm> {
    const { id, firstName , lastName, phone, address, email } = vm;
    if (!vm || !id) {
      throw new HttpException(`Missing parameters`, HttpStatus.BAD_REQUEST);
    }
    const exist = await this.collectorService.findById(id);

    if (!exist) {
      throw new HttpException(`${id} Not Found`, HttpStatus.NOT_FOUND);
    }
    exist.firstName = firstName;
    exist.lastName = lastName;
    exist.phone = phone;
    exist.address = address;
    exist.email = email;

    try {
      const updated = await this.collectorService.update(id, exist);
      return this.collectorService.map<CollectorVm>(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: CollectorVm})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException})
  @ApiOperation(GetOperationId(Collector.modelName, 'Delete'))
  async delete(@Param('id') id: string): Promise<CollectorVm> {
    try {
      const deleted = await this.collectorService.delete(id);
      return this.collectorService.map<CollectorVm>(deleted.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }
}
