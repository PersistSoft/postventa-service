import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsPositive, IsString } from 'class-validator';
import { FilterDto } from './filter.dto';

export class AppartmentFilterDto extends FilterDto {
  @IsOptional()
  @IsPositive()
  buildingId: number;

  @IsOptional()
  @IsString()
  hasPaskings: string;

  @IsOptional()
  @IsString()
  hasUnitStorages: string;
}
