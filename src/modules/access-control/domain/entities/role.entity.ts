import { PermissionEntity } from '@/modules/access-control/domain/entities/permission.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';

@Entity({ name: 'roles', schema: 'public' })
export class RoleEntity {
  @ApiProperty({
    description: 'The id of the role',
    example: '1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the role',
    example: 'Admin',
  })
  @Column()
  name: string;

  @ApiProperty({
    description: 'The permissions of the role',
    example: 'Admin, User',
  })
  @ManyToMany(() => PermissionEntity, (permission) => permission.roles, {
    cascade: true,
  })
  @JoinTable({
    name: 'roles_permissions',
    joinColumn: { name: 'roleId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'permissionId', referencedColumnName: 'id' },
  })
  permissions: PermissionEntity[];

  @ApiProperty({
    description: 'The users of the role',
    example: '1',
  })
  @ManyToMany(() => UserEntity, (user) => user.roles)
  users: UserEntity[];
}
