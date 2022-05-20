import { Test, TestingModule } from '@nestjs/testing';
import { WarrantyTypeFileController } from './warranty_type_file.controller';

describe('WarrantyTypeFileController', () => {
  let controller: WarrantyTypeFileController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WarrantyTypeFileController],
    }).compile();

    controller = module.get<WarrantyTypeFileController>(WarrantyTypeFileController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
