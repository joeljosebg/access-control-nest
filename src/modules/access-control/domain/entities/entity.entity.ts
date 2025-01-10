import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { ResourceEntity } from '@/modules/access-control/domain/entities/resource.entity';
import { FieldEntity } from '@/modules/access-control/domain/entities/field.entity';

@Entity('entities')
export class EntityEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => ResourceEntity, (resource) => resource.entities, {
    onDelete: 'CASCADE',
  })
  resource: ResourceEntity;

  @OneToMany(() => FieldEntity, (field) => field.entity)
  fields: FieldEntity[];
}
