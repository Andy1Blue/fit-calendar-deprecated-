import { Injectable, NotFoundException } from '@nestjs/common';
import { Log } from './log.model';
import { ILog } from './log.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import e = require('express');

@Injectable()
export class LogsService {
  constructor(
    @InjectModel('Log') private readonly logModel: Model<Log>,
  ) {}

  private async findLog(log: ILog): Promise<Log> {
    let findLog;
    try {
      findLog = await this.logModel.findOne({
        _id: log.id,
      });
    } catch (error) {
      throw new NotFoundException('Could not find log.');
    }

    if (!findLog) {
      throw new NotFoundException('Could not find log.');
    }

    return findLog;
  }

  async insertLog(log: ILog) {
    const createdDate = new Date();

    const newLog = new this.logModel({
      userId: log.userId,
      createdDate,
      log: log.log,
      category: log.category,
    });
    const result = await newLog.save();
    return result.id as string;
  }

  async getLogs() {
    const result = await this.logModel.find().exec();
    return result as Log[];
  }

  async getLogsForUser(log: ILog) {
    const logsForUser = await this.logModel.find({
      userId: log.userId,
    });

    if (!logsForUser) {
      throw new NotFoundException('Could not find logs for specify user.');
    }

    return logsForUser as Log[];
  }

  async getSingleLog(log: ILog) {
    const singleLog = await this.findLog({
      userId: log.userId,
      id: log.id,
    });

    if (!singleLog) {
      throw new NotFoundException('Could not find log.');
    }

    return singleLog as Log;
  }

  async deleteLog(log: ILog) {
    const result = await this.logModel
      .deleteOne({ userId: log.userId, _id: log.id })
      .exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find log.');
    }
  }
}
