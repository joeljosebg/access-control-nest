import { EndpointEntity } from '@/modules/access-control/domain/entities/endpoint.entity';
import {
  CreateEndpointDto,
  UpdateEndpointDto,
} from '@/modules/access-control/application/dto/endpoint.dto';

export interface IEndpointService {
  create(data: CreateEndpointDto): Promise<EndpointEntity>;
  findAll(): Promise<EndpointEntity[]>;
  findById(id: string): Promise<EndpointEntity | null>;
  update(id: string, data: UpdateEndpointDto): Promise<void>;
  delete(id: string): Promise<void>;
}
