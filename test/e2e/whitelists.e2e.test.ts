import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController Whitelists (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('GET all whitelists records', async () => {
    const res = await request(app.getHttpServer())
      .get('/whitelists/')
      .set('key', process.env.SECRET_KEY);
    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('userId');
    expect(res.body[0]).toHaveProperty('isActive');
  });
});
