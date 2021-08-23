import { User } from '@app/entity';
import { IUser } from '@app/interfaces/user.interface';
import { ConfigService } from '@app/modules/config/config.service';
import { UserService } from '@app/modules/user/user.service';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class FirebaseStrategy extends PassportStrategy(Strategy) {
  constructor(
    readonly configService: ConfigService,
    readonly userService: UserService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.FIREBASE_PUBLIC_KEY,
    });
  }

  async validate(payload) {
    const user: User = await this.userService.findByEmail(payload.email);
    const nextUser: IUser = {
      id: user.id,
      name: user.name,
      firebaseId: payload.user_id,
      email: payload.email,
      role: user.role,
    };
    return nextUser;
  }
}
