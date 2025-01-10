import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateEntityDto {
  @IsString()
  name: string;

  @IsOptional()
  @IsUUID()
  resourceId?: string; // Related resource
}

export class UpdateEntityDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsUUID()
  resourceId?: string;
}
