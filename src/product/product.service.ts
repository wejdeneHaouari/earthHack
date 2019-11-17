import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { BaseService } from '../shared/base.service';
import { Product } from './models/product.model';
import { ProductModule } from './product.module';
import { ModelType } from 'typegoose';
import { MapperService } from '../shared/mapper/mapper.service';
import { ProductParams } from './models/view-model/product-params.model';

@Injectable()
export class ProductService extends BaseService<Product> {
  constructor(
    @InjectModel(Product.modelName) private readonly productModel: ModelType<Product>,
    private readonly mapperService: MapperService,
  ) {
    super();
    this._model = productModel;
    this._mapper = mapperService.mapper;
  }

  async createProduct(params: ProductParams): Promise<Product> {
    const { name, companyId, description, price, points  } = params;
    const newProduct = new this._model();
    newProduct.name = name;
    newProduct.companyId = companyId;
    newProduct.description = description;
    newProduct.companyId = companyId;
    newProduct.price = price;
    newProduct.points = points;
    try {
      const result = await this.create(newProduct);
      return result.toJSON() as Product;
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
