import { IsString, IsNotEmpty, Length } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreatePermissionDto {
  @Length(5, 20)
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @Length(10, 100)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;
}

export class UpdatePermissionDto extends PartialType(CreatePermissionDto) {}
