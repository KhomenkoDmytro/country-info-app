import { ApiProperty } from '@nestjs/swagger';

export class AddHolidaysDto {
  @ApiProperty({ example: 'US' })
  countryCode: string;

  @ApiProperty({ example: 2025 })
  year: number;

  @ApiProperty({ example: ["New Year's Day", "Independence Day"], required: false })
  holidays?: string[];
}
