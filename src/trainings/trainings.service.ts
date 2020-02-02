import { Injectable, NotFoundException } from '@nestjs/common';
import { Training } from './training.model';
import { ITraining } from './training.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import e = require('express');

@Injectable()
export class TrainingsService {
  constructor(
    @InjectModel('Training') private readonly trainingModel: Model<Training>,
  ) {}

  private async findTraining(training: ITraining): Promise<Training> {
    let findTraining;
    try {
      findTraining = await this.trainingModel.findOne({
        userId: training.userId,
        _id: training.id,
      });
    } catch (error) {
      throw new NotFoundException('Could not find training or user.');
    }

    if (!findTraining) {
      throw new NotFoundException('Could not find training or user.');
    }

    return findTraining;
  }

  async insertTraining(training: ITraining) {
    const createdDate = new Date();
    const lastUpdatedDateTime = createdDate;
    const isActive = true;

    const newTraining = new this.trainingModel({
      trainingDate: training.trainingDate,
      colorTag: training.colorTag,
      description: training.description,
      distance: training.distance,
      calories: training.calories,
      time: training.time,
      userId: training.userId,
      createdDate,
      lastUpdatedDateTime,
      isActive,
      type: training.type,
    });
    const result = await newTraining.save();
    return result.id as string;
  }

  async getTranings() {
    const result = await this.trainingModel.find().exec();
    return result as Training[];
  }

  async getTrainingsForUser(training: ITraining) {
    const trainingsForUser = await this.trainingModel.find({
      userId: training.userId,
    });

    if (!trainingsForUser) {
      throw new NotFoundException('Could not find trainings for specify user.');
    }

    return trainingsForUser as Training[];
  }

  async getLastTrainingForUser(training: ITraining) {
    const lastTrainingForUser = await this.trainingModel
      .find({ userId: training.userId })
      .sort({ createdDate: -1 })
      .limit(1);

    if (!lastTrainingForUser) {
      throw new NotFoundException('Could not find training for specify user.');
    }

    return lastTrainingForUser as Training[];
  }

  async getFirstTrainingForUser(training: ITraining) {
    const firstTrainingForUser = await this.trainingModel
      .find({ userId: training.userId })
      .sort({ createdDate: 1 })
      .limit(1);

    if (!firstTrainingForUser) {
      throw new NotFoundException('Could not find training for specify user.');
    }

    return firstTrainingForUser as Training[];
  }

  async getSingleTraining(training: ITraining) {
    const singleTraining = await this.findTraining({
      userId: training.userId,
      id: training.id,
    });

    if (!singleTraining) {
      throw new NotFoundException('Could not find training.');
    }

    return singleTraining as Training;
  }

  async updateTraining(training: ITraining) {
    const updatedTraining = await this.findTraining({
      userId: training.userId,
      id: training.id,
    });

    if (training.description) {
      updatedTraining.description = training.description;
    }

    if (training.distance >= 0) {
      updatedTraining.distance = training.distance;
    }

    if (training.calories >= 0) {
      updatedTraining.calories = training.calories;
    }

    if (training.time >= 0) {
      updatedTraining.time = training.time;
    }

    if (training.colorTag) {
      updatedTraining.colorTag = training.colorTag;
    }

    if (training.type && training.type !== '-') {
      updatedTraining.type = training.type;
    } else {
      updatedTraining.type =null;
    }

    updatedTraining.save();
  }

  async deleteTraining(training: ITraining) {
    const result = await this.trainingModel
      .deleteOne({ userId: training.userId, _id: training.id })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find training.');
    }
  }

  async getTheLargestAmountOfDistanceForUser(year, training: ITraining) {
    const theLargestAmountOfDistance = await this.trainingModel
      .find({
        $and: [
          { userId: training.userId },
          { trainingDate: { $regex: year, $options: 'i' } },
        ],
      })
      .sort({ distance: -1 })
      .limit(1);

    if (!theLargestAmountOfDistance) {
      throw new NotFoundException('Could not find training for specify user.');
    }

    return theLargestAmountOfDistance as Training[];
  }

  async getTheLargestAmountOfTimeForUser(year, training: ITraining) {
    const theLargestAmountOfTime = await this.trainingModel
      .find({
        $and: [
          { userId: training.userId },
          { trainingDate: { $regex: year, $options: 'i' } },
        ],
      })
      .sort({ time: -1 })
      .limit(1);

    if (!theLargestAmountOfTime) {
      throw new NotFoundException('Could not find training for specify user.');
    }

    return theLargestAmountOfTime as Training[];
  }

  async getTheLargestAmountOfCaloriesForUser(year, training: ITraining) {
    const theLargestAmountOfCalories = await this.trainingModel
      .find({
        $and: [
          { userId: training.userId },
          { trainingDate: { $regex: year, $options: 'i' } },
        ],
      })
      .sort({ calories: -1 })
      .limit(1);

    if (!theLargestAmountOfCalories) {
      throw new NotFoundException('Could not find training for specify user.');
    }

    return theLargestAmountOfCalories as Training[];
  }

  async sumTraingsDataByYear(year: string, training: ITraining) {
    let count = 0;

    this.trainingModel.countDocuments(
      {
        $and: [
          { userId: training.userId },
          { trainingDate: { $regex: year, $options: 'i' } },
        ],
      },
      (err, c) => {
        if (!err) {
          count = c;
        }
      },
    );

    const matchTime = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { userId: training.userId },
            { time: { $gte: 1 } },
            { trainingDate: { $regex: year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, time: { $sum: '$time' } } },
    ]);

    const matchDistance = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { userId: training.userId },
            { distance: { $gte: 1 } },
            { trainingDate: { $regex: year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, distance: { $sum: '$distance' } } },
    ]);

    const matchCalories = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { userId: training.userId },
            { calories: { $gte: 1 } },
            { trainingDate: { $regex: year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, calories: { $sum: '$calories' } } },
    ]);

    return {
      0: {
        time: matchTime && matchTime[0] ? matchTime[0].time : null,
        distance:
          matchTime && matchDistance[0] ? matchDistance[0].distance : null,
        calories:
          matchTime && matchCalories[0] ? matchCalories[0].calories : null,
      },
      count,
    };
  }

  async sumTraingsDataByMonth(
    year: string,
    month: string,
    training: ITraining,
  ) {
    let count = 0;

    this.trainingModel.countDocuments(
      {
        $and: [
          { userId: training.userId },
          { trainingDate: { $regex: month + '' + year, $options: 'i' } },
        ],
      },
      (err, c) => {
        if (!err) {
          count = c;
        }
      },
    );

    const matchTime = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { userId: training.userId },
            { time: { $gte: 1 } },
            { trainingDate: { $regex: month + '' + year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, time: { $sum: '$time' } } },
    ]);

    const matchDistance = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { userId: training.userId },
            { distance: { $gte: 1 } },
            { trainingDate: { $regex: month + '' + year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, distance: { $sum: '$distance' } } },
    ]);

    const matchCalories = await this.trainingModel.aggregate([
      {
        $match: {
          $and: [
            { userId: training.userId },
            { calories: { $gte: 1 } },
            { trainingDate: { $regex: month + '' + year, $options: 'i' } },
          ],
        },
      },
      { $group: { _id: null, calories: { $sum: '$calories' } } },
    ]);

    return {
      0: {
        time: matchTime && matchTime[0] ? matchTime[0].time : null,
        distance:
          matchTime && matchDistance[0] ? matchDistance[0].distance : null,
        calories:
          matchTime && matchCalories[0] ? matchCalories[0].calories : null,
      },
      count,
    };
  }
}
