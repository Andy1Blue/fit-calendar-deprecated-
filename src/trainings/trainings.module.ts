import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingsController } from './trainings.controller';
import { TrainingsService } from './trainings.service';
import { TrainingSchema } from './schemas/training.schema';
import { WhitelistsService } from '../whitelists/whitelists.service';
import { WhitelistSchema } from 'src/whitelists/schemas/whitelist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Training', schema: TrainingSchema },
      { name: 'Whitelist', schema: WhitelistSchema },
    ]),
  ],
  controllers: [TrainingsController],
  providers: [TrainingsService, WhitelistsService],
})
export class TrainingsModule {}
