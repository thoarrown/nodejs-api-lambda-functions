import { User } from '@app/entity';
import { UserInfoFireBase } from '@app/interfaces/user-firebase.interface';
import { AuthService } from '@app/modules/auth/auth.service';
import { FirebaseAuthService } from '@app/modules/firebase/firebase-auth.service';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

type IRequestExtend = Request & { user: UserInfoFireBase };

@Injectable()
export class UserMiddleware implements NestMiddleware {
  async use(req: IRequestExtend, _res: Response, next) {
    const authHeaders = req.headers['authorization'];
    if (authHeaders) {
      try {
        const user = await FirebaseAuthService.auth().verifyToken(
          authHeaders.replace('Bearer ', ''),
        );
        req.user = { email: user.email, id: user.uid };
      } catch (error) {
        req.user = null;
      }
    }
    next();
  }
}
