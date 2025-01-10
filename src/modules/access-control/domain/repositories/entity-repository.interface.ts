import { EntityEntity } from '@/modules/access-control/domain/entities/entity.entity';
import {
  UpdateEntityDto,
  CreateEntityDto,
} from '@/modules/access-control/application/dto/entity.dto';

export interface IEntityRepository {
  create(data: CreateEntityDto): Promise<EntityEntity>;
  findAll(): Promise<EntityEntity[]>;
  findById(id: string): Promise<EntityEntity | null>;
  update(id: string, data: UpdateEntityDto): Promise<void>;
  delete(id: string): Promise<void>;
}
