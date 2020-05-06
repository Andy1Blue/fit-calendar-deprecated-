import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';
import { WhitelistsService } from './whitelists.service';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

@Controller('whitelists')
export class WhitelistsController {
  constructor(private readonly whitelistsService: WhitelistsService) {}

  @Get('/user/:userId')
  async checkIsWhitelisted(@Param('userId') userId: string) {
      const isWhitelisted = await this.whitelistsService.isWhitelisted(userId);

      return isWhitelisted;
  }
}
