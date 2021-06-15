import { Roles } from './../roles/entities/role.entity';
import { Users } from './entities/user.entity';
import { Body, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {In, Repository } from 'typeorm';
import { error } from 'console';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-dto';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(Roles)
    private rolesRepository: Repository<Roles>
  ) { }

  // Auth Start...
  // private readonly myUser = [
  //   {
  //     userId: 1,
  //     username: 'john',
  //     password: 'changeme',
  //   },
  //   {
  //     userId: 2,
  //     username: 'maria',
  //     password: 'guess',
  //   }
  // ]
  

  async findOneAuth(userEmail: string): Promise<User | undefined> {
    // return this.myUser.find(user => user.username === username);
    const loggedInUser = await this.usersRepository
        .createQueryBuilder("users")
        .leftJoinAndSelect("users.roles", "roles")
        // .select(["users"])
        .where({ email: userEmail })
        .getOne();
    return loggedInUser;
  }

  // End Auth...

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
      .leftJoinAndSelect("users.roles", "roles")
      .select(["users.id", "users.name", "users.mobile", "users.email", "roles"])
      // .select(["users"]) // For all users records
      .getMany();
    // console.log(results);
    return results;
  }

  async findOne(userId: number) {
    // ====== Without Query =========
    // const user = await this.usersRepository.findOne(userId);
    // const { id, name, mobile, email} = user;
    // const userInfo = { id, name, mobile, email }
    // return userInfo;

    // ====== With Query =========
    const user = await this.usersRepository
      .createQueryBuilder("user")
      .leftJoinAndSelect("user.roles","roles")
      // .select(["user.id", "user.name", "user.email", "user.mobile"])
      .select(["user.id", "user.name", "user.email", "user.mobile","roles"])
      .where(`user.id = ${userId}`)
      .getOne();
    // console.log(user);
    return user;
  }

  async logIn(user: LoginDto) {
    // ====== Without encrypting =========
    try {
      // console.log(user);
      const myPlaintextPassword = user.password;
      const loggedInUser = await this.usersRepository
        .createQueryBuilder("users")
        .select(["users.id", "users.password"])
        .where({ email: user.email })
        .getOne();
      // console.log(loggedInUser);
      if (loggedInUser) {
        const hashPassword = loggedInUser.password;
        // console.log(hashPassword);
        const isMatched = await bcrypt.compare(myPlaintextPassword, hashPassword);
        // console.log(isMatched);
        if (isMatched) {
          // console.log(await this.findOne(id));
          return this.findOne(loggedInUser.id);
        }
        else {
          throw new HttpException("Sorry!!! Your password is not matched", HttpStatus.BAD_REQUEST);
        }
      }
      else {
        throw "Sorry!!! Your email is not matched";
      }
    }
    catch (err) {
      throw new HttpException(err.message, err.status)
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

    // console.log(body.name);
    const updateUserBody = new UpdateUserDto();
    body.name && (updateUserBody.name =  body.name);
    body.mobile && (updateUserBody.mobile = body.mobile)
    body.email && (updateUserBody.email =  body.email);
    body.password && (updateUserBody.password =  body.password)
    // const { name, mobile, email, roles } = body;
    // this.usersRepository
    // .createQueryBuilder("users")
    // .update(Users)
    // .set({ 
      //   name: name && name,
      //   mobile: mobile && mobile,
      //   email: email && email,
      //   // roles: roles && roles.map(role => this.rolesRepository.update(role.id, role)),
      // })
      // .where( "id = :id", { id })
      // .execute();

      // console.log(body)
      updateUserBody && (this.usersRepository.update(id, updateUserBody))
      if(body.roles && body.roles.length > 0){
        body.roles.map( role => {
          return this.rolesRepository.update(role.id, role);
        })
        // console.log(body.roles)
      }


  }

  remove(id: number) {
    return this.usersRepository.delete(id);
  }

  async add(user: CreateUserDto) {
    try {
      // // console.log(user);
      const userObj = new Users();
      const { name, email, mobile, roles } = user;
      console.log(roles);
      // userObj.id = user.id
      // // user.id && ( userObj.id = user.id );
      // user.email && ( userObj.email = user.email );
      // user.name &&( userObj.name = user.name );
      // user.mobile && ( userObj.mobile = user.mobile );
      const saltRounds = 10;
      // const hash = bcrypt.hashSync(user?.password, saltRounds);

      const hash = bcrypt.hashSync(user.password, saltRounds);
      // user.password = hash;
      userObj.name = name;
      userObj.email = email;
      userObj.mobile = mobile;
      userObj.password = hash;

      // Entity Manager, Entity Repository diye CRUD Operation kora jay...
      // const userRoles = await this.rolesRepository.find({where:{id : In(roles)}});

      // QueryBuilder diye O CRUD kora jay
      const userRoles = await this.rolesRepository
                    .createQueryBuilder('roles')
                    .select(["roles"])
                    .where('roles.id IN (:...roles)', {roles})
                    .getMany();
      
      userObj.roles = userRoles;
      // console.log(allRoles)
      // userObj["roles"] = roles.map( role => {
      //   const filterRole = allRoles.find( curRole => Number(role) === curRole.id );
      //   // console.log(filterRole)
      //   return filterRole;
      // });

      // console.log("After filtering: \n", userObj);
      
      return  await this.usersRepository.save(userObj);
    }
    catch (error) {
      // This error is created
      throw new HttpException(error.message, error.status)
    }
  }
}
