import { Injectable } from '@nestjs/common';

import * as envalid from 'envalid';
import { IConfig } from '@app/interfaces/config.inteface';

@Injectable()
export class ConfigService {
  private readonly envConfig: IConfig;
  constructor() {
    this.envConfig = this.validate();
  }

  get DB_HOST(): string {
    return this.envConfig.DB_HOST;
  }

  get DB_PORT(): number {
    return Number(this.envConfig.DB_PORT);
  }

  get DB_USERNAME(): string {
    return this.envConfig.DB_USERNAME;
  }

  get DB_PASSWORD(): string {
    return this.envConfig.DB_PASSWORD;
  }

  get DB_DATABASE(): string {
    return this.envConfig.DB_DATABASE;
  }

  get FIREBASE_CLIENT_EMAIL(): string {
    return this.envConfig.FIREBASE_CLIENT_EMAIL;
  }

  get FIREBASE_PROJECT_ID(): string {
    return this.envConfig.FIREBASE_PROJECT_ID;
  }

  get FIREBASE_PRIVATE_KEY(): string {
    return this.envConfig.FIREBASE_PRIVATE_KEY;
  }

  get FIREBASE_PUBLIC_KEY(): string {
    return this.envConfig.FIREBASE_PUBLIC_KEY;
  }

  validate(): IConfig {
    const rule = {
      DB_HOST: envalid.str(),
      DB_PORT: envalid.num(),
      DB_USERNAME: envalid.str(),
      DB_PASSWORD: envalid.str(),
      DB_DATABASE: envalid.str(),
      FIREBASE_CLIENT_EMAIL: envalid.str(),
      FIREBASE_PROJECT_ID: envalid.str(),
      FIREBASE_PRIVATE_KEY: envalid.str(),
      FIREBASE_PUBLIC_KEY: envalid.str(),
    };

    return envalid.cleanEnv(process.env, rule);
  }
}
