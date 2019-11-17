import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { AuthService } from '../shared/auth/auth.service';
import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper.service';
import { User } from './models/user.model';
import { LitterParams } from '../litter/models/view-model/litter-params.model';
import { Litter } from '../litter/models/litter.model';
import { LitterService } from '../litter/litter.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) private readonly userModel: ModelType<User>,
    private readonly litterService: LitterService,
    private readonly mapperService: MapperService,
    @Inject(forwardRef(() => AuthService))
    readonly authService: AuthService,
  ) {
    super();
    this._model = userModel;
    this._mapper = mapperService.mapper;
  }

  async takeOfLitter(params: LitterParams, idUser: string): Promise<Litter> {
    const currentUser = await this.findById(idUser);
    if (! currentUser) {
      throw new HttpException( 'USER NOT FOUND', HttpStatus.NOT_FOUND);
    }
    const { quantity, status } = params;
    const newLitter =  new LitterParams();
    newLitter.quantity = quantity;
    newLitter.status = status;
    if (currentUser.region) {
      newLitter.region = currentUser.region;
    }
    try {
      return await this.litterService.createLitter(newLitter);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
