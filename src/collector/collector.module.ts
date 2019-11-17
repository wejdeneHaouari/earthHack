import { Module } from '@nestjs/common';
import { CollectorService } from './collector.service';
import { CollectorController } from './collector.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collector} from './models/collector.model';
import { LitterService } from '../litter/litter.service';
import { TrashService } from '../trash/trash.service';
import { Trash } from '../trash/models/trash.model';

@Module({
  imports: [MongooseModule.forFeature([{name: Collector.modelName, schema: Collector.model.schema}]),
    MongooseModule.forFeature([{name: Trash.modelName, schema: Trash.model.schema}]),
  LitterService],
  providers: [CollectorService, TrashService],
  controllers: [CollectorController],
})
export class CollectorModule {}
