import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { EntityEntity } from '@/modules/access-control/domain/entities/entity.entity';

@Entity('fields')
export class FieldEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne(() => EntityEntity, (entity) => entity.fields, {
    onDelete: 'CASCADE',
  })
  entity: EntityEntity;
}
