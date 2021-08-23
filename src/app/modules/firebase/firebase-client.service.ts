import { BadRequestException } from '@nestjs/common';
import firebaseClient from 'firebase';

export class FirebaseClientService {
  constructor(public readonly clientApp: firebaseClient.auth.Auth) {}

  public static clientApp() {
    if (!firebaseClient.app()) {
      throw new Error('Firebase instance is undefined.');
    }
    return new FirebaseClientService(firebaseClient.auth());
  }

  async signinEmailPass(args: { email: string; password: string }) {
    return this.clientApp
      .signInWithEmailAndPassword(args.email, args.password)
      .then((user) => {
        return user.user.getIdToken(true);
      })
      .catch((error) => {
        throw new BadRequestException(error.message);
      });
  }
}
