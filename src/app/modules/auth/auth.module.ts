import { User } from '@app/entity';
import { FirebaseStrategy } from '@app/strategies/firebase.strategy';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '../config/config.service';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    TypeOrmModule.forFeature([User]),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
    FirebaseStrategy,
    AuthService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
