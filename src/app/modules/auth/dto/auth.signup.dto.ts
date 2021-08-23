import { Role } from '@app/interfaces/role.interface';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsOptional,
  IsNotEmpty,
  Length,
  IsEmail,
  ValidateIf,
  IsString,
  IsDate,
  MaxLength,
} from 'class-validator';

export class AuthSignupReq {
  @IsEmail()
  @MaxLength(100)
  @ApiProperty({
    type: 'email',
    example: 'demo@example.com',
    required: true,
  })
  email!: string;

  @IsNotEmpty()
  @Length(6, 64)
  @ApiProperty({
    type: 'string',
    example: 'xxxx',
    required: true,
  })
  password!: string;

  @IsString()
  @MaxLength(64)
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: 'Jamdam',
    required: true,
  })
  name?: string;

  @IsDate()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: '1990-09-09',
    required: false,
  })
  @Type(() => Date)
  dateOfBirth?: Date;

  @IsString()
  @IsOptional()
  @ApiProperty({
    type: 'string',
    example: 'USER',
    required: false,
  })
  role?: Role.USER;
}
