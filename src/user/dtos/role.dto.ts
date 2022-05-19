import { IsString, IsNotEmpty, Length, IsArray } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @Length(5, 20)
  @IsNotEmpty()
  @ApiProperty()
  code: string;

  @Length(5, 100)
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  description: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  permissionIds: number[];
}

export class UpdateRoleDto extends PartialType(CreateRoleDto) {}
