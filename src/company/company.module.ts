import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company} from './models/company.model';
import { Trash } from '../trash/models/trash.model';
import { TrashService } from '../trash/trash.service';

@Module({
  imports: [MongooseModule.forFeature([{name: Company.modelName, schema: Company.model.schema}]),
    MongooseModule.forFeature([{name: Trash.modelName, schema: Trash.model.schema}])],
  providers: [CompanyService, TrashService],
  controllers: [CompanyController],
})
export class CompanyModule {}
