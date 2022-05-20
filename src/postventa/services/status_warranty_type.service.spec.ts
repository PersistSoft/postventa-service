import { Test, TestingModule } from '@nestjs/testing';
import { StatusWarrantyTypeService } from './status_warranty_type.service';

describe('StatusWarrantyTypeService', () => {
  let service: StatusWarrantyTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StatusWarrantyTypeService],
    }).compile();

    service = module.get<StatusWarrantyTypeService>(StatusWarrantyTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
