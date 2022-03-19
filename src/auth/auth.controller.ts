import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from '../user/model/dto/create-user.dto';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './model/auth-credentials.dto';

@Controller('auth')
export class AuthController {
    constructor(private service: AuthService, private userService: UserService) { }

    @Post('/sign-in')
    @UsePipes(ValidationPipe)
    signIn(@Body() data: AuthCredentialsDto) {
        return this.service.signIn(data)
    }

    @Post('/sign-up')
    @UsePipes(ValidationPipe)
    signUp(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto)
    }
}
