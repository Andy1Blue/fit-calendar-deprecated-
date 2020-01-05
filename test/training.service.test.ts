import { Test, TestingModule } from '@nestjs/testing';
import { TrainingsService } from '../src/trainings/trainings.service';
import { TrainingsController } from '../src/trainings/trainings.controller';
import { Training } from '../src/trainings/training.model';
import { ITraining } from 'src/trainings/training.interface';

class TrainingsServiceMock {
  getTranings() {
    return {} as Training[];
  }

  getTrainingsForUser(training: ITraining) {
    return {} as Training[];
  }
}

describe('TraningsService', () => {
  let trainingsService: TrainingsService;
  let trainingsController: TrainingsController;

  beforeAll(async () => {
    const TrainingsProvider = {
      provide: TrainingsService,
      useClass: TrainingsServiceMock,
    };
    const app: TestingModule = await Test.createTestingModule({
      controllers: [TrainingsController],
      providers: [TrainingsService, TrainingsProvider],
    }).compile();

    trainingsService = app.get<TrainingsService>(TrainingsService);
    trainingsController = app.get<TrainingsController>(TrainingsController);
  });

  describe('getTranings', () => {
    it('should get all trainings', async () => {
      const result = {} as Promise<Training[]>;

      jest.spyOn(trainingsService, 'getTranings').mockImplementation(() => result);
      expect(await trainingsController.getAllTranings()).toBe(result);
    });
  });

  describe('getTrainingsForUser', () => {
    it('should get trainings for specify user', async () => {
      const result = {} as Promise<Training[]>;

      jest.spyOn(trainingsService, 'getTrainingsForUser').mockImplementation(() => result);
      expect(await trainingsController.getTranings('1')).toBe(result);
      // expect(await trainingsController.getTranings('')).toThrow('Could not find trainings for specify user.');
    });
  });
});
