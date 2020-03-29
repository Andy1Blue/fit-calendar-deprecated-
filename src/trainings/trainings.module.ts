import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';
import { TrainingSchema } from './schemas/training.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Training', schema: TrainingSchema }]),
  ],
  controllers: [TrainingsController],
  providers: [TrainingsService],
})
export class TrainingsModule {}
