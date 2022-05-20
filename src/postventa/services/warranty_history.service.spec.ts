import { Test, TestingModule } from '@nestjs/testing';
import { WarrantyHistoryService } from './warranty_history.service';

describe('WarrantyHistoryService', () => {
  let service: WarrantyHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WarrantyHistoryService],
    }).compile();

    service = module.get<WarrantyHistoryService>(WarrantyHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
