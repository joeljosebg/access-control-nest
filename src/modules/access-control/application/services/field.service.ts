import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { FieldEntity } from '@/modules/access-control/domain/entities/field.entity';
import {
  CreateFieldDto,
  UpdateFieldDto,
} from '@/modules/access-control/application/dto/field.dto';
import { IFieldRepository } from '@/modules/access-control/domain/repositories/field-repository.interface';
import { IFieldService } from '@/modules/access-control/domain/interfaces/field-service.interface';
import { FIELD_REPOSITORY } from '@/modules/access-control/access-control.tokens';

@Injectable()
export class FieldService implements IFieldService {
  constructor(
    @Inject(FIELD_REPOSITORY)
    private readonly fieldRepository: IFieldRepository,
  ) {}

  async create(createFieldDto: CreateFieldDto): Promise<FieldEntity> {
    return this.fieldRepository.create(createFieldDto);
  }

  async findAll(): Promise<FieldEntity[]> {
    return this.fieldRepository.findAll();
  }

  async findById(id: string): Promise<FieldEntity> {
    const field = await this.fieldRepository.findById(id);
    if (!field) {
      throw new NotFoundException(`Field with ID "${id}" not found`);
    }
    return field;
  }

  async update(id: string, data: UpdateFieldDto): Promise<void> {
    await this.fieldRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.fieldRepository.delete(id);
  }
}
