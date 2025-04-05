import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
      example: 'John Doe',
      description: 'Ім’я користувача',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
  }