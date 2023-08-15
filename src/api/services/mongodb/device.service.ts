import { DATABASE_URL } from '@/constants';
import {
  Device,
  DeviceRequest,
  DeviceUpdateRequest,
} from '@/domain/entities/device';
import { IDeviceService } from '@/domain/ports/idevice_service';
import { Injectable } from '@nestjs/common';
import mongoose from 'mongoose';
import { DeviceModel } from './schemas/device';

@Injectable()
export class MongoDBDeviceService implements IDeviceService {
  async connect() {
    mongoose.set('strictQuery', false);
    return mongoose.connect(DATABASE_URL);
  }

  async create(userId: string, newDevice: DeviceRequest): Promise<Device> {
    await this.connect();
    const { _id, isWorking, name, serialID, user } = await (
      await DeviceModel.create({
        isWorking: newDevice.isWorking,
        name: newDevice.name,
        serialID: newDevice.serialID,
        user: userId,
      })
    ).populate('user');

    return {
      isWorking,
      name,
      serialID,
      user,
      id: _id.toString(),
    };
  }

  async fetchAll(userId: string): Promise<Device[]> {
    await this.connect();
    const allDevices = await DeviceModel.find({
      user: userId,
    });
    return allDevices.map((device) => {
      const { isWorking, name, serialID, user, _id } = device;
      return {
        isWorking,
        name,
        serialID,
        user,
        id: _id.toString(),
      };
    });
  }

  async update(
    userId: string,
    id: string,
    newDevice: DeviceUpdateRequest,
  ): Promise<Device> {
    await this.connect();
    const { _id, isWorking, name, serialID, user } = await (
      await DeviceModel.findOneAndUpdate(
        { _id: id, user: userId },
        {
          isWorking: newDevice.isWorking,
          name: newDevice.name,
          serialID: newDevice.serialID,
          user: newDevice.userId,
        },
      )
    ).populate('user');

    return {
      isWorking,
      name,
      serialID,
      user,
      id: _id.toString(),
    };
  }

  async deleteById(userId: string, id: string): Promise<Device> {
    await this.connect();
    const { _id, isWorking, name, serialID, user } = await (
      await DeviceModel.findOneAndDelete({ _id: id, user: userId })
    ).populate('user');

    return {
      isWorking,
      name,
      serialID,
      user,
      id: _id.toString(),
    };
  }

  async findById(userId: string, id: string): Promise<Device> {
    await this.connect();
    const { _id, isWorking, name, serialID, user } = await (
      await DeviceModel.findOne({ _id: id, user: userId })
    ).populate('user');

    return {
      isWorking,
      name,
      serialID,
      user,
      id: _id.toString(),
    };
  }
}
