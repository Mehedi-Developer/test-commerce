import { Users } from './entities/user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
  ){}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const results = await this.usersRepository.find();
    // const data = [];
    const data = results.map( result => {
      const { id, name, mobile, email} = result;
      const user = { id, name, mobile, email}
      // data.push(user)
      return user;
    })
    // console.log(data)
    return data;
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne(id);
    const userInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      mobile: user.mobile
    }
    // console.log(userInfo);
    return userInfo;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.usersRepository.update(id, updateUserDto);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  add( user: CreateUserDto ){
    return this.usersRepository.save(user);
  }
}
