import 'automapper-ts/dist/automapper';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperService {
  mapper: AutoMapperJs.AutoMapper;

  constructor() {
    this.mapper = automapper;
    this.initializeMapper();
  }
  private initializeMapper(): void {
    this.mapper.initialize(MapperService.configure);
  }
  private static configure(config: AutoMapperJs.IConfiguration): void{
    config
      .createMap('User', 'UserVm')
      .forSourceMember('_id', opts => opts.ignore())
      .forSourceMember('password' , opts => opts.ignore());

    config
      .createMap('Todo', 'TodoVm')
      .forSourceMember('_id', opts => opts.ignore());

    config
      .createMap('Todo[]', 'TodoVm[]')
      .forSourceMember('_id', opts => opts.ignore());

    config
      .createMap('Company', 'CompanyVm')
      .forSourceMember('_id', opts => opts.ignore());

    config
      .createMap('Company[]', 'CompanyVm[]')
      .forSourceMember('_id', opts => opts.ignore());

    config
      .createMap('Product', 'ProductVm')
      .forSourceMember('_id', opts => opts.ignore());

    config
      .createMap('Product[]', 'ProductVm[]')
      .forSourceMember('_id', opts => opts.ignore());

    config
      .createMap('Trash', 'TrashVm')
      .forSourceMember('_id', opts => opts.ignore());

    config
      .createMap('Trash[]', 'TrashVm[]')
      .forSourceMember('_id', opts => opts.ignore());

    config
      .createMap('Collector', 'CollectorVm')
      .forSourceMember('_id', opts => opts.ignore());

    config
      .createMap('Collector[]', 'CollectorVm[]')
      .forSourceMember('_id', opts => opts.ignore());
    config
      .createMap('Point', 'PointVm')
      .forSourceMember('_id', opts => opts.ignore());

    config
      .createMap('Point[]', 'PointVm[]')
      .forSourceMember('_id', opts => opts.ignore());

  }
}
