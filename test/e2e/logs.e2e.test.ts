import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../../src/app.module';

describe('AppController Logs (e2e)', () => {
  let app: INestApplication;
  let idForTestUser: string;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe());
    await app.init();
  });

  afterEach(() => {
    app.close();
  });

  it('POST add log', async () => {
    const res = await request(app.getHttpServer())
      .post('/logs/')
      .set('key', process.env.SECRET_KEY)
      .send({
        userId: 'TestUser',
        log: 'Test log',
        category: 'Test category',
      });

    expect(res.status).toEqual(201);
    expect(res.body).toHaveProperty('id');

    idForTestUser = res.body.id;
  });

  it('GET all logs', async () => {
    const res = await request(app.getHttpServer())
      .get('/logs/')
      .set('key', process.env.SECRET_KEY);
    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('userId');
    expect(res.body[0]).toHaveProperty('log');
    expect(res.body[0]).toHaveProperty('category');
  });

  it('GET logs for specify user', async () => {
    const res = await request(app.getHttpServer())
      .get('/logs/user/TestUser')
      .set('key', process.env.SECRET_KEY);

    expect(res.status).toEqual(200);
    expect(res.body[0]).toHaveProperty('userId');
    expect(res.body[0]).toHaveProperty('log');
    expect(res.body[0]).toHaveProperty('category');
  });

  it('DELETE single log for specify user', async () => {
    const res = await request(app.getHttpServer())
      .delete(`/logs/user/TestUser/id/${idForTestUser}`)
      .set('key', process.env.SECRET_KEY);

    expect(res.status).toEqual(200);
    expect(res.body).toEqual({});
  });
});
