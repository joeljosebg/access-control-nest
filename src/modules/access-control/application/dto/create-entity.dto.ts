import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEntityDto {
  @ApiProperty({
    description: 'The name of the entity',
    example: 'User',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'The description of the entity',
    example: 'User entity',
  })
  @IsString()
  description: string;
}
