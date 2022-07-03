import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto {
  constructor(projectName: string, address: string) {
    this.name = projectName;
    this.address = address;
  }

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  address: string;
}

export class UpdateProjectDto extends PartialType(CreateProjectDto) {}
