import { PartialType, ApiProperty } from '@nestjs/swagger';

import {
  IsString,
  IsEmail,
  Length,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'Username del usuario', minimum: 3, maximum: 20 })
  @IsString()
  @IsNotEmpty()
  @Length(3, 20)
  username: string;

  @ApiProperty({ description: 'Email del usuario' })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Contraseña del usuario',
    minimum: 8,
    maximum: 50,
  })
  @IsString()
  @IsNotEmpty()
  @Length(8, 50)
  password: string;
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

  @ApiProperty({
    description: 'Contraseña del usuario',
    minimum: 8,
    maximum: 50,
  })
  @IsString()
  @IsOptional()
  @Length(8, 50)
  password?: string;
}
