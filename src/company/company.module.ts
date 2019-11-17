import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company} from './models/company.model';

@Module({
  imports: [MongooseModule.forFeature([{name: Company.modelName, schema: Company.model.schema}])],
  providers: [CompanyService],
  controllers: [CompanyController],
})
export class CompanyModule {}
