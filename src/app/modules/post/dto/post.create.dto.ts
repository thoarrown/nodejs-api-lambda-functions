import { ApiProperty } from '@nestjs/swagger';
import {
  Length,
  MinLength,
  IsEmail,
  IsString,
  IsNotEmpty,
} from 'class-validator';

export class PostCreateReq {
  @IsString()
  @ApiProperty({
    type: 'string',
    example: 'Lorem Ipsum',
    required: true,
  })
  @MinLength(1)
  title!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example:
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry',
    required: true,
  })
  content!: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    example: 'hello-world',
    required: true,
  })
  slug!: string;
}
