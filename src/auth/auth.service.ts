import { Users } from './../users/entities/user.entity';
import { getRepository, Repository } from 'typeorm';
import { Body, Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthLoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(Users)
        // private usersRepository: Repository<Users>,
        // private usersService: UsersService,
        private jwtService: JwtService
        
    ) {}

    async validateUser(@Body() body: AuthLoginDto): Promise<any> {
        // const user = await this.usersService.authLogin(body);
        console.log(body, " -> as ");
        const { name, password } = body;
        const user = await getRepository(Users)
                           .createQueryBuilder("users")
                           .select(["users"])
                           .where(`users.name = :name`, { name })
                           .getOne();
        // console.log( user )
        if( user ){
            const hashPassword = user.password;
            // console.log(hashPassword);
            const isMatched = await bcrypt.compare(password, hashPassword);
            if(isMatched){
                // console.log(body, "\n -> This user is valid")
                const token = await this.login(user);
                console.log(token);
            }

        }
        else{
            throw new HttpException( "This user is not valid", HttpStatus.NON_AUTHORITATIVE_INFORMATION)
        }
        // if (user && user.password === pass) {
        //   const { password, ...result } = user;
        //   return result;
        // }
        // return null;
      }

      async login(user: any) {
        const payload = { name: user.name, id: user.id };
        console.log("this.jwtService ======= ", this.jwtService)
        console.log(payload);
        // return {
        //   access_token: this.jwtService.sign(payload)
        // };
      }
}
