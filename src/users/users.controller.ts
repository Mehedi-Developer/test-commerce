import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Users } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { LoginDto } from './dto/login-dto';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorators';
import { Role } from 'src/auth/roles.enum';
import { RolesGuard } from 'src/auth/roles.guard';
import { SetMetadata } from '@nestjs/common';

// @UseGuards(JwtAuthGuard, RolesGuard)

@UseGuards(JwtAuthGuard)
// @UseGuards(RolesGuard)
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService
    
  ) {}

  @Post("create")
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiTags("CRUD-OPERATION-IN-USER")
  @ApiOperation({summary: "Find All Users"})
  // RolesGuard Use Na korleo RolesGuard Interface e jay...keno...?
  @Get("all")
  // @SetMetadata("roles", "admin")
  // Ekadhik Role hole kivabe call hobe....?
  @Roles(Role.Client)
  @UseGuards(JwtAuthGuard, RolesGuard)
  findAll() {
    // console.log({user});
    return this.usersService.findAll();
  }

  // @UseGuards(LocalAuthGuard)
 
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
  @ApiOperation({summary: `User Sign Up Where Finding User-Roles By Number Element Like "roles": [1, 2, 3, ...] From Role Repo.`})
  @Post("sign-up")
  add( @Body() user: CreateUserDto ) {
    // console.log(user)
    return this.usersService.add(user);
  }
}
