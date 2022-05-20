import { Test, TestingModule } from '@nestjs/testing';
import { WarrantyStatusService } from './warranty_status.service';

describe('WarrantyStatusService', () => {
  let service: WarrantyStatusService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarrantyStatusService],
    }).compile();

    service = module.get<WarrantyStatusService>(WarrantyStatusService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
