import { User } from '@app/entity';
import { NotHaveRoleException } from '@app/exceptions/not-have-role.exception';
import { IRequest } from '@app/interfaces/http.interface';
import { Role } from '@app/interfaces/role.interface';
import { IRequestExtend } from '@app/middleware/firebase.middleware';
import { AuthService } from '@app/modules/auth/auth.service';
import { UserService } from '@app/modules/user/user.service';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  CanActivate,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    readonly authService: AuthService,
    readonly userService: UserService,
  ) {}

  canActivate(context: ExecutionContext): boolean | Observable<boolean> {
    return new Promise((resolve: any) => {
      const request: IRequestExtend = context.switchToHttp().getRequest();
      this.userService
        .findByEmail(request.user.email)
        .then((user: User | undefined): any => {
          if (!user) throw new UnauthorizedException();
          const needRole: Role = this.reflector.get<Role>(
            'role',
            context.getHandler(),
          );
          if (user.role !== needRole) throw new NotHaveRoleException();
          resolve(true);
        });
    }) as any;
  }
}
