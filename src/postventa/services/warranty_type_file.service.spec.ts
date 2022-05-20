import { Test, TestingModule } from '@nestjs/testing';
import { WarrantyTypeFileService } from './warranty_type_file.service';

describe('WarrantyTypeFileService', () => {
  let service: WarrantyTypeFileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarrantyTypeFileService],
    }).compile();

    service = module.get<WarrantyTypeFileService>(WarrantyTypeFileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
