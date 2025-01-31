import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';

@ApiTags('Users')
@Entity({ name: 'users', schema: 'public' })
export class UserEntity {
  @ApiProperty({
    description: 'The id of the user',
    example: '1',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'The username of the user',
    example: 'john_doe',
  })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    description: 'The email of the user',
    example: 'john_doe@example.com',
  })
  @Column({ unique: true })
  email: string;

  @ApiProperty({
    description: 'The first name of the user',
    example: 'John',
  })
  @Column({ nullable: true })
  firstName: string;

  @ApiProperty({
    description: 'The last name of the user',
    example: 'Doe',
  })
  @Column({ nullable: true })
  lastName: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'password123',
  })
  @Column()
  password: string;

  @ApiProperty({
    description: 'The roles of the user',
    example: 'Admin, User',
  })
  @ManyToMany(() => RoleEntity, (role) => role.users, {
    cascade: true,
  })
  @JoinTable({
    name: 'users_roles',
    joinColumn: { name: 'userId', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'roleId', referencedColumnName: 'id' },
  })
  roles: RoleEntity[];

  constructor(
    username: string,
    email: string,
    password: string,
    id?: string,
    firstName?: string,
    lastName?: string,
  ) {
    if (id) {
      this.id = id;
    }
    this.username = username;
    this.email = email;
    this.password = password;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  /**
   * Método para actualizar propiedades.
   */
  updateDetails(username?: string, email?: string): void {
    if (username) this.username = username;
    if (email) this.email = email;
  }

  /**
   * Método para validar la contraseña.
   */
  validatePassword(password: string): boolean {
    return this.password === password;
  }
}
