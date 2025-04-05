import { Body, Controller, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { AddHolidaysDto } from './dto/add-holidays.dto';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from './dto/create-user.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  async createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }
  @Post(':userId/calendar/holidays')
  async addHolidaysToCalendar(
    @Param('userId') userId: number,
    @Body() dto: AddHolidaysDto,
  ) {
    return this.usersService.addHolidaysToCalendar(userId, dto);
  }
}
