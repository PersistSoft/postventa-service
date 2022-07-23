import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsInt } from 'class-validator';

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

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  parkingId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  unitStorageId: number;

  @IsInt()
  @IsNotEmpty()
  @ApiProperty()
  appartmentTypeId: number;
}

export class updateAppartmentDto extends PartialType(CreateAppartmentDto) {}
