import { CommonUpdatableEntity } from "../../../common/model/entities/common.model.entity"
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcrypt'
import { CreatedUserDTO } from "../dto/created-user.dto";
@Entity()
export class User extends CommonUpdatableEntity {
    @PrimaryGeneratedColumn("uuid")
    id: string

    @Column({
        unique: true,
        nullable: false
    })
    email: string

    @Column({
        nullable: false
    })
    name: string

    @Column({
        nullable: false
    })
    password: string

    @Column()
    passwordSalt: string

    validatePassword = async (password: string): Promise<boolean> => {
        const hash = await bcrypt.hash(password, this.passwordSalt)
        return hash === this.password
    }

    getDto(): CreatedUserDTO {
        return {
            name: this.name,
            email: this.email
        }
    }
}
