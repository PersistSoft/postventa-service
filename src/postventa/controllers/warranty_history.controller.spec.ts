import { Test, TestingModule } from '@nestjs/testing';
import { WarrantyHistoryController } from './warranty_history.controller';

describe('WarrantyHistoryController', () => {
  let controller: WarrantyHistoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarrantyHistoryController],
    }).compile();

    controller = module.get<WarrantyHistoryController>(WarrantyHistoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
