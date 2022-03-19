import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { AuthCredentialsDto } from './model/auth-credentials.dto';
import { JwtPayload } from './model/jwt-payload.model';
import { JwtService } from '@nestjs/jwt';
import { SignInPayload } from './model/sign-in-payload.model';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name)
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
        private configService: ConfigService
    ) { }

    async signIn(credentials: AuthCredentialsDto): Promise<SignInPayload> {
        const result = await this.userService.validateUserPassword(credentials)
        if (!result) {
            throw new UnauthorizedException('Invalid credentials')
        }
        const apiConfig = this.configService.get('api')
        const payload: JwtPayload = { email: result.email }
        const token = await this.jwtService.sign(payload)
        const refreshToken = await this.jwtService.sign(payload, {
            secret: apiConfig['secret'],
            expiresIn: apiConfig['refresh-token-expire-time']
        })
        return { token, refreshToken }
    }

}
