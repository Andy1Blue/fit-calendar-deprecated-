import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { TrainingsService } from './trainings.service';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

@Controller('trainings')
export class TrainingsController {
  constructor(private readonly trainingsService: TrainingsService) {}

  @Post()
  async addTraining(
    @Body('trainingDate') trainingDate: string,
    @Body('colorTag') colorTag: string,
    @Body('description') description: string,
    @Body('distance') distance: number | null,
    @Body('calories') calories: number | null,
    @Body('time') time: number | null,
    @Body('userId') userId: string,
    @Body('type') type: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      const generatedId = await this.trainingsService.insertTraining({
        trainingDate,
        colorTag,
        description,
        distance,
        calories,
        time,
        userId,
        type,
      });
      return { id: generatedId };
    } else {
      return null;
    }
  }

  @Get()
  async getAllTranings(@Headers() headers) {
    if (headers.key === process.env.SECRET_KEY) {
      const allTrainings = await this.trainingsService.getTranings();
      return allTrainings;
    } else {
      return null;
    }
  }

  @Get('/user/:userId')
  async getTranings(@Param('userId') userId: string, @Headers() headers) {
    if (headers.key === process.env.SECRET_KEY) {
      const userTranings = await this.trainingsService.getTrainingsForUser({
        userId,
      });
      return userTranings;
    } else {
      return null;
    }
  }

  @Get('/user/:userId/id/:id')
  async getTraning(
    @Param('id') id: string,
    @Param('userId') userId: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      const training = await this.trainingsService.getSingleTraining({
        userId,
        id,
      });
      return training;
    } else {
      return null;
    }
  }

  @Get('/first/user/:userId')
  async getFirstTraning(
    @Param('id') traningId: string,
    @Param('userId') userId: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      const training = await this.trainingsService.getFirstTrainingForUser({
        userId,
      });
      return training;
    } else {
      return null;
    }
  }

  @Get('/last/user/:userId')
  async getLastTraning(
    @Param('id') traningId: string,
    @Param('userId') userId: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      const training = await this.trainingsService.getLastTrainingForUser({
        userId,
      });
      return training;
    } else {
      return null;
    }
  }

  @Get('/calories/user/:userId/year/:year')
  async getTheLargestAmountOfCalories(
    @Param('userId') userId: string,
    @Param('year') year: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      const training = await this.trainingsService.getTheLargestAmountOfCaloriesForUser(
        year,
        { userId },
      );
      return training;
    } else {
      return null;
    }
  }

  @Get('/distance/user/:userId/year/:year')
  async getTheLargestAmountOfDistance(
    @Param('userId') userId: string,
    @Param('year') year: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      const training = await this.trainingsService.getTheLargestAmountOfDistanceForUser(
        year,
        { userId },
      );
      return training;
    } else {
      return null;
    }
  }

  @Get('/time/user/:userId/year/:year')
  async getTheLargestAmountOfTime(
    @Param('userId') userId: string,
    @Param('year') year: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      const training = await this.trainingsService.getTheLargestAmountOfTimeForUser(
        year,
        { userId },
      );
      return training;
    } else {
      return null;
    }
  }

  @Get('/sum/user/:userId/year/:year')
  async getSumTraningDataByYear(
    @Param('userId') userId: string,
    @Param('year') year: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      const result = await this.trainingsService.sumTraingsDataByYear(year, {
        userId,
      });
      return result;
    } else {
      return null;
    }
  }

  @Get('/sum/user/:userId/year/:year/month/:month')
  async getSumTraningDataByMonth(
    @Param('userId') userId: string,
    @Param('year') year: string,
    @Param('month') month: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      const result = await this.trainingsService.sumTraingsDataByMonth(
        year,
        month,
        { userId },
      );
      return result;
    } else {
      return null;
    }
  }

  @Patch('/user/:userId/id/:id')
  async updateTraining(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Body('colorTag') colorTag: string,
    @Body('description') description: string,
    @Body('distance') distance: number,
    @Body('calories') calories: number,
    @Body('time') time: number,
    @Body('type') type: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      await this.trainingsService.updateTraining({
        userId,
        id,
        colorTag,
        description,
        distance,
        calories,
        time,
        type,
      });
      return null;
    } else {
      return null;
    }
  }

  @Delete('/user/:userId/id/:id')
  async removeTraining(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      await this.trainingsService.deleteTraining({ userId, id });
      return null;
    } else {
      return null;
    }
  }

  @Get('/compare/user/:userId/to/:userIdToCompare/year/:year')
  async compareSumTraingsDataByYear(
    @Param('userId') userId: string,
    @Param('year') year: string,
    @Param('userIdToCompare') userIdToCompare: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      const result = await this.trainingsService.compareSumTraingsDataByYear(
        year,
        {
          userId,
        },
        userIdToCompare,
      );
      return result;
    } else {
      return null;
    }
  }

  @Get('/compare/user/:userId/to/:userIdToCompare/year/:year/month/:month')
  async compareSumTraingsDataByMonth(
    @Param('userId') userId: string,
    @Param('year') year: string,
    @Param('month') month: string,
    @Param('userIdToCompare') userIdToCompare: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      const result = await this.trainingsService.compareSumTraingsDataByMonth(
        month,
        year,
        {
          userId,
        },
        userIdToCompare,
      );
      return result;
    } else {
      return null;
    }
  }
}
