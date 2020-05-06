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

  async isWhitelisted(userId: string) {
    const whitelistedUser = await this.WhitelistModel.findOne({ userId }).exec();

    if (!whitelistedUser) {
      return false;
    }

    return true;
  }

  async getWhitelists(userId: string) {
    const whitelistedUser = await this.WhitelistModel.findOne({ userId }).exec();

    if (!whitelistedUser) {
      throw new NotFoundException('Could not find whitelisted user.');
    }

    return whitelistedUser as Whitelist;
  }
}
