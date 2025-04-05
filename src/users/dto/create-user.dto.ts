import { ApiProperty } from "@nestjs/swagger";
import { IsString, Length, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
    @ApiProperty({
      example: 'John Doe',
      description: 'Username',
    })
    @IsString()
    @IsNotEmpty()
    name: string;
  }