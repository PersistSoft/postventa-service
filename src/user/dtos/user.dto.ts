import { IsString, IsEmail, IsNotEmpty, IsArray } from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @IsArray()
  @IsNotEmpty()
  @ApiProperty()
  roleIds: number[];
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}
