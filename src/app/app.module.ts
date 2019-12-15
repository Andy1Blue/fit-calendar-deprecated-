import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TrainingsModule } from '../trainings/trainings.module';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

@Module({
  imports: [
    TrainingsModule,
    MongooseModule.forRoot(
      'mongodb+srv://'
      + process.env.MONGOOSE_USER +
      ':'
      + process.env.MONGOOSE_PASSWORD +
      '@'
      + process.env.MONGOOSE_HOST +
      '?retryWrites=true&w=majority'
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
