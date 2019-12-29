import { Test, TestingModule } from '@nestjs/testing';
import { TrainingsService } from '../src/trainings/trainings.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TrainingsController } from '../src/trainings/trainings.controller';
import { TrainingSchema } from '../src/trainings/training.model';
import { Training } from '../src/trainings/training.model';

describe('TraningsService', () => {
  let app: TestingModule;
  let trainingsService: TrainingsService;
  let trainingsController: TrainingsController;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      controllers: [TrainingsController],
      providers: [TrainingsService],
    }).compile();
    trainingsService = app.get<TrainingsService>(TrainingsService);
    trainingsController = app.get<TrainingsController>(TrainingsController);
  });

  describe('findTraining', () => {
    it('should get training', async () => {
      const result = {} as Promise<Training[]>;
      jest.spyOn(trainingsService, 'getTranings').mockImplementation(() => result);

      expect(await trainingsController.getAllTranings()).toBe(result);
    });
  });
});
