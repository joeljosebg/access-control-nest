import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { RoleEntity } from './role.entity';
import { IsNotEmpty } from 'class-validator';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'permissions', schema: 'public' })
export class PermissionEntity {
  @ApiProperty({
    description: 'The id of the permission',
    example: '1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The name of the permission',
    example: 'Create User',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  name: string;

  @ApiProperty({
    description: 'The description of the permission',
    example: 'Create a user',
  })
  @IsString()
  @Column()
  description?: string;

  @ApiProperty({
    description: 'The resource of the role',
    example: 'Document, Report, User',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  resource: string;

  @ApiProperty({
    description: 'The action of the role',
    example: 'create, read, update, delete',
  })
  @IsNotEmpty()
  @IsString()
  @Column()
  action: string; // Ej: create, read, update, delete

  @ApiProperty({
    description: 'The condition of the role',
    example: 'if user is admin',
  })
  @IsString()
  @Column({ nullable: true })
  condition?: string;

  @ManyToMany(() => RoleEntity, (role) => role.permissions)
  roles: RoleEntity[];
}
