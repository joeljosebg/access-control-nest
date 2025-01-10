import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ResourceEntity } from '@/modules/access-control/domain/entities/resource.entity';
import { IResourceRepository } from '@/modules/access-control/domain/repositories/resource-repository.interface';

@Injectable()
export class ResourceRepository implements IResourceRepository {
  constructor(
    @InjectRepository(ResourceEntity)
    private readonly repository: Repository<ResourceEntity>,
  ) {}

  async create(data: Partial<ResourceEntity>): Promise<ResourceEntity> {
    const resource = this.repository.create(data);
    return this.repository.save(resource);
  }

  async findAll(): Promise<ResourceEntity[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<ResourceEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, data: Partial<ResourceEntity>): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
