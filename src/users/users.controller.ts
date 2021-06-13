import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';

@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
    
  ) {}

  // @Post()
  // create(@Body() createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  @ApiTags("CRUD-OPERATION-IN-USER")
  @ApiOperation({summary: "Find All Users"})
  @Get("all")
  findAll() {
    return this.usersService.findAll();
  }

  @ApiTags("CRUD-OPERATION-IN-USER")
  @ApiOperation({summary: "Find A User By Id"})
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @ApiTags("CRUD-OPERATION-IN-USER")
  @ApiOperation({summary: "Update A User By Id"})
  @Patch(':id')
  // update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
  update(@Param('id') id: string, @Body() body: UpdateUserDto) {
    // console.log(id);
    return this.usersService.update(+id, body);
  }
    
  @ApiTags("CRUD-OPERATION-IN-USER")
  @ApiOperation({summary: "Delete A User By Id"})
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
    
  @ApiTags("User-Login")
  @ApiOperation({ summary: "Master User Login"})
  @Post("login")
  logIn( @Body() user: LoginDto){
    console.log(user);
    return this.usersService.logIn(user);
  }
  
  @ApiTags("Registration")
  @ApiOperation({summary: "User Sign Up"})
  @Post("sign-up")
  add( @Body() user: CreateUserDto ) {
    return this.usersService.add(user);
  }
}
