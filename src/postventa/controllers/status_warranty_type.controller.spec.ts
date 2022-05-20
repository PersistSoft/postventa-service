import { Test, TestingModule } from '@nestjs/testing';
import { StatusWarrantyTypeController } from './status_warranty_type.controller';

describe('StatusWarrantyTypeController', () => {
  let controller: StatusWarrantyTypeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StatusWarrantyTypeController],
    }).compile();

    controller = module.get<StatusWarrantyTypeController>(StatusWarrantyTypeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
