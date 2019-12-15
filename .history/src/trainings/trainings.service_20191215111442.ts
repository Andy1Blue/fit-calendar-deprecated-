import { Injectable, NotFoundException } from '@nestjs/common';
import { Training } from './training.model';

@Injectable()
export class TrainingsService {
    private trainings: Training[] = [];

    private findTraining(userId: number, trainingId: string): [Training, number] {
        const trainingIndex = this.trainings.findIndex((el) => el.id == trainingId && el.userId == userId);
        const training = this.trainings[trainingIndex];

        if (!training) {
            throw new NotFoundException('Could not find training or user.');
        }

        return [training, trainingIndex];
    }

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

    getTranings() {
        return [...this.trainings];
    }

    getTrainingsForUser(userId: number) {
        const trainingsForUser = this.trainings.find(el => el.userId == userId);

        if (!trainingsForUser) {
            throw new NotFoundException('Could not find trainings for specify user.');
        }

        return [trainingsForUser];
    }

    getSingleTraining(userId: number, trainingId: string) {
        const training = this.findTraining(userId, trainingId)[0];
        if (!training) {
            throw new NotFoundException('Could not find training.');
        }

        return { ...training };
    }

    updateTraining(
        userId: number,
        trainingId: string,
        trainingDescription: string,
    ) {
        const [training, index] = this.findTraining(userId, trainingId);
        const updatedTraining = { ...training };

        if (!training) {
            throw new NotFoundException('Could not find training or user.');
        } else {
            if (trainingDescription) {
                updatedTraining.description = trainingDescription;
            }

            this.trainings[index] = updatedTraining;
        }
    }

    deleteTraining(userId: number, trainingId: string) {
        const index = this.findTraining(userId,trainingId)[1];
    }
}
