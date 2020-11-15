import { Module } from '@nestjs/common';
import { WhitelistsModule } from 'src/whitelists/whitelists.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
  imports: [WhitelistsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
