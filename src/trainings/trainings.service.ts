import { Injectable, NotFoundException } from '@nestjs/common';
import { Training } from './training.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TrainingsService {
    constructor(@InjectModel('Training') private readonly trainingModel: Model<Training>) { }

    private async findTraining(userId: string, trainingId: string): Promise<Training> {
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
        trainingDate: string,
        description: string,
        distance: number | null,
        calories: number | null,
        time: number | null,
        userId: string,
    ) {
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

    async getTrainingsForUser(userId: string) {
        const trainingsForUser = await this.trainingModel.find({ userId });

        if (!trainingsForUser) {
            throw new NotFoundException('Could not find trainings for specify user.');
        }

        return trainingsForUser as Training[];
    }

    async getLastTrainingForUser(userId: string) {
        const lastTrainingForUser = await this.trainingModel.find({ userId }).sort({ createdDate: -1 }).limit(1);

        if (!lastTrainingForUser) {
            throw new NotFoundException('Could not find training for specify user.');
        }

        return lastTrainingForUser as Training[];
    }

    async getFirstTrainingForUser(userId: string) {
        const firstTrainingForUser = await this.trainingModel.find({ userId }).sort({ createdDate: 1 }).limit(1);

        if (!firstTrainingForUser) {
            throw new NotFoundException('Could not find training for specify user.');
        }

        return firstTrainingForUser as Training[];
    }

    async getSingleTraining(userId: string, trainingId: string) {
        const training = await this.findTraining(userId, trainingId);

        if (!training) {
            throw new NotFoundException('Could not find training.');
        }

        return training as Training;
    }

    async updateTraining(
        userId: string,
        trainingId: string,
        trainingDescription: string,
        trainingDistance: number,
        trainingCalories: number,
        trainingTime: number,
    ) {
        const updatedTraining = await this.findTraining(userId, trainingId);

        if (trainingDescription) {
            updatedTraining.description = trainingDescription;
        }

        if (trainingDistance >= 0) {
            updatedTraining.distance = trainingDistance;
        }

        if (trainingCalories >= 0) {
            updatedTraining.calories = trainingCalories;
        }

        if (trainingTime >= 0) {
            updatedTraining.time = trainingTime;
        }

        updatedTraining.save();
    }

    async deleteTraining(userId: string, trainingId: string) {
        const result = await this.trainingModel.deleteOne({ userId, _id: trainingId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find training.');
        }
    }

    async sumTraingsDataByYear(userId: string, year: string) {
        let count = 0;

        this.trainingModel.countDocuments({ $and: [{ userId }, { trainingDate: { '$regex': year, '$options': 'i' } }] }, function (err, c) {
            if (!err) {
                count = c;
            }
        });

        const time = await this.trainingModel.aggregate([{
            $match: { $and: [{ userId }, { time: { $gte: 1 } }, { trainingDate: { '$regex': year, '$options': 'i' } }] },
        },
        { $group: { _id: null, time: { $sum: '$time' } } },
        ]);

        const distance = await this.trainingModel.aggregate([{
            $match: { $and: [{ userId }, { distance: { $gte: 1 } }, { trainingDate: { '$regex': year, '$options': 'i' } }] },
        },
        { $group: { _id: null, distance: { $sum: '$distance' } } },
        ]);

        const calories = await this.trainingModel.aggregate([{
            $match: { $and: [{ userId }, { calories: { $gte: 1 } }, { trainingDate: { '$regex': year, '$options': 'i' } }] },
        },
        { $group: { _id: null, calories: { $sum: '$calories' } } },
        ]);

        return { count, time, distance, calories };
    }

    async sumTraingsDataByMonth(userId: string, year: string, month: string) {
        let count = 0;

        this.trainingModel.countDocuments({ $and: [{ userId }, { trainingDate: { '$regex': month + '' + year, '$options': 'i' } }] }, function (err, c) {
            if (!err) {
                count = c;
            }
        });

        const time = await this.trainingModel.aggregate([{
            $match: { $and: [{ userId }, { time: { $gte: 1 } }, { trainingDate: { '$regex': month + '' + year, '$options': 'i' } }] },
        },
        { $group: { _id: null, time: { $sum: '$time' } } },
        ]);

        const distance = await this.trainingModel.aggregate([{
            $match: { $and: [{ userId }, { distance: { $gte: 1 } }, { trainingDate: { '$regex': month + '' + year, '$options': 'i' } }] },
        },
        { $group: { _id: null, distance: { $sum: '$distance' } } },
        ]);

        const calories = await this.trainingModel.aggregate([{
            $match: { $and: [{ userId }, { calories: { $gte: 1 } }, { trainingDate: { '$regex': month + '' + year, '$options': 'i' } }] },
        },
        { $group: { _id: null, calories: { $sum: '$calories' } } },
        ]);

        return { count, time, distance, calories };
    }
}
