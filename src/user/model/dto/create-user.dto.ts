import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty({
        message: "O campo nome não pode estar vazio"
    })
    name: string
    @IsEmail({
        message: "Email inválido"
    })
    email: string

    @IsString()
    @IsNotEmpty()
    @MinLength(6, {
        message: 'Senha deve ter no mínimo 6 caracteres'
    })
    @MaxLength(40, {
        message: 'Senha deve ter no máximo 40 caracteres'
    })
    @Matches(
        /((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/,
        { message: 'Senha muito fraca. A senha deve ter no mínimo 1 caractere maiúsculo, 1 caractere minúsculo e 1 caractere especial' }
    )

    password: string
}
