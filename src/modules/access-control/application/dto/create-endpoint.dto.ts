import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEndpointDto {
  @ApiProperty({
    description: 'The method of the endpoint',
    example: 'GET',
  })
  @IsNotEmpty()
  @IsString()
  method: string;

  @ApiProperty({
    description: 'The path of the endpoint',
    example: '/api/v1/users',
  })
  @IsNotEmpty()
  @IsString()
  path: string;
}
