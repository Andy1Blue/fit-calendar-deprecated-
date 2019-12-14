import { Controller, Post, Body } from '@nestjs/common';
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
}