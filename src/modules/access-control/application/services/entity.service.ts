import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EntityEntity } from '@/modules/access-control/domain/entities/entity.entity';
import {
  CreateEntityDto,
  UpdateEntityDto,
} from '@/modules/access-control/application/dto/entity.dto';
import { IEntityRepository } from '@/modules/access-control/domain/repositories/entity-repository.interface';
import { IEntityService } from '@/modules/access-control/domain/interfaces/entity-service.interface';
import { ENTITY_REPOSITORY } from '@/modules/access-control/access-control.tokens';

@Injectable()
export class EntityService implements IEntityService {
  constructor(
    @Inject(ENTITY_REPOSITORY)
    private readonly entityRepository: IEntityRepository,
  ) {}

  async create(createEntityDto: CreateEntityDto): Promise<EntityEntity> {
    return this.entityRepository.create(createEntityDto);
  }

  async findAll(): Promise<EntityEntity[]> {
    return this.entityRepository.findAll();
  }

  async findById(id: string): Promise<EntityEntity> {
    const entity = await this.entityRepository.findById(id);
    if (!entity) {
      throw new NotFoundException(`Entity with ID "${id}" not found`);
    }
    return entity;
  }

  async update(id: string, data: UpdateEntityDto): Promise<void> {
    await this.entityRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.entityRepository.delete(id);
  }
}
