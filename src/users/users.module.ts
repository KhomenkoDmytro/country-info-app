import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CalendarEvent } from './entities/calendar-event.entity';
import { User } from './entities/user.entity';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[TypeOrmModule.forFeature([User, CalendarEvent]), HttpModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
