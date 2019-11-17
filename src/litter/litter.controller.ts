import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiOkResponse, ApiCreatedResponse,  ApiBadRequestResponse , ApiImplicitQuery } from '@nestjs/swagger';
import { Litter } from './models/litter.model';
import { LitterService } from './litter.service';
import { LitterVm } from './models/view-model/litter-vm.model';
import { promises } from 'fs';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { map } from 'lodash';
import { LitterParams } from './models/view-model/litter-params.model';
import { isArray } from 'util';
import { ToBooleanPipe } from '../shared/pipes/to-boolean.pipe';
import { EnumToArray } from '../shared/utilities/enum-to-array';

@Controller('litters')
@ApiUseTags(Litter.modelName)
export class LitterController {
  constructor(private readonly litterService: LitterService){}

  @Post()
  @ApiCreatedResponse({ type: LitterVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Litter.modelName, 'Create'))
  async create(@Body() params: LitterParams): Promise<LitterVm> {
    try {
      const newLitter = await this.litterService.createLitter(params);
      return this.litterService.map<LitterVm>(newLitter);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOkResponse({ type: LitterVm, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Litter.modelName, 'GetAll'))
  async get(

  ): Promise<LitterVm[]> {
    let filter = {};


    try {
      const litters = await this.litterService.findAll();
      return this.litterService.map<LitterVm[]>(map(litters, litter => litter.toJSON()));
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @ApiResponse({ status: HttpStatus.CREATED, type: LitterVm})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException})
  @ApiOperation(GetOperationId(Litter.modelName, 'Update'))
  async update(@Body() vm: LitterVm): Promise<LitterVm> {
    const { id, quantity, status, region } = vm;
    if (!vm || !id) {
      throw new HttpException(`Missing parameters`, HttpStatus.BAD_REQUEST);
    }
    const exist = await this.litterService.findById(id);

    if (!exist) {
      throw new HttpException(`${id} Not Found`, HttpStatus.NOT_FOUND);
    }

    exist.quantity = quantity;

    try {
      const updated = await this.litterService.update(id, exist);
      return this.litterService.map<LitterVm>(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: LitterVm})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException})
  @ApiOperation(GetOperationId(Litter.modelName, 'Delete'))
  async delete(@Param('id') id: string): Promise<LitterVm> {
    try {
      const deleted = await this.litterService.delete(id);
      return this.litterService.map<LitterVm>(deleted.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }
}
