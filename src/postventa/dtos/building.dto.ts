import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateBuildingDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  projectId: number;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  numberOfAppartments: number;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  numberOfFloors: number;
}

export class UpdateBuildingDto extends PartialType(CreateBuildingDto) {}
