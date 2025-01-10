import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({
    description: 'The email of the user',
    example: 'john.doe@example.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'The password of the user',
    example: '123456',
  })
  @IsNotEmpty()
  password: string;
}

// TODO: Add refresh token
export class RefreshTokenDto {
  @ApiProperty({
    description: 'The refresh token of the user',
    example: '123456',
  })
  @IsNotEmpty()
  refreshToken: string;
}
