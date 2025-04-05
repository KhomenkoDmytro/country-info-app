import { ApiProperty } from '@nestjs/swagger';
import {
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class AbstractEntityClass<T> {
  @ApiProperty({ description: 'Identifier', nullable: false })
  @PrimaryGeneratedColumn()
  id: number;

  constructor(item: Partial<T>) {
    Object.assign(this, item);
  }
}
