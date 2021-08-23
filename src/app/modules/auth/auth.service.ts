import { BadGatewayException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/entity';
import { Repository } from 'typeorm';
import { AuthSignupReq } from './dto/auth.signup.dto';
import { AuthSigninReq } from './dto/auth.signin.dto';
import { UserService } from '../user/user.service';
import { AuthSignupResponse } from './response/signup.response';
import { AuthSigninResponse } from './response/signin.response';
import { AuthUserInfobyTokenResponse } from './response';
import { FirebaseAuthService } from '../firebase/firebase-auth.service';
import { FirebaseClientService } from '../firebase/firebase-client.service';

@Injectable()
export class AuthService {
  private firebaseAuth = FirebaseAuthService.auth();
  private firebaseClient = FirebaseClientService.clientApp();

  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly userService: UserService,
  ) {}

  async signup(args: AuthSignupReq): Promise<AuthSignupResponse> {
    const newUserbyFireBase = await this.firebaseAuth.createUser(args);

    const newUser = await this.userService.createOne({
      email: args.email,
      dateOfBirth: args.dateOfBirth ? new Date(args.dateOfBirth) : new Date(),
      firebaseId: newUserbyFireBase.firebaseId,
      name: args.name,
      role: args.role,
    });
    return {
      email: newUser.email,
      id: newUser.id,
      name: newUser.name,
      dateOfBirth: newUser.dateOfBirth.toISOString(),
      role: args.role,
    };
  }

  async signin(args: AuthSigninReq): Promise<AuthSigninResponse> {
    try {
      const token = await this.firebaseClient.signinEmailPass(args);
      const findUser = await this.userService.findByEmail(args.email);
      return {
        token,
        email: findUser.email,
        id: findUser.id,
        name: findUser.name,
        dateOfBirth: findUser.dateOfBirth.toISOString(),
      };
    } catch (error) {
      throw new BadGatewayException(error);
    }
  }
  async getMe(email: string): Promise<AuthUserInfobyTokenResponse> {
    const findUser = await this.userService.findByEmail(email);
    return {
      email: findUser.email,
      id: findUser.id,
      name: findUser.name,
      dateOfBirth: findUser.dateOfBirth.toISOString(),
    };
  }
}
