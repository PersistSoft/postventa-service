import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateProjectDto {
  constructor(projectName: string, address: string) {
    this.name = projectName;
    this.address = address;
  }

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  @ApiProperty()
  address: string;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
