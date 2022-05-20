import { Test, TestingModule } from '@nestjs/testing';
import { AppartmentController } from './appartment.controller';

describe('AppartmentController', () => {
  let controller: AppartmentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppartmentController],
    }).compile();

    controller = module.get<AppartmentController>(AppartmentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
