import { Test, TestingModule } from '@nestjs/testing';
import { AppartmentService } from './appartment.service';

describe('AppartmentService', () => {
  let service: AppartmentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppartmentService],
    }).compile();

    service = module.get<AppartmentService>(AppartmentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
