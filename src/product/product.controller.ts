import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query } from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiOkResponse, ApiCreatedResponse,  ApiBadRequestResponse , ApiImplicitQuery } from '@nestjs/swagger';
import { Product } from './models/product.model';
import { ProductService } from './product.service';
import { ProductVm } from './models/view-model/product-vm.model';
import { promises } from 'fs';
import { ApiException } from '../shared/api-exception.model';
import { GetOperationId } from '../shared/utilities/get-operation-id';
import { map } from 'lodash';
import { ProductParams } from './models/view-model/product-params.model';
import { isArray } from 'util';
import { ToBooleanPipe } from '../shared/pipes/to-boolean.pipe';
import { EnumToArray } from '../shared/utilities/enum-to-array';

@Controller('products')
@ApiUseTags(Product.modelName)
export class ProductController {
  constructor(private readonly productService: ProductService){}

  @Post()
  @ApiCreatedResponse({ type: ProductVm })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Product.modelName, 'Create'))
  async create(@Body() params: ProductParams): Promise<ProductVm> {
    try {
      const newProduct = await this.productService.createProduct(params);
      return this.productService.map<ProductVm>(newProduct);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Get()
  @ApiOkResponse({ type: ProductVm, isArray: true })
  @ApiBadRequestResponse({ type: ApiException })
  @ApiOperation(GetOperationId(Product.modelName, 'GetAll'))
  @ApiImplicitQuery({ name: 'name', required: false })
  @ApiImplicitQuery({ name: 'companyId', required: false })
  async get(
    @Query('name') name?: string,
    @Query('companyId') companyId?: string,
  ): Promise<ProductVm[]> {
    let filter = {};

    if (name) {
      filter['name'] = name;
    }
    if (companyId !== null) {
      if (filter['companyId']) {
        filter = { $and: [{ level: filter['companyId'] }, { companyId }] };
      } else {
        filter['isCompleted'] = companyId;
      }
    }

    try {
      const companies = await this.productService.findAll(filter);
      return this.productService.map<ProductVm[]>(map(companies, product => product.toJSON()));
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Put()
  @ApiResponse({ status: HttpStatus.CREATED, type: ProductVm})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException})
  @ApiOperation(GetOperationId(Product.modelName, 'Update'))
  async update(@Body() vm: ProductVm): Promise<ProductVm> {
    const { id, name, companyId, description, price, points  }   = vm;
    if (!vm || !id) {
      throw new HttpException(`Missing parameters`, HttpStatus.BAD_REQUEST);
    }
    const exist = await this.productService.findById(id);

    if (!exist) {
      throw new HttpException(`${id} Not Found`, HttpStatus.NOT_FOUND);
    }
    exist.name = name;
    exist.companyId = companyId;
    exist.description = description;
    exist.price = price;
    exist.points = points;

    try {
      const updated = await this.productService.update(id, exist);
      return this.productService.map<ProductVm>(updated.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  @ApiResponse({ status: HttpStatus.OK, type: ProductVm})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, type: ApiException})
  @ApiOperation(GetOperationId(Product.modelName, 'Delete'))
  async delete(@Param('id') id: string): Promise<ProductVm> {
    try {
      const deleted = await this.productService.delete(id);
      return this.productService.map<ProductVm>(deleted.toJSON());
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);

    }
  }
}
