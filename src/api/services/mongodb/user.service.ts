import { DATABASE_URL } from '@/constants';
import { User, UserRequest, UserUpdateRequest } from '@/domain/entities/user';
import { IUserService } from '@/domain/ports/iuser_service';
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { UserModel } from './schemas/user';

@Injectable()
export class MongoDBUserService implements IUserService {
  async connect() {
    mongoose.set('strictQuery', false);
    return mongoose.connect(DATABASE_URL);
  }

  async create(newUser: UserRequest): Promise<User> {
    await this.connect();
    const { password, username, _id } = await UserModel.create({
      ...newUser,
    });
    return {
      username,
      password,
      id: _id.toString(),
    };
  }

  async deleteById(id: string): Promise<User> {
    await this.connect();
    const { password, _id, username } = await UserModel.findByIdAndDelete(id);
    return {
      username,
      password,
      id: _id.toString(),
    };
  }

  async fetchAll(): Promise<User[]> {
    await this.connect();
    const allUsers = await UserModel.find({});
    return allUsers.map((user) => {
      const { username, password, _id } = user;
      return { username, password, id: _id.toString() };
    });
  }

  async findById(id: string): Promise<User> {
    await this.connect();
    const { username, password, _id } = await UserModel.findById(id);
    return { username, password, id: _id.toString() };
  }

  async findByPasswordAndUsername(
    username: string,
    password: string,
  ): Promise<User> {
    await this.connect();
    const {
      username: foundUsername,
      password: foundPassword,
      _id,
    } = await UserModel.findOne({
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
    await this.connect();
    const { username, password, _id } = await UserModel.findByIdAndUpdate(id, {
      $set: {
        password: newUser.password,
        username: newUser.username,
      },
    });
    return {
      username,
      password,
      id: _id.toString(),
    };
  }
}
