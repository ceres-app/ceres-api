import { User, UserRequest, UserUpdateRequest } from '@/domain/entities/user';
import { IUserService } from '@/domain/ports/iuser_service';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserModel } from './schemas/user';

@Injectable()
export class MongoDBUserService implements IUserService {
  constructor(
    @InjectModel(UserModel.name) private userModel: Model<UserModel>,
  ) {}

  async create(newUser: UserRequest): Promise<User> {
    const { password, username, _id } = await this.userModel.create({
      ...newUser,
    });
    return {
      username,
      password,
      id: _id.toString(),
    };
  }

  async deleteById(id: string): Promise<User> {
    const { password, _id, username } = await this.userModel.findByIdAndDelete(
      id,
    );
    return {
      username,
      password,
      id: _id.toString(),
    };
  }

  async fetchAll(): Promise<User[]> {
    const allUsers = await this.userModel.find({});
    return allUsers.map((user) => {
      const { username, password, _id } = user;
      return { username, password, id: _id.toString() };
    });
  }

  async findById(id: string): Promise<User> {
    const { username, password, _id } = await this.userModel.findById(id);
    return { username, password, id: _id.toString() };
  }

  async findByPasswordAndUsername(
    username: string,
    password: string,
  ): Promise<User> {
    const {
      username: foundUsername,
      password: foundPassword,
      _id,
    } = await this.userModel.findOne({
      password: password,
      username: username,
    });
    return {
      username: foundUsername,
      password: foundPassword,
      id: _id.toString(),
    };
  }

  async update(id: string, newUser: UserUpdateRequest): Promise<User> {
    const { username, password, _id } = await this.userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          password: newUser.password,
          username: newUser.username,
        },
      },
    );
    return {
      username,
      password,
      id: _id.toString(),
    };
  }
}
