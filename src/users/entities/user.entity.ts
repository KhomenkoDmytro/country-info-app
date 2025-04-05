import { Entity, PrimaryGeneratedColumn, Column, OneToMany, UpdateDateColumn, CreateDateColumn } from 'typeorm';
import { CalendarEvent } from './calendar-event.entity';
import { AbstractEntityClass } from '../../database/abstract-entity-class';

@Entity()
export class User extends AbstractEntityClass<User> {

  @Column()
  name: string;

  @OneToMany(() => CalendarEvent, event => event.user, { cascade: true })
  calendarEvents: CalendarEvent[];

}
