import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
} from 'class-validator';
import { Transform } from "class-transformer";
export class PostPagingReq {
  @IsNumber()
  @ApiProperty({
    type: 'number',
    example: 10,
    required: true,
  })
  @Transform(({ value }) => Number(value))
  take: number = 0;


  @IsNumber()
  @ApiProperty({
    type: 'number',
    example: 0,
    required: true,
  })
  @Transform(({ value }) => Number(value))
  skip!: number;
}
