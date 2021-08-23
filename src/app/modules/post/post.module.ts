import { Post, User } from '@app/entity';
import { FirebaseMiddleware } from '@app/middleware/firebase.middleware';
import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../user/user.service';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, User])],
  controllers: [PostController],
  providers: [PostService, AuthService, UserService],
})
export class PostModule {
  configure = (consumer: MiddlewareConsumer) => {
    consumer
      .apply(FirebaseMiddleware)
      .forRoutes(
        { path: 'post', method: RequestMethod.POST },
        { path: 'post/:id', method: RequestMethod.PUT },
        { path: 'post/:id', method: RequestMethod.DELETE },
        { path: 'post/:slug', method: RequestMethod.GET },
      );
  };
}
