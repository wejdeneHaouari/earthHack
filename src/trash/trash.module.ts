import { Module } from '@nestjs/common';
import { TrashService } from './trash.service';
import { TrashController } from './trash.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Trash} from './models/trash.model';

@Module({
  imports: [MongooseModule.forFeature([{name: Trash.modelName, schema: Trash.model.schema}])],
  providers: [TrashService],
  controllers: [TrashController],
  exports: [TrashService],
})
export class TrashModule {}
