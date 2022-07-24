import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { RoleCodeEnum } from 'src/auth/model/roles.model';
import { BulkService } from '../services/bulk.service';

@ApiTags('Bulk data Module')
@Controller('bulk')
@UseInterceptors(FileInterceptor('file'))
export class BulkDataController {
  constructor(private bulkService: BulkService) {}

  @Roles(RoleCodeEnum.ADMIN)
  @Post('initial-data')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return this.bulkService.bulkInitialData(file);
  }
}
