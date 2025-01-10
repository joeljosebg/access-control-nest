import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityEntity } from '@/modules/access-control/domain/entities/entity.entity';
import { IEntityRepository } from '@/modules/access-control/domain/repositories/entity-repository.interface';
import { CreateEntityDto } from '@/modules/access-control/application/dto/entity.dto';
import { UpdateEntityDto } from '@/modules/access-control/application/dto/entity.dto';

@Injectable()
export class EntityRepository implements IEntityRepository {
  constructor(
    @InjectRepository(EntityEntity)
    private readonly repository: Repository<EntityEntity>,
  ) {}

  async create(data: CreateEntityDto): Promise<EntityEntity> {
    const entity = this.repository.create(data);
    return this.repository.save(entity);
  }

  async findAll(): Promise<EntityEntity[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<EntityEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, data: UpdateEntityDto): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
