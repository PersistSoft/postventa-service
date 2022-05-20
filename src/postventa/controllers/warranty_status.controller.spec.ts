import { Test, TestingModule } from '@nestjs/testing';
import { WarrantyStatusController } from './warranty_status.controller';

describe('WarrantyStatusController', () => {
  let controller: WarrantyStatusController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarrantyStatusController],
    }).compile();

    controller = module.get<WarrantyStatusController>(WarrantyStatusController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
