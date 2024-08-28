import { Body, Controller, Post, Get, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('add-user')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Get('get-user/:id')
  getUser(@Param('id') id: number) {
    return this.usersService.getUser(id);
  }
}
