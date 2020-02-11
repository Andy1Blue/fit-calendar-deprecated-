import {
  Controller,
  Post,
  Body,
  Headers,
  Get,
  Param,
  Delete,
} from '@nestjs/common';
import { LogsService } from './logs.service';

// tslint:disable-next-line: no-var-requires
require('dotenv').config();

@Controller('logs')
export class LogsController {
  constructor(private readonly logsService: LogsService) {}

  @Post()
  async addLog(
    @Body('userId') userId: string,
    @Body('createdDate') createdDate: string,
    @Body('log') log: string,
    @Body('category') category: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      const generatedId = await this.logsService.insertLog({
        userId,
        createdDate,
        log,
        category,
      });
      return { id: generatedId };
    } else {
      return null;
    }
  }

  @Get()
  async getAllLogs(@Headers() headers) {
    if (headers.key === process.env.SECRET_KEY) {
      const allLogs = await this.logsService.getLogs();
      return allLogs;
    } else {
      return null;
    }
  }

  @Get('/user/:userId')
  async getLogs(@Param('userId') userId: string, @Headers() headers) {
    if (headers.key === process.env.SECRET_KEY) {
      const userTranings = await this.logsService.getLogsForUser({
        userId,
      });
      return userTranings;
    } else {
      return null;
    }
  }

  @Delete('/user/:userId/id/:id')
  async removeLog(
    @Param('userId') userId: string,
    @Param('id') id: string,
    @Headers() headers,
  ) {
    if (headers.key === process.env.SECRET_KEY) {
      await this.logsService.deleteLog({ userId, id });
      return null;
    } else {
      return null;
    }
  }
}
