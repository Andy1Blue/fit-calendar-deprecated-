import {
  Controller,
} from '@nestjs/common';
import { WhitelistsService } from './whitelists.service';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

@Controller('whitelists')
export class WhitelistsController {
  constructor(private readonly whitelistsService: WhitelistsService) {}
}
