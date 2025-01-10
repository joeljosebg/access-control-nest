import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { FieldEntity } from '@/modules/access-control/domain/entities/field.entity';
import { IFieldRepository } from '@/modules/access-control/domain/repositories/field-repository.interface';
import {
  CreateFieldDto,
  UpdateFieldDto,
} from '@/modules/access-control/application/dto/field.dto';

@Injectable()
export class FieldRepository implements IFieldRepository {
  constructor(
    @InjectRepository(FieldEntity)
    private readonly repository: Repository<FieldEntity>,
  ) {}

  async create(data: CreateFieldDto): Promise<FieldEntity> {
    const field = this.repository.create(data);
    return this.repository.save(field);
  }

  async findAll(): Promise<FieldEntity[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<FieldEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, data: UpdateFieldDto): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
