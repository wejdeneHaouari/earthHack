import { Module } from '@nestjs/common';
import { CollectorService } from './collector.service';
import { CollectorController } from './collector.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collector} from './models/collector.model';
import { LitterService } from '../litter/litter.service';


@Module({
  imports: [MongooseModule.forFeature([{name: Collector.modelName, schema: Collector.model.schema}]),
  LitterService],
  providers: [CollectorService],
  controllers: [CollectorController],
})
export class CollectorModule {}
