import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { BulkService } from '../services/bulk.service';

@ApiTags('Bulk data Module')
@Controller('bulk')
@UseInterceptors(FileInterceptor('file'))
export class BulkDataController {
  constructor(private bulkService: BulkService) {}
  @Post('initial-data')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    this.bulkService.bulkInitialData(file);
  }
}
