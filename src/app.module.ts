import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbConfig } from './common/config/db.config';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { getEnvConfig } from './common/config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot(({
      load: [getEnvConfig]
    })),
    UserModule,
    CommonModule,
    TypeOrmModule.forRoot(getDbConfig(__dirname)),
    AuthModule
  ],
  controllers: [AppController]
})
export class AppModule { }
