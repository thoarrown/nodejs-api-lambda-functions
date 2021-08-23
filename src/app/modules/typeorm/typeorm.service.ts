import { Injectable, Logger } from '@nestjs/common';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

import { User, Post } from '@app/entity';

import { ConfigService } from '@app/modules/config/config.service';

@Injectable()
export class TypeormService implements TypeOrmOptionsFactory {
  private logger: Logger;

  constructor(readonly configService: ConfigService) {
    this.logger = new Logger();
  }

  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.configService.DB_HOST,
      port: this.configService.DB_PORT,
      username: this.configService.DB_USERNAME,
      password: this.configService.DB_PASSWORD,
      database: this.configService.DB_DATABASE,
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Post],
    };
  }
}
