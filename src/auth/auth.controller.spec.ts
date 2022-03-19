import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { getDbTestingConfig } from '../common/config/db.config';
import { getTestingEnvConfig } from '../common/config/env.config';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { getRootDirname } from '../app.util'
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
      imports: [
        TypeOrmModule.forRoot(getDbTestingConfig(getRootDirname())),
        UserModule,
        ConfigModule.forRoot({
          load: [getTestingEnvConfig]
        }),
        PassportModule.register({ defaultStrategy: "jwt" }),
        JwtModule.registerAsync({
          useFactory: (config: ConfigService) => {
            const api = config.get('api')
            return {
              secret: api['secret'],
              signOptions: {
                expiresIn: api['expire-time']
              }
            }
          },
          imports: [ConfigModule],
          inject: [ConfigService]
        })]
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
