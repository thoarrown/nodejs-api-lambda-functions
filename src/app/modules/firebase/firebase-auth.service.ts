import { UserExistException } from '@app/exceptions/user-is-exist.exception';
import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import * as firebase from 'firebase-admin';
import { AuthSignupReq } from '../auth/dto/auth.signup.dto';

export class FirebaseAuthService {
  constructor(public readonly auth: firebase.auth.Auth) {}

  public static auth() {
    if (!firebase.app()) {
      throw new Error('Firebase instance is undefined.');
    }
    return new FirebaseAuthService(firebase.auth());
  }

  createUser(args: AuthSignupReq) {
    return this.auth
      .createUser({ email: args.email, password: args.password })
      .then((userCreated) => {
        return {
          email: userCreated.email,
          firebaseId: userCreated.uid,
        };
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            throw new UserExistException(error.me);
          case 'auth/weak-password':
            throw new BadRequestException(
              'Password is not strong enough. Add additional characters including special characters and numbers.',
            );
          default:
            throw new BadRequestException(error.message);
        }
      });
  }

  async validate(token: string) {
    const firebaseUser: any = await this.auth
      .verifyIdToken(token, true)
      .catch((err) => {
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseUser) {
      throw new UnauthorizedException();
    }
    return firebaseUser;
  }

  async verifyToken(token: string): Promise<firebase.auth.DecodedIdToken> {
    return this.auth
      .verifyIdToken(token)
      .then((val) => val)
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }
}
