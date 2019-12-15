import { Injectable, NotFoundException } from '@nestjs/common';
import { Training } from './training.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TrainingsService {
    constructor(@InjectModel('Training') private readonly trainingModel: Model<Training>) { }

    private async findTraining(userId: number, trainingId: string): Promise<Training> {
        let training;
        try {
            training = await this.trainingModel.findOne({ userId, _id: trainingId });
        } catch (error) {
            throw new NotFoundException('Could not find training or user.');
        }

        if (!training) {
            throw new NotFoundException('Could not find training or user.');
        }

        return training;
    }

    async insertTraining(
        description: string,
        distance: number | null,
        calories: number | null,
        time: number | null,
        userId: number,
    ) {
        const trainingDate = '1231';
        const createdDate = new Date();
        const lastUpdatedDateTime = createdDate;
        const isActive = true;

        const newTraining = new this.trainingModel({
            trainingDate,
            description,
            distance,
            calories,
            time,
            userId,
            createdDate,
            lastUpdatedDateTime,
            isActive,
        });
        const result = await newTraining.save();
        return result.id as string;
    }

    async getTranings() {
        const result = await this.trainingModel.find().exec();
        return result as Training[];
    }

    async getTrainingsForUser(userId: number) {
        const trainingsForUser = await this.trainingModel.find({ userId });

        if (!trainingsForUser) {
            throw new NotFoundException('Could not find trainings for specify user.');
        }

        return trainingsForUser as Training[];
    }

    async getSingleTraining(userId: number, trainingId: string) {
        const training = await this.findTraining(userId, trainingId);

        if (!training) {
            throw new NotFoundException('Could not find training.');
        }

        return training as Training;
    }

    async updateTraining(
        userId: number,
        trainingId: string,
        trainingDescription: string,
    ) {
        const updatedTraining = await this.findTraining(userId, trainingId);

        if (trainingDescription) {
            updatedTraining.description = trainingDescription;
        }

        updatedTraining.save();
    }

    async deleteTraining(userId: number, trainingId: string) {
        const result = await this.trainingModel.deleteOne({ userId, _id: trainingId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find training.');
        }
    }
}
