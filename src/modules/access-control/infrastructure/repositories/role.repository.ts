import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from '@/modules/access-control/domain/entities/role.entity';
import { IRoleRepository } from '@/modules/access-control/domain/repositories/role.repository';

@Injectable()
export class RoleRepository implements IRoleRepository {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly repository: Repository<RoleEntity>,
  ) {}

  findAll() {
    return this.repository.find({ relations: ['permissions'] });
  }

  findById(id: string) {
    return this.repository.findOne({
      where: { id },
      relations: ['permissions'],
    });
  }

  create(role: RoleEntity) {
    console.log('role', role);
    return this.repository.save(role);
  }
}
