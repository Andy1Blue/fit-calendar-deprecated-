import { Controller, Post, Body, Get, Param, Patch, Delete } from '@nestjs/common';
import { TrainingsService } from './trainings.service';

@Controller('trainings')
export class TrainingsController {
    constructor(private readonly trainingsService: TrainingsService) { }

    @Post()
    addTraining(
        @Body('description') trainingDescription: string,
        @Body('distance') trainingDistance: number | null,
        @Body('calories') trainingCalories: number | null,
        @Body('time') trainingTime: number | null,
        @Body('userId') trainingUserId: number,
    ) {
        const generatedId = this.trainingsService.insertTraining(
            trainingDescription,
            trainingDistance,
            trainingCalories,
            trainingTime,
            trainingUserId,
        );
        return { id: generatedId };
    }

    @Get()
    getAllTranings() {
        return this.trainingsService.getTranings();
    }

    @Get('/user/:userId')
    getTranings(@Param('userId') userId: number) {
        return this.trainingsService.getTrainingsForUser(userId);
    }

    @Get('/user/:userId/id/:id') // TODO: ultimately :trainingDate
    getTraning(@Param('id') traningId: string, @Param('userId') userId: number) {
        return this.trainingsService.getSingleTraining(userId, traningId);
    }

    @Patch('/user/:userId/id/:id')
    updateTraining(
        @Param('userId') userId: number,
        @Param('id') traningId: string,
        @Body('description') trainingDescription: string) {
        this.trainingsService.updateTraining(userId, traningId, trainingDescription);
        return null;
    }

    @Delete('/user/:userId/id/:id')
    removeTraining(@Param('userId') userId: number, @Param('id') traningId: string) {
        this.trainingsService.deleteTraining(userId, traningId);
        return null;
    }
}
