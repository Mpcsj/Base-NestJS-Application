import { IsString, MinLength, IsEmail } from "class-validator"

export class AuthCredentialsDto {
    @IsString()
    @IsEmail()
    email: string


    @IsString()
    @MinLength(8)
    password: string
}