import { Test, TestingModule } from '@nestjs/testing';
import { UnitStorageService } from './unit_storage.service';

describe('UnitStorageService', () => {
  let service: UnitStorageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UnitStorageService],
    }).compile();

    service = module.get<UnitStorageService>(UnitStorageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
