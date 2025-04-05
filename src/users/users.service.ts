import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CalendarEvent } from './entities/calendar-event.entity';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom } from 'rxjs';
import { AddHolidaysDto } from './dto/add-holidays.dto';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    @InjectRepository(CalendarEvent)
    private calendarRepo: Repository<CalendarEvent>,
    private readonly config: ConfigService,
    private readonly http: HttpService,
  ) { }

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = this.userRepo.create(dto);
    return await this.userRepo.save(user);
  }

  async addHolidaysToCalendar(userId: number, dto: AddHolidaysDto) {
    const { countryCode, year, holidays } = dto;

    const url = `${this.config.get('NAGER_API')}/PublicHolidays/${year}/${countryCode}`;
    const response = await lastValueFrom(this.http.get(url));
    let selected = response.data;

    if (holidays?.length) {
      selected = selected.filter(h => holidays.includes(h.name));
    }

    let user = await this.userRepo.findOne({
      where: { id: userId },
      relations: ['calendarEvents'],
    });

    if (!user) {
      user = this.userRepo.create({ id: userId, name: `User ${userId}` });
      await this.userRepo.save(user);
    }

    const existingEvents = user.calendarEvents || [];

    const isDuplicate = (eventName: string, date: string) =>
      existingEvents.some(
        e => e.name === eventName && e.date === date,
      );

    const newEvents = selected
      .filter(h => !isDuplicate(h.name, h.date))
      .map(h => this.calendarRepo.create({
        name: h.name,
        localName: h.localName,
        date: h.date,
        countryCode,
        user,
      }));

    if (newEvents.length) {
      await this.calendarRepo.save(newEvents);
    }

    return {
      message: `Added ${newEvents.length} new holiday event(s) for user ${userId}`,
      events: newEvents,
    };
  }

}
