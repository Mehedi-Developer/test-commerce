import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
    
  ) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }

  @Post()
  add( @Body() user: CreateUserDto ) {
    try{
      // console.log(user);
      const userObj = new Users();
      userObj.id = user.id
      // user.id && ( userObj.id = user.id );
      user.email && ( userObj.email = user.email );
      user.name &&( userObj.name = user.name );
      user.mobile && ( userObj.mobile = user.mobile );
      return this.usersService.add(userObj);
    }
    catch(err){
      console.log(err);
    }
  }
}
