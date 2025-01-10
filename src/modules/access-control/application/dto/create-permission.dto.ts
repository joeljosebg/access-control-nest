import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
export class CreatePermissionDto {
  @ApiProperty({
    description: 'The name of the permission',
    example: 'Create User',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the permission',
    example: 'Create a user',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'The resource of the permission',
    example: 'User, Document, Report',
  })
  @IsNotEmpty()
  @IsString()
  resource: string;

  @ApiProperty({
    description: 'The action of the permission',
    example: 'create, read, update, delete',
  })
  @IsNotEmpty()
  @IsString()
  action: string;

  @ApiPropertyOptional({
    description: 'The condition of the permission',
    example: 'if user is admin',
  })
  @IsString()
  condition?: string;
}
