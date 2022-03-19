import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from './model/dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }


  @Get(':email')
  findOne(@Param('email') email: string) {
    return this.userService.findByEmail(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
