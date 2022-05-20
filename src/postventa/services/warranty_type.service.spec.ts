import { Test, TestingModule } from '@nestjs/testing';
import { WarrantyTypeService } from './warranty_type.service';

describe('WarrantyTypeService', () => {
  let service: WarrantyTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarrantyTypeService],
    }).compile();

    service = module.get<WarrantyTypeService>(WarrantyTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
