import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TrainingsService } from './trainings.service';

@Controller('trainings')
export class TrainingsController {
    constructor(private readonly trainingsService: TrainingsService) { }

    @Post()
    async addTraining(
        @Body('description') trainingDescription: string,
        @Body('distance') trainingDistance: number | null,
        @Body('calories') trainingCalories: number | null,
        @Body('time') trainingTime: number | null,
        @Body('userId') trainingUserId: number,
    ) {
        const generatedId = await this.trainingsService.insertTraining(
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
    async getTranings(@Param('userId') userId: number) {
        const userTranings = await this.trainingsService.getTrainingsForUser(userId);
        return userTranings;
    }

    @Get('/user/:userId/id/:id') // TODO: ultimately :trainingDate
    async getTraning(@Param('id') traningId: string, @Param('userId') userId: number) {
        const training = await this.trainingsService.getSingleTraining(userId, traningId);
        return training;
    }

    @Patch('/user/:userId/id/:id')
    async updateTraining(
        @Param('userId') userId: number,
        @Param('id') traningId: string,
        @Body('description') trainingDescription: string) {
        await this.trainingsService.updateTraining(userId, traningId, trainingDescription);
        return null;
    }

    @Delete('/user/:userId/id/:id')
    async removeTraining(@Param('userId') userId: number, @Param('id') traningId: string) {
        await this.trainingsService.deleteTraining(userId, traningId);
        return null;
    }
}
