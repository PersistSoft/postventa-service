import { ApiProperty, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsOptional,
  IsArray,
} from 'class-validator';

export class CreateAppartmentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  constructionName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  salesName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  definitiveName: string;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  buildingId: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  parkingIds: number[];

  @IsNotEmpty()
  @ApiProperty()
  @IsOptional()
  @IsArray()
  unitStorageIds: number[];

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  appartmentTypeId: number;
}

export class updateAppartmentDto extends PartialType(CreateAppartmentDto) {}
