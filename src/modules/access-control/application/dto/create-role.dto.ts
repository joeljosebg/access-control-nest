import { IsNotEmpty, IsString, ArrayNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

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
  permissions: string[]; // IDs de permisos
}
