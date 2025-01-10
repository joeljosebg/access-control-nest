import {
  IsOptional,
  IsArray,
  IsString,
  IsObject,
  Validate,
} from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsCommaSeparatedString } from '../../decorators/is-comma-separated-string.decorator';
export class QueryOptionsDto {
  @ApiPropertyOptional({
    description: 'The page number',
    default: 1,
  })
  @IsOptional()
  page?: number = 1;

  @ApiPropertyOptional({
    description: 'The number of items per page',
    default: 10,
  })
  @IsOptional()
  limit?: number = 10;

  @ApiPropertyOptional({
    description: 'The sort field',
  })
  @IsOptional()
  @IsString()
  sort?: string;

  @ApiPropertyOptional({
    description: 'The sort order',
  })
  @IsOptional()
  @IsString()
  order?: 'ASC' | 'DESC';

  @ApiPropertyOptional({
    description: 'The filters',
    type: Object,
  })
  @IsOptional()
  @IsObject()
  filters?: Record<string, any>;

  @ApiPropertyOptional({
    description: 'The fields to select',
    example: 'id,name,email',
    type: String,
  })
  @IsOptional()
  @IsString()
  @Validate(IsCommaSeparatedString)
  select?: string;

  @ApiPropertyOptional({
    description: 'The fields to exclude',
    type: [String],
  })
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  exclude?: string[];

  @ApiPropertyOptional({
    description: 'The relations to include',
    type: Object,
  })
  @IsOptional()
  @IsObject()
  relations?: Record<string, string[]>;
}
