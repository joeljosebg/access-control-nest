import { IsString, IsBoolean, IsUUID, IsOptional } from 'class-validator';

export class CreateFieldDto {
  @IsString()
  name: string;

  @IsString()
  type: string; // Example: string, number, etc.

  @IsBoolean()
  isNullable: boolean;

  @IsUUID()
  entityId: string; // Related entity
}

export class UpdateFieldDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsBoolean()
  isNullable?: boolean;

  @IsOptional()
  @IsUUID()
  entityId?: string;
}
