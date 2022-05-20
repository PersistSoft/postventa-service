import { Test, TestingModule } from '@nestjs/testing';
import { AppartmentTypeController } from './appartment_type.controller';

describe('AppartmentTypeController', () => {
  let controller: AppartmentTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppartmentTypeController],
    }).compile();

    controller = module.get<AppartmentTypeController>(AppartmentTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
