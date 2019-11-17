import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiOkResponse, ApiCreatedResponse,  ApiBadRequestResponse , ApiImplicitQuery } from '@nestjs/swagger';
import { Point } from './models/point.model';
import { PointService } from './point.service';
import { PointVm } from './models/view-model/point-vm.model';
import { promises } from 'fs';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { map } from 'lodash';
import { PointParams } from './models/view-model/point-params.model';

@Controller('points')
@ApiUseTags(Point.modelName)
export class PointController {
  constructor(private readonly pointService: PointService){}

  @Post()
  @ApiCreatedResponse({ type: PointVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Point.modelName, 'Create'))
  async create(@Body() params: PointParams): Promise<PointVm> {
    try {
      const newPoint = await this.pointService.createPoint(params);
      return this.pointService.map<PointVm>(newPoint);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOkResponse({ type: PointVm, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Point.modelName, 'GetAll'))
  @ApiImplicitQuery({ name: 'userId', required: false })
  async get(
    @Query('userId') userId?: string,

  ): Promise<PointVm[]> {
    let filter = {};


    if ( userId) {

        filter['userId'] = userId;

    }

    try {
      const points = await this.pointService.findAll(filter);
      return this.pointService.map<PointVm[]>(map(points, point => point.toJSON()));
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @ApiResponse({ status: HttpStatus.CREATED, type: PointVm})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException})
  @ApiOperation(GetOperationId(Point.modelName, 'Update'))
  async update(@Body() vm: PointVm): Promise<PointVm> {
    const { id, value } = vm;
    if (!vm || !id) {
      throw new HttpException(`Missing parameters`, HttpStatus.BAD_REQUEST);
    }
    const exist = await this.pointService.findById(id);

    if (!exist) {
      throw new HttpException(`${id} Not Found`, HttpStatus.NOT_FOUND);
    }

    exist.value = value;

    try {
      const updated = await this.pointService.update(id, exist);
      return this.pointService.map<PointVm>(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: PointVm})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException})
  @ApiOperation(GetOperationId(Point.modelName, 'Delete'))
  async delete(@Param('id') id: string): Promise<PointVm> {
    try {
      const deleted = await this.pointService.delete(id);
      return this.pointService.map<PointVm>(deleted.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }
}
