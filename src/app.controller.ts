import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { AuthLoginDto } from './auth/dto/auth.dto';
import { JwtAuthGuard } from './auth/jwt-auth.guard';
import { LocalAuthGuard } from './auth/local-auth.guard';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService
    
  ) {}

  // @UseGuards(LocalAuthGuard)
  @Get()
  // @ApiBearerAuth()
  getHello(): string {
    return this.appService.getHello();
  }

  @ApiTags("Auth-Login")
  // @ApiBearerAuth()
  @ApiOperation({ summary: "Master User Login From App Module"})
  @Post('auth/login')
  async login(@Body() body: AuthLoginDto, @Request() req) {
    // console.log(body);
    // return req.user;
    const user = await this.authService.login(body);
    // console.log("user ==== ",user);
    // return access_token;
    return user;

  }
}
