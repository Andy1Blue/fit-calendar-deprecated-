import { Controller, Get, Param, BadRequestException, Body, Post } from '@nestjs/common';
import { WhitelistsService } from 'src/whitelists/whitelists.service';
import { AuthService } from './auth.service';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly whitelistsService: WhitelistsService,
  ) {}

  @Post('/token')
  async verifyToken(@Body('token') token: string, @Body('userId') userId: string) {
    const currentDate = Date.now() * 1000;
    const payload = await this.authService.verifyToken(token, userId);
    const isWhitelisted = await this.whitelistsService.isWhitelisted(userId);

    if (!payload || !isWhitelisted) {
      throw new BadRequestException('No authorisation');
    }

    if (currentDate < payload?.payload?.exp) {
      throw new BadRequestException('Access token expired');
    }

    return payload;
  }
}
