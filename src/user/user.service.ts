import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { CreateUserDto } from './model/dto/create-user.dto';
import { UpdateUserDto } from './model/dto/update-user.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcrypt'
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from '../auth/model/auth-credentials.dto';
import { User } from './model/entities/user.entity';
@Injectable()
export class UserService {

  constructor(
    @InjectRepository(UserRepository)
    private repository: UserRepository
  ) {
  }
  async create(createUserDto: CreateUserDto) {
    try {
      const existingUser = await this.findByEmail(createUserDto.email)
      if (existingUser) {
        throw new ConflictException(`Email ${createUserDto.email} já cadastrado`)
      }
      const user = this.repository.create()
      user.email = createUserDto.email
      user.passwordSalt = await bcrypt.genSalt()
      user.password = await this.hashPassword(createUserDto.password, user.passwordSalt)
      user.name = createUserDto.name
      await user.save()
      return user.getDto()
    } catch (error) {
      throw new InternalServerErrorException(error)
    }
  }

  private hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt)
  }

  findByEmail(email: string) {
    return this.repository.findOne({ email })
  }

  findById(id: string) {
    return this.repository.findOne({ id })
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async validateUserPassword(credentials: AuthCredentialsDto): Promise<User> {
    const { email, password } = credentials
    const user = await this.repository.findOne({ email })
    if (user && await user.validatePassword(password)) {
      return user
    } else {
      return null
    }
  }
}
