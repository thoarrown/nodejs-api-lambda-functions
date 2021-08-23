import { Entity, Column } from 'typeorm';

import { Base } from '@app/entity';

interface UserProps {
  name: string | null;
  email: string | null;
  role: string | null;
  firebaseId: string | null;
  created_at: Date;
  updated_at: Date;
  dateOfBirth: Date | null;
}

@Entity('users')
export class User extends Base<UserProps> {
  constructor(props: UserProps, id?: string) {
    super(props, id);
  }

  @Column({ type: 'varchar', length: 64, nullable: true, default: '' })
  name?: string;

  @Column({ nullable: true })
  dateOfBirth?: Date;

  @Column({ type: 'varchar', length: 64, default: null, unique: true })
  email?: string | null;

  @Column({ type: 'varchar', length: 64, default: 'USER' })
  role?: string | null;

  @Column({ type: 'varchar', length: 64, nullable: true, default: '' })
  firebaseId?: string;

  authToken?: string;
  authExpiresIn?: number;

  public static create(props: UserProps, id?: string): User {
    return new User(props, id);
  }
}
