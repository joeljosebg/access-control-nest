import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { EndpointEntity } from '@/modules/access-control/domain/entities/endpoint.entity';
import {
  CreateEndpointDto,
  UpdateEndpointDto,
} from '@/modules/access-control/application/dto/endpoint.dto';
import { IEndpointRepository } from '@/modules/access-control/domain/repositories/endpoint-repository.interface';
import { ENDPOINT_REPOSITORY } from '@/modules/access-control/access-control.tokens';
import { IEndpointService } from '@/modules/access-control/domain/interfaces/endpoint-service.interface';

@Injectable()
export class EndpointService implements IEndpointService {
  constructor(
    @Inject(ENDPOINT_REPOSITORY)
    private readonly endpointRepository: IEndpointRepository,
  ) {}

  async create(createEndpointDto: CreateEndpointDto): Promise<EndpointEntity> {
    return this.endpointRepository.create(createEndpointDto);
  }

  async findAll(): Promise<EndpointEntity[]> {
    return this.endpointRepository.findAll();
  }

  async findById(id: string): Promise<EndpointEntity> {
    const endpoint = await this.endpointRepository.findById(id);
    if (!endpoint) {
      throw new NotFoundException(`Endpoint with ID "${id}" not found`);
    }
    return endpoint;
  }

  async update(id: string, data: UpdateEndpointDto): Promise<void> {
    await this.endpointRepository.update(id, data);
  }

  async delete(id: string): Promise<void> {
    await this.endpointRepository.delete(id);
  }
}
