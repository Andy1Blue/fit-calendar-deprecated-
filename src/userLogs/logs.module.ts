import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsController } from './logs.controller';
import { LogsService } from './logs.service';
import { LogSchema } from './log.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Log', schema: LogSchema }]),
  ],
  controllers: [LogsController],
  providers: [LogsService],
})
export class LogsModule {}
