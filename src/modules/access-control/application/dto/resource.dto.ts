import { IsArray, IsOptional, IsString } from 'class-validator';

export class CreateResourceDto {
  @IsString()
  name: string;

  @IsString()
  description: string;
}

export class UpdateResourceDto {
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  permissions?: string[];
}
