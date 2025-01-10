import { EntityEntity } from '@/modules/access-control/domain/entities/entity.entity';
import {
  CreateEntityDto,
  UpdateEntityDto,
} from '@/modules/access-control/application/dto/entity.dto';

export interface IEntityService {
  create(data: CreateEntityDto): Promise<EntityEntity>;
  findAll(): Promise<EntityEntity[]>;
  findById(id: string): Promise<EntityEntity | null>;
  update(id: string, data: UpdateEntityDto): Promise<void>;
  delete(id: string): Promise<void>;
}
