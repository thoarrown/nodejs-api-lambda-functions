import { IUser } from '@app/interfaces/user.interface';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (_data: unknown, executionCtx: ExecutionContext): IUser => {
    const [req] = executionCtx.getArgs();
    return req.user;
  },
);
