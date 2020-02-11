import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingsModule } from '../trainings/trainings.module';
import { LogsModule } from '../logs/logs.module';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

const dbData =
  process.env.MONGOOSE_USER === null || process.env.MONGOOSE_USER === ''
    ? process.env.MONGOOSE_HOST
    : 'mongodb+srv://' +
      process.env.MONGOOSE_USER +
      ':' +
      process.env.MONGOOSE_PASSWORD +
      '@' +
      process.env.MONGOOSE_HOST +
      '?retryWrites=true&w=majority';

@Module({
  imports: [
    TrainingsModule,
    LogsModule,
    MongooseModule.forRoot(dbData, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
