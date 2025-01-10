import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';

import { ResourceEntity } from '@/modules/access-control/domain/entities/resource.entity';

@Entity('endpoints')
export class EndpointEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  method: string;

  @Column()
  path: string;

  @ManyToOne(() => ResourceEntity, (resource) => resource.endpoints, {
    onDelete: 'CASCADE',
  })
  resource: ResourceEntity;
}
