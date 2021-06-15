import { Roles } from './roles/entities/role.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Users } from './users/entities/user.entity';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
// import { AuthModule } from './auth/auth.module';
import { AuthModule } from './auth/auth.module';
// import { APP_GUARD } from '@nestjs/core';
// import { RolesGuard } from './auth/roles.guard';
@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'my-ee-commerce',
      entities: [Users, Roles],
      synchronize: true,
      // logging:true
    }),
    UsersModule,
    RolesModule,
    AuthModule,
    // AuthModule
  ],
  controllers: [AppController],
  providers: [
    AppService
  ],
})
export class AppModule {}
