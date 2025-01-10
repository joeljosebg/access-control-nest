import { IsNotEmpty, IsString, ArrayNotEmpty } from 'class-validator';
import { ApiProperty, OmitType } from '@nestjs/swagger';
import { PermissionEntity } from '../../domain/entities/permission.entity';

export class CreateRoleDto {
  @ApiProperty({
    description: 'The name of the role',
    example: 'Admin',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The permissions of the role',
    example: ['1', '2', '3'],
  })
  @ArrayNotEmpty()
  permissionIds: string[]; // IDs de permisos
}

export class CreateRoleSaveDto extends OmitType(CreateRoleDto, [
  'permissionIds',
]) {
  permissions: PermissionEntity[];
}

export class UpdateRoleDto {
  @ApiProperty({
    description: 'The name of the role',
    example: 'Admin',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The permissions of the role',
    example: ['1', '2', '3'],
  })
  @ArrayNotEmpty()
  permissionIds: string[]; // IDs de permisos
}

export class UpdateRoleSaveDto extends OmitType(UpdateRoleDto, [
  'permissionIds',
]) {
  permissions: PermissionEntity[];
}
