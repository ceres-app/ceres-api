import { AppService } from '@/api/services/app.service';
import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should return API infos', () => {
    expect(appController.getInfo()).toEqual({
      name: 'Ceres API v0.1',
      description: 'An API to manage a water pump with Arduino.',
    });
  });
});
