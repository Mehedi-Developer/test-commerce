import { AuthLoginDto } from './dto/auth.dto';
import { Controller, Get, Post, Body, Patch, Param, Delete, Request, UseGuards } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller('auth')
export class AuthController{
    constructor(
        private authService: AuthService
    ){}

    // @UseGuards(LocalAuthGuard)
    @ApiTags("Auth-Login")
    @ApiOperation({ summary: "Master User Login"})
    @Post("login")
    // AuthLogIn( @Body() body: AuthLoginDto ){
    AuthLogIn(@Body() body: AuthLoginDto, @Request() req ){
        // console.log(body, " -> ac ");
        console.log(body)
        // return this.authService.validateUser(body);
        console.log(req.body, " -> ac ");
        return this.authService.validateUser(req.body);
    }

}