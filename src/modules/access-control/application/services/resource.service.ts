import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ResourceEntity } from '@/modules/access-control/domain/entities/resource.entity';
import {
  CreateResourceDto,
  UpdateResourceDto,
} from '@/modules/access-control/application/dto/resource.dto';
import { IResourceRepository } from '@/modules/access-control/domain/repositories/resource-repository.interface';
import { IResourceService } from '@/modules/access-control/domain/interfaces/resource-service.interface';
import { RESOURCE_REPOSITORY } from '@/modules/access-control/access-control.tokens';

@Injectable()
export class ResourceService implements IResourceService {
  constructor(
    @Inject(RESOURCE_REPOSITORY)
    private readonly resourceRepository: IResourceRepository,
  ) {}

  async create(createResourceDto: CreateResourceDto): Promise<ResourceEntity> {
    const resource = new ResourceEntity();
    resource.name = createResourceDto.name;
    resource.description = createResourceDto.description;

    return this.resourceRepository.create(resource);
  }

  async findAll(): Promise<ResourceEntity[]> {
    return this.resourceRepository.findAll();
  }

  async findById(id: string): Promise<ResourceEntity> {
    const resource = await this.resourceRepository.findById(id);
    if (!resource) {
      throw new NotFoundException(`Resource with ID "${id}" not found`);
    }
    return resource;
  }

  async update(id: string, data: UpdateResourceDto): Promise<void> {
    const resource = await this.findById(id);
    resource.name = data.name;
    resource.description = data.description;
    await this.resourceRepository.update(id, resource);
  }

  async delete(id: string): Promise<void> {
    await this.resourceRepository.delete(id);
  }
}
