import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from 'src/user/user.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UserModule,
        ConfigModule,
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
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule { }
