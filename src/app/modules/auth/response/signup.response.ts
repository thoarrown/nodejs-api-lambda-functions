import { ApiProperty } from '@nestjsx/crud/lib/crud';

export class AuthSignupResponse {
  @ApiProperty({
    type: String,
    description: 'uuid',
  })
  id: string;

  @ApiProperty({
    type: String,
    description: 'Name of user',
  })
  name: string;

  @ApiProperty({
    type: String,
    description: 'Date of birth user',
  })
  dateOfBirth: string;

  @ApiProperty({
    type: String,
    description: 'Email user',
  })
  email: string;

  @ApiProperty({
    type: String,
    description: 'Role of user',
  })
  role?: string;
}
