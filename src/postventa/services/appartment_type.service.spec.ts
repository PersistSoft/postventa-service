import { Test, TestingModule } from '@nestjs/testing';
import { AppartmentTypeService } from './appartment_type.service';

describe('AppartmentTypeService', () => {
  let service: AppartmentTypeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppartmentTypeService],
    }).compile();

    service = module.get<AppartmentTypeService>(AppartmentTypeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
