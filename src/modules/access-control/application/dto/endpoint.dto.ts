import { IsString, IsUUID, IsOptional } from 'class-validator';

export class CreateEndpointDto {
  @IsString()
  name: string;

  @IsString()
  method: string; // HTTP methods: GET, POST, etc.

  @IsString()
  path: string; // API path

  @IsOptional()
  @IsUUID()
  resourceId?: string; // Related resource
}

export class UpdateEndpointDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  method?: string;

  @IsOptional()
  @IsString()
  path?: string;

  @IsOptional()
  @IsUUID()
  resourceId?: string;
}
