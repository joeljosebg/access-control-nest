import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';
import { PartialType, ApiProperty, OmitType } from '@nestjs/swagger';

import {
  IsString,
  IsEmail,
  Length,
  IsNotEmpty,
  IsOptional,
  IsArray,
} from 'class-validator';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: 'Username del usuario', minimum: 3, maximum: 20 })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @ApiProperty({ description: 'Email del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'First name of the user' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  firstName: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  lastName: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    minimum: 8,
    maximum: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  password: string;

  @ApiProperty({
    description: 'The roles of the user',
    example: 'Admin, User',
  })
  @IsArray()
  @IsNotEmpty()
  rolesIds: string[];
}

export class CreateUserWithOutRolesDto extends OmitType(CreateUserDto, [
  'rolesIds',
]) {}

export class CreateUserSaveDto extends OmitType(CreateUserDto, ['rolesIds']) {
  roles: RoleEntity[];
}

export class UpdateUserDto {
  @ApiProperty({ description: 'Username del usuario', minimum: 3, maximum: 20 })
  @IsString()
  @IsOptional()
  @Length(3, 20)
  username?: string;

  @ApiProperty({ description: 'Email del usuario' })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty({ description: 'First name of the user' })
  @IsOptional()
  @IsString()
  @Length(3, 20)
  firstName?: string;

  @ApiProperty({ description: 'Last name of the user' })
  @IsOptional()
  @IsString()
  @Length(3, 20)
  lastName?: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    minimum: 8,
    maximum: 50,
  })
  @IsString()
  @IsOptional()
  @Length(8, 50)
  password?: string;

  @ApiProperty({
    description: 'The roles of the user',
    example: 'Admin, User',
  })
  @IsArray()
  @IsOptional()
  rolesIds?: string[];
}

export class UpdateUserSaveDto extends OmitType(UpdateUserDto, ['rolesIds']) {
  roles: RoleEntity[];
}

export class UserResponseDto extends OmitType(UserEntity, ['password']) {}
