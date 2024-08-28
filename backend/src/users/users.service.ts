import { Injectable } from '@nestjs/common';
import { UserModel } from './models/UserModel';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectModel } from '@nestjs/sequelize';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(UserModel)
    private userModel: typeof UserModel,
  ) {}

  async createUser(userDetails: CreateUserDto) {
    const newUser = await this.userModel.create(userDetails);
    return newUser;
  }

  async getUser(id: number) {
    const user = await this.userModel.findByPk(id);
    return user;
  }

  async getUserByEmail(email: string) {
    const user = await this.userModel.findOne({ where: { email } });
    return user;
  }
}
