import { Users } from './entities/user.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { error } from 'console';
import * as bcrypt from 'bcrypt';

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
    // ====== Without Query Is Bad Practice / Not Convention =========
    // const results = await this.usersRepository.find();
    // // const data = [];
    // const data = results.map( result => {
      //   const { id, name, mobile, email } = result;
      //   const user = { id, name, mobile, email} 
      //   // data.push(user)
      //   return user;
      // })
      // console.log(data)
      // return data;
      
    // ====== Without Query Is Good Practice / Convention =========
    const results = await this.usersRepository
    .createQueryBuilder("users")
    .select(["users.id","users.name", "users.mobile", "users.email"])
    // .select(["users"]) // For all users records
    .getMany();
    // console.log(results);
    return results;
  }

  async findOne( userId: number) {
    // ====== Without Query =========
    // const user = await this.usersRepository.findOne(userId);
    // const { id, name, mobile, email} = user;
    // const userInfo ={ id, name, mobile, email }
    // return userInfo;

    // ====== With Query =========
    const user = await this.usersRepository
    .createQueryBuilder("users")
    .select(["users.id", "users.name", "users.email", "users.mobile"])
    .where(`users.id = ${userId}`)
    .getOne();
    // console.log(user);
    return user;
  }

  async logIn( user: CreateUserDto){

    // ====== Without encrypting =========
    try{
      const myPlaintextPassword = user.password;
      const loggedInUser = await this.usersRepository
      .createQueryBuilder("users")
      .select(["users.id","users.password"])
      .where({email: user.email})
      .getOne();
      // console.log(loggedInUser);
      if(loggedInUser){
        const hashPassword = loggedInUser.password;
        // console.log(hashPassword);
        const isMatched = await bcrypt.compare( myPlaintextPassword, hashPassword );
        // console.log(isMatched);
        if(isMatched){
          // console.log(await this.findOne(id));
          return this.findOne(loggedInUser.id);
        }
        else{
          throw new HttpException( "Sorry!!! Your password is not matched", HttpStatus.BAD_REQUEST );
        }
      }
      else{
        throw "Sorry!!! Your email is not matched";
      }
    }
    catch( err ){
     throw new HttpException( err.message, err.status )
    }


    // ====== Without encrypting =========

    // try{
    //   const loggedInUser = await this.usersRepository
    //   .createQueryBuilder("users")
    //   .select(["users.id","users.name", "users.mobile","users.email"])
    //   .where({email: user.email}  && {password: user.password})
    //   .getOne();
    //   if(loggedInUser){
    //     // console.log(loggedInUser);
    //     return loggedInUser;
    //   }
    //   else{
    //     throw "Sorry!!! Your email or password was not matched";
    //   }
    // }
    // catch( err ){
    //   // console.log(err);
    //   return err;
    // }
    
  }

  update(id: number, body: UpdateUserDto) {
    return this.usersRepository.update(id, body);
  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async add( user: CreateUserDto ){
    try{
      // // console.log(user);
      // const userObj = new Users();
      // userObj.id = user.id
      // // user.id && ( userObj.id = user.id );
      // user.email && ( userObj.email = user.email );
      // user.name &&( userObj.name = user.name );
      // user.mobile && ( userObj.mobile = user.mobile );
      const saltRounds = 10;
      // const hash = bcrypt.hashSync(user?.password, saltRounds);
      const hash = bcrypt.hashSync( user.password, saltRounds );
      user.password = hash;
      return  await this.usersRepository.save(user);
    }
    catch( error ){
      // This error is created
      throw new HttpException( error.message, error.status )
    }
  }
}
