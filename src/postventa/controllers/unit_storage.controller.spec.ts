import { Test, TestingModule } from '@nestjs/testing';
import { UnitStorageController } from './unit_storage.controller';

describe('UnitStorageController', () => {
  let controller: UnitStorageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UnitStorageController],
    }).compile();

    controller = module.get<UnitStorageController>(UnitStorageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
