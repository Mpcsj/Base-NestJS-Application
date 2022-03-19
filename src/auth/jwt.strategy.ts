import { PassportStrategy } from '@nestjs/passport'
import { Strategy, ExtractJwt } from 'passport-jwt'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtPayload } from './model/jwt-payload.model';
import { UserService } from '../user/user.service'
import { User } from '../user/model/entities/user.entity'
import { ConfigService } from '@nestjs/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService,
        private configService: ConfigService
    ) {
        const api = configService.get('api')
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: api['secret']
        })
    }
    async validate(payload: JwtPayload): Promise<User> {
        const { email } = payload
        const user = await this.userService.findByEmail(email)
        if (!user) {
            throw new UnauthorizedException()
        } else {
            return user
        }
    }
}