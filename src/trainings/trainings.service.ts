import { Injectable } from '@nestjs/common';
import { Training } from './training.model';

@Injectable()
export class TrainingsService {
    trainings: Training[] = [];

    insertTraining(
        description: string,
            
        distance: number | null,
        calories: number | null,
        time: number | null,
        userId: number,
    ) {
        const id = new Date().toString();
        const trainingDate = '1231';
        const createdDate = new Date();
        const lastUpdatedDateTime = createdDate;
        const isActive = true;

        const newTraining = new Training(
            id,
            trainingDate,
            description,
            distance,
            calories,
            time,
            userId,
            createdDate,
            lastUpdatedDateTime,
            isActive,
        );
        this.trainings.push(newTraining);
        return id;
    }
}
