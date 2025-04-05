import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { AbstractEntityClass } from '../../database/abstract-entity-class';

@Entity()
export class CalendarEvent extends AbstractEntityClass<CalendarEvent>{

  @Column()
  name: string;

  @Column()
  localName: string;

  @Column()
  date: string;

  @Column()
  countryCode: string;

  @ManyToOne(() => User, user => user.calendarEvents, { onDelete: 'CASCADE' })
  user: User;
}
