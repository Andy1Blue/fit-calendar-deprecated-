import { Injectable, NotFoundException } from '@nestjs/common';
import { Whitelist } from './schemas/whitelist.schema';
import { IWhitelist } from './interfaces/whitelist.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import e = require('express');

@Injectable()
export class WhitelistsService {
  constructor(
    @InjectModel('Whitelist') private readonly WhitelistModel: Model<Whitelist>,
  ) {}

  async getWhitelists() {
    const result = await this.WhitelistModel.find().exec();
    return result as Whitelist[];
  }
}
