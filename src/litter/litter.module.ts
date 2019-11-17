import { Module } from '@nestjs/common';
import { LitterService } from './litter.service';
import { LitterController } from './litter.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Litter} from './models/litter.model';

@Module({
  imports: [MongooseModule.forFeature([{name: Litter.modelName, schema: Litter.model.schema}])],
  providers: [LitterService],
  exports: [LitterService],
  controllers: [LitterController],
})
export class LitterModule {}
