import * as path from 'path';
import { Module, Global } from '@nestjs/common';

import { ConfigService } from './config.service';

let envFileName = `.env`;

const envFilePath = path.resolve(envFileName);
require('dotenv').config({ path: envFilePath });

@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(),
    },
  ],
  exports: [ConfigService],
})
export class ConfigModule {}
