import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserModel } from './models/UserModel';
import { SequelizeModule } from '@nestjs/sequelize';
import { AuthGuard } from 'src/auth/auth.guard';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  exports: [SequelizeModule],
  controllers: [UsersController],
  providers: [UsersService, JwtService, AuthGuard],
})
export class UsersModule {}
