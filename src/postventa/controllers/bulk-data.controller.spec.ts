import { Test, TestingModule } from '@nestjs/testing';
import { BulkDataController } from './bulk-data.controller';

describe('BulkDataController', () => {
  let controller: BulkDataController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BulkDataController],
    }).compile();

    controller = module.get<BulkDataController>(BulkDataController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
