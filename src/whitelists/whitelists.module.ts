import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WhitelistsController } from './whitelists.controller';
import { WhitelistsService } from './whitelists.service';
import { WhitelistSchema } from './schemas/whitelist.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Whitelist', schema: WhitelistSchema }]),
  ],
  controllers: [WhitelistsController],
  providers: [WhitelistsService],
})
export class WhitelistsModule {}
