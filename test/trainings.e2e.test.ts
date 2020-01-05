import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app/app.module';
import { Training } from '../src/trainings/training.model';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('GET all trainings', () => {
    const result = [] as Training[];

    return request(app.getHttpServer())
      .get('/trainings/')
      .expect(200);
  });

  it('GET trainings for specify user', () => {
    const result = [] as Training[];

    return request(app.getHttpServer())
      .get('/trainings/user/1')
      .expect(200)
      .expect(result);
  });
});
