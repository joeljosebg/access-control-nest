import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Injectable,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import {
  CreateEndpointDto,
  UpdateEndpointDto,
} from '@/modules/access-control/application/dto/endpoint.dto';
import { ENDPOINT_SERVICE } from '@/modules/access-control/access-control.tokens';
import { IEndpointService } from '@/modules/access-control/domain/interfaces/endpoint-service.interface';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { EndpointEntity } from '@/modules/access-control/domain/entities/endpoint.entity';

@ApiTags('Endpoints')
@Controller('endpoints')
@Injectable()
export class EndpointsController {
  constructor(
    @Inject(ENDPOINT_SERVICE)
    private readonly endpointService: IEndpointService,
  ) {}

  @ApiOperation({ summary: 'Get all endpoints' })
  @ApiResponse({
    status: 200,
    description: 'Returns all endpoints',
    type: EndpointEntity,
  })
  @Get()
  findAllEndpoints() {
    return this.endpointService.findAll();
  }

  @ApiOperation({ summary: 'Create a endpoint' })
  @ApiResponse({
    status: 201,
    description: 'Returns the created endpoint',
    type: EndpointEntity,
  })
  @Post()
  createEndpoint(@Body() createEndpointDto: CreateEndpointDto) {
    return this.endpointService.create(createEndpointDto);
  }

  @ApiOperation({ summary: 'Update a resource' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated endpoint',
    type: EndpointEntity,
  })
  @Put(':id')
  updateEndpoint(
    @Param('id') id: string,
    @Body() updateEndpointDto: UpdateEndpointDto,
  ) {
    return this.endpointService.update(id, updateEndpointDto);
  }

  @ApiOperation({ summary: 'Delete a resource' })
  @ApiResponse({
    status: 200,
    description: 'Returns the deleted endpoint',
    type: EndpointEntity,
  })
  @Delete(':id')
  deleteEndpoint(@Param('id') id: string) {
    return this.endpointService.delete(id);
  }
}
