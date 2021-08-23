import { User } from '@app/entity';
import { NotFoundUserException } from '@app/exceptions/not-found-user.exception';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/user.create.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
  ) {}

  async createOne(args: UserCreateDto): Promise<User> {
    const newUser: User = await this.userRepo.create({
      email: args.email,
      firebaseId: args.firebaseId,
      dateOfBirth: args.dateOfBirth ? new Date(args.dateOfBirth) : new Date(),
      ...(args.role && { role: args.role }),
      ...(args.name && { name: args.name }),
    });
    await this.userRepo.save(newUser);

    return newUser;
  }
  async findByEmail(email: string): Promise<User> {
    const user: User = await this.userRepo.findOne({
      where: { email },
    });
    if (!user) throw new NotFoundUserException();
    return user;
  }
}
