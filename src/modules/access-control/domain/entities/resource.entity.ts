import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { EntityEntity } from '@/modules/access-control/domain/entities/entity.entity';
import { EndpointEntity } from '@/modules/access-control/domain/entities/endpoint.entity';

@Entity('resources')
export class ResourceEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => EntityEntity, (entity) => entity.resource)
  entities: EntityEntity[];

  @OneToMany(() => EndpointEntity, (endpoint) => endpoint.resource)
  endpoints: EndpointEntity[];
}
