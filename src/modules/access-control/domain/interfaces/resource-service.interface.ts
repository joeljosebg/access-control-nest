import { ResourceEntity } from '@/modules/access-control/domain/entities/resource.entity';
import {
  CreateResourceDto,
  UpdateResourceDto,
} from '@/modules/access-control/application/dto/resource.dto';

export interface IResourceService {
  create(data: CreateResourceDto): Promise<ResourceEntity>;
  findAll(): Promise<ResourceEntity[]>;
  findById(id: string): Promise<ResourceEntity | null>;
  update(id: string, data: UpdateResourceDto): Promise<void>;
  delete(id: string): Promise<void>;
}
