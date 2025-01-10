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
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateUserDto,
  UpdateUserDto,
} from '@/modules/user/application/dto/create-user.dto';
import { IUserService } from '@/modules/user/domain/interfaces/user-service.interface';
import { USER_SERVICE } from '@/modules/user/user.tokens';

@ApiTags('users')
@Injectable()
@Controller('users')
export class UserController {
  constructor(
    @Inject(USER_SERVICE) private readonly userService: IUserService,
  ) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.userService.delete(id);
  }
}
