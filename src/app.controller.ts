import { Body, Controller, Get, Post, Request } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthLoginDto } from './auth/dto/auth.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags("Auth-Login")
  @ApiOperation({ summary: "Master User Login From App Module"})
  @Post("app/login")
  // AuthLogIn( @Body() body: AuthLoginDto ){
  AuthLogIn(@Body() body: AuthLoginDto, @Request() req ){
      // console.log(body, " -> ac ");
      // return this.authService.validateUser(body);
      console.log(req.body, " -> appC ");
      // return this.authService.validateUser(req.body);
  }
}
