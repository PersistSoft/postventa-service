import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBuildingDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  projectId: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  numberOfAppartments: number;

  @IsNotEmpty()
  @ApiProperty()
  @IsNumber()
  numberOfFloors: number;
}

export class UpdateBuildingDto extends PartialType(CreateBuildingDto) {}
