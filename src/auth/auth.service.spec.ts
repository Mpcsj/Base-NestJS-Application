import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRepository } from '../user/user.repository';
import { getDbTestingConfig } from '../common/config/db.config';
import { getTestingEnvConfig } from '../common/config/env.config';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { getRootDirname } from '../app.util'
describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
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

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
