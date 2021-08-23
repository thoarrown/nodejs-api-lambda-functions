import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './modules/config/config.module';
import { ConfigService } from './modules/config/config.service';
import { TypeormService } from './modules/typeorm/typeorm.service';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { PostModule } from './modules/post/post.module';
import { FirebaseService } from './modules/firebase/firebase.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useClass: TypeormService,
    }),
    ConfigModule,
    AuthModule,
    UserModule,
    PostModule,
    FirebaseService,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
