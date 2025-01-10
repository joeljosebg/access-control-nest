import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EndpointEntity } from '@/modules/access-control/domain/entities/endpoint.entity';
import { IEndpointRepository } from '@/modules/access-control/domain/repositories/endpoint-repository.interface';
import {
  CreateEndpointDto,
  UpdateEndpointDto,
} from '@/modules/access-control/application/dto/endpoint.dto';

@Injectable()
export class EndpointRepository implements IEndpointRepository {
  constructor(
    @InjectRepository(EndpointEntity)
    private readonly repository: Repository<EndpointEntity>,
  ) {}

  async create(data: CreateEndpointDto): Promise<EndpointEntity> {
    const endpoint = this.repository.create(data);
    return this.repository.save(endpoint);
  }

  async findAll(): Promise<EndpointEntity[]> {
    return this.repository.find();
  }

  async findById(id: string): Promise<EndpointEntity | null> {
    return this.repository.findOne({ where: { id } });
  }

  async update(id: string, data: UpdateEndpointDto): Promise<void> {
    await this.repository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
