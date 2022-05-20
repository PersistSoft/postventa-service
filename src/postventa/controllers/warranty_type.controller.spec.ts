import { Test, TestingModule } from '@nestjs/testing';
import { WarrantyTypeController } from './warranty_type.controller';

describe('WarrantyTypeController', () => {
  let controller: WarrantyTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarrantyTypeController],
    }).compile();

    controller = module.get<WarrantyTypeController>(WarrantyTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
