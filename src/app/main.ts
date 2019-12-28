import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// tslint:disable-next-line: no-var-requires
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(process.env.PORT);
  console.log('Starting on port: ', process.env.PORT);
}
bootstrap();
