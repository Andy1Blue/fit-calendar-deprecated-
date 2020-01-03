import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TrainingsService } from './trainings.service';

@Controller('trainings')
export class TrainingsController {
    constructor(private readonly trainingsService: TrainingsService) { }

    @Post()
    async addTraining(
        @Body('trainingDate') trainingDate: string,
        @Body('description') description: string,
        @Body('distance') distance: number | null,
        @Body('calories') calories: number | null,
        @Body('time') time: number | null,
        @Body('userId') userId: string,
    ) {
        const generatedId = await this.trainingsService.insertTraining(
            {
                trainingDate,
                description,
                distance,
                calories,
                time,
                userId,
            },
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
        const userTranings = await this.trainingsService.getTrainingsForUser({userId});
        return userTranings;
    }

    @Get('/user/:userId/id/:id')
    async getTraning(@Param('id') id: string, @Param('userId') userId: string) {
        const training = await this.trainingsService.getSingleTraining({userId, id});
        return training;
    }

    @Get('/first/user/:userId')
    async getFirstTraning(@Param('id') traningId: string, @Param('userId') userId: string) {
        const training = await this.trainingsService.getFirstTrainingForUser({userId});
        return training;
    }

    @Get('/last/user/:userId')
    async getLastTraning(@Param('id') traningId: string, @Param('userId') userId: string) {
        const training = await this.trainingsService.getLastTrainingForUser({userId});
        return training;
    }

    @Get('/sum/user/:userId/year/:year')
    async getSumTraningDataByYear(@Param('userId') userId: string, @Param('year') year: string) {
        const result = await this.trainingsService.sumTraingsDataByYear(year, {userId});
        return result;
    }

    @Get('/sum/user/:userId/year/:year/month/:month')
    async getSumTraningDataByMonth(@Param('userId') userId: string, @Param('year') year: string, @Param('month') month: string) {
        const result = await this.trainingsService.sumTraingsDataByMonth(year, month, {userId});
        return result;
    }

    @Patch('/user/:userId/id/:id')
    async updateTraining(
        @Param('userId') userId: string,
        @Param('id') id: string,
        @Body('description') description: string,
        @Body('distance') distance: number,
        @Body('calories') calories: number,
        @Body('time') time: number) {
        await this.trainingsService.updateTraining(
            {
                userId,
                id,
                description,
                distance,
                calories,
                time,
            },
        );
        return null;
    }

    @Delete('/user/:userId/id/:id')
    async removeTraining(@Param('userId') userId: string, @Param('id') id: string) {
        await this.trainingsService.deleteTraining({userId, id});
        return null;
    }
}
