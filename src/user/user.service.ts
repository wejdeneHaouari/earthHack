import { forwardRef, HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ModelType } from 'typegoose';
import { AuthService } from '../shared/auth/auth.service';
import { BaseService } from '../shared/base.service';
import { MapperService } from '../shared/mapper/mapper.service';
import { User } from './models/user.model';
import { TrashParams } from '../trash/models/view-model/trash-params.model';
import { Trash } from '../trash/models/trash.model';
import { TrashService } from '../trash/trash.service';

@Injectable()
export class UserService extends BaseService<User> {
  constructor(
    @InjectModel(User.modelName) private readonly userModel: ModelType<User>,
    private readonly trashService: TrashService,
    private readonly mapperService: MapperService,
    @Inject(forwardRef(() => AuthService))
    readonly authService: AuthService,
  ) {
    super();
    this._model = userModel;
    this._mapper = mapperService.mapper;
  }

  async takeOfTrash(params: TrashParams, idUser: string): Promise<Trash> {
    const currentUser = await this.findById(idUser);
    if (! currentUser) {
      throw new HttpException( 'USER NOT FOUND', HttpStatus.NOT_FOUND);
    }
    const { quantity, status } = params;
    const newTrash =  new TrashParams();
    newTrash.quantity = quantity;
    newTrash.status = status;
    newTrash.idUser = idUser;
    newTrash.type = params.type;
    if (currentUser.region) {
      newTrash.region = currentUser.region;
    }
    try {
      return await this.trashService.createTrash(newTrash);
    } catch (e) {
      throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


}
