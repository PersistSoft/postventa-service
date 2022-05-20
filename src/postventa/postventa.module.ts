import { Module } from '@nestjs/common';
import { AppartmentTypeService } from './services/appartment_type.service';
import { AppartmentService } from './services/appartment.service';
import { BuildingService } from './services/building.service';
import { ClientService } from './services/client.service';
import { FileService } from './services/file.service';
import { ParkingService } from './services/parking.service';
import { ProjectService } from './services/project.service';
import { StatusWarrantyTypeService } from './services/status_warranty_type.service';
import { TypeService } from './services/type.service';
import { UnitStorageService } from './services/unit_storage.service';
import { WarrantyHistoryService } from './services/warranty_history.service';
import { WarrantyStatusService } from './services/warranty_status.service';
import { WarrantyTypeFileService } from './services/warranty_type_file.service';
import { WarrantyTypeService } from './services/warranty_type.service';
import { WarrantyService } from './services/warranty.service';
import { AppartmentTypeController } from './controllers/appartment_type.controller';
import { AppartmentController } from './controllers/appartment.controller';
import { BuildingController } from './controllers/building.controller';
import { ClientController } from './controllers/client.controller';
import { FileController } from './controllers/file.controller';
import { ParkingController } from './controllers/parking.controller';
import { ProjectController } from './controllers/project.controller';
import { StatusWarrantyTypeController } from './controllers/status_warranty_type.controller';
import { TypeController } from './controllers/type.controller';
import { UnitStorageController } from './controllers/unit_storage.controller';
import { WarrantyHistoryController } from './controllers/warranty_history.controller';
import { WarrantyStatusController } from './controllers/warranty_status.controller';
import { WarrantyTypeFileController } from './controllers/warranty_type_file.controller';
import { WarrantyTypeController } from './controllers/warranty_type.controller';
import { WarrantyController } from './controllers/warranty.controller';

@Module({
  providers: [
    AppartmentTypeService,
    AppartmentService,
    BuildingService,
    ClientService,
    FileService,
    ParkingService,
    ProjectService,
    StatusWarrantyTypeService,
    TypeService,
    UnitStorageService,
    WarrantyHistoryService,
    WarrantyStatusService,
    WarrantyTypeFileService,
    WarrantyTypeService,
    WarrantyService,
  ],
  controllers: [
    AppartmentTypeController,
    AppartmentController,
    BuildingController,
    ClientController,
    FileController,
    ParkingController,
    ProjectController,
    StatusWarrantyTypeController,
    TypeController,
    UnitStorageController,
    WarrantyHistoryController,
    WarrantyStatusController,
    WarrantyTypeFileController,
    WarrantyTypeController,
    WarrantyController,
  ],
})
export class PostventaModule {}
