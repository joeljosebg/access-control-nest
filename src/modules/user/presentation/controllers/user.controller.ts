import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Injectable,
  Inject,
  UseGuards,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import {
  CreateUserDto,
  UpdateUserDto,
  UserResponseWithOutPasswordDto,
} from '@/modules/user/application/dto/create-user.dto';
import { IUserService } from '@/modules/user/domain/interfaces/user-service.interface';
import { USER_SERVICE } from '@/modules/user/user.tokens';
import { JwtAuthGuard } from '@/modules/auth/guards/jwt-auth.guard';
import { UserEntity } from '@/modules/user/domain/entities/user.entity';
import { PermissionsGuard } from '@/modules/access-control/presentation/guards/permissions.guard';
import { QueryOptionsDto } from '@/modules/shared/applications/dto/query-options.dto';
import { RequirePermissions } from '@/modules/access-control/presentation/decorators/permissions.decorator';

@ApiTags('users')
@Injectable()
@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('create:user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create a user' })
  @ApiResponse({
    status: 200,
    description: 'Returns the created user',
    type: UserEntity,
  })
  @Post()
  create(
    @Body() createUserDto: CreateUserDto,
  ): Promise<UserResponseWithOutPasswordDto> {
    return this.userService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('readAll:user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({
    status: 200,
    description: 'Returns all users',
    type: [UserEntity],
  })
  @Get()
  findAll(@Query() queryOptions: QueryOptionsDto) {
    return this.userService.findAll(queryOptions);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('readAll:user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get all users paginated' })
  @ApiResponse({
    status: 200,
    description: 'Returns all users',
    type: [UserEntity],
  })
  @Get('paginated')
  findAllPaginated(@Query() queryOptions: QueryOptionsDto) {
    return this.userService.findAllPaginated(queryOptions);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('readOne:user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Get a user by id' })
  @ApiResponse({
    status: 200,
    description: 'Returns the user',
    type: UserEntity,
  })
  @Get(':id')
  findOne(@Param('id') id: string, @Query() queryOptions: QueryOptionsDto) {
    return this.userService.findOne(id, queryOptions);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('update:user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Update a user' })
  @ApiResponse({
    status: 200,
    description: 'Returns the updated user',
    type: UserEntity,
  })
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions('delete:user')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({
    status: 200,
    description: 'Returns the deleted user',
    type: UserEntity,
  })
  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
