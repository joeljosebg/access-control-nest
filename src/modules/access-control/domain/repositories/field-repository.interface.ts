import { FieldEntity } from '@/modules/access-control/domain/entities/field.entity';
import {
  UpdateFieldDto,
  CreateFieldDto,
} from '@/modules/access-control/application/dto/field.dto';

export interface IFieldRepository {
  create(data: CreateFieldDto): Promise<FieldEntity>;
  findAll(): Promise<FieldEntity[]>;
  findById(id: string): Promise<FieldEntity | null>;
  update(id: string, data: UpdateFieldDto): Promise<void>;
  delete(id: string): Promise<void>;
}
