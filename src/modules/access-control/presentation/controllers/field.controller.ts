import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateFieldDto,
  UpdateFieldDto,
} from '@/modules/access-control/application/dto/field.dto';
import { FIELD_SERVICE } from '@/modules/access-control/access-control.tokens';
import { IFieldService } from '@/modules/access-control/domain/interfaces/field-service.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FieldEntity } from '@/modules/access-control/domain/entities/field.entity';

@ApiTags('Fields')
@Controller('fields')
@Injectable()
export class FieldsController {
  constructor(
    @Inject(FIELD_SERVICE)
    private readonly fieldService: IFieldService,
  ) {}

  @ApiOperation({ summary: 'Get all fields' })
  @ApiResponse({
    status: 200,
    description: 'Returns all fields',
    type: FieldEntity,
  })
  @Get()
  findAllFields() {
    return this.fieldService.findAll();
  }

  @ApiOperation({ summary: 'Create a field' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created field',
    type: FieldEntity,
  })
  @Post()
  createField(@Body() createFieldDto: CreateFieldDto) {
    return this.fieldService.create(createFieldDto);
  }

  @ApiOperation({ summary: 'Update a field' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated field',
    type: FieldEntity,
  })
  @Put(':id')
  updateField(@Param('id') id: string, @Body() updateFieldDto: UpdateFieldDto) {
    return this.fieldService.update(id, updateFieldDto);
  }

  @ApiOperation({ summary: 'Delete a field' })
  @ApiResponse({
    status: 200,
    description: 'Returns the deleted field',
    type: FieldEntity,
  })
  @Delete(':id')
  deleteField(@Param('id') id: string) {
    return this.fieldService.delete(id);
  }
}
