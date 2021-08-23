import { ApiProperty } from '@nestjs/swagger';
import { Length, MinLength, IsEmail } from 'class-validator';

export class AuthSigninReq {
  @IsEmail()
  @ApiProperty({
    type: 'email',
    example: 'demo@example.com',
    required: true,
  })
  @MinLength(6)
  email!: string;

  @Length(6, 64)
  @ApiProperty({
    type: 'string',
    example: 'xxxx',
    required: true,
  })
  password!: string;
}
