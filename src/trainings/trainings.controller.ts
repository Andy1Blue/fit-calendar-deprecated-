import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TrainingsService } from './trainings.service';

@Controller('trainings')
export class TrainingsController {
    constructor(private readonly trainingsService: TrainingsService) { }

    @Post()
    async addTraining(
        @Body('trainingDate') trainingDate: string,
        @Body('description') trainingDescription: string,
        @Body('distance') trainingDistance: number | null,
        @Body('calories') trainingCalories: number | null,
        @Body('time') trainingTime: number | null,
        @Body('userId') trainingUserId: string,
    ) {
        const generatedId = await this.trainingsService.insertTraining(
            trainingDate,
            trainingDescription,
            trainingDistance,
            trainingCalories,
            trainingTime,
            trainingUserId,
        );
        return { id: generatedId };
    }

    @Get()
    async getAllTranings() {
        const allTrainings = await this.trainingsService.getTranings();
        return allTrainings;
    }

    @Get('/user/:userId')
    async getTranings(@Param('userId') userId: string) {
        const userTranings = await this.trainingsService.getTrainingsForUser(userId);
        return userTranings;
    }

    @Get('/user/:userId/id/:id')
    async getTraning(@Param('id') traningId: string, @Param('userId') userId: string) {
        const training = await this.trainingsService.getSingleTraining(userId, traningId);
        return training;
    }

    @Get('/sum/user/:userId/year/:year')
    async getSumTraningDataByYear(@Param('userId') userId: string, @Param('year') year: string) {
        const result = await this.trainingsService.sumTraingsDataByYear(userId, year);
        return result;
    }

    @Get('/sum/user/:userId/year/:year/month/:month')
    async getSumTraningDataByMonth(@Param('userId') userId: string, @Param('year') year: string, @Param('month') month: string) {
        const result = await this.trainingsService.sumTraingsDataByMonth(userId, year, month);
        return result;
    }

    @Patch('/user/:userId/id/:id')
    async updateTraining(
        @Param('userId') userId: string,
        @Param('id') traningId: string,
        @Body('description') trainingDescription: string,
        @Body('distance') trainingDistance: number,
        @Body('calories') trainingCalories: number,
        @Body('time') trainingTime: number) {
        await this.trainingsService.updateTraining(userId, traningId, trainingDescription, trainingDistance, trainingCalories, trainingTime);
        return null;
    }

    @Delete('/user/:userId/id/:id')
    async removeTraining(@Param('userId') userId: string, @Param('id') traningId: string) {
        await this.trainingsService.deleteTraining(userId, traningId);
        return null;
    }
}
