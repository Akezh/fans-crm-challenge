import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UserModel } from './models/UserModel';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([UserModel])],
  exports: [SequelizeModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
