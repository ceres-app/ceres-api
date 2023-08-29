import { MongoDBDeviceService } from '@/api/services/mongodb/device.service';
import { MQTTBrokerService } from '@/api/services/mqtt/mqtt_broker_service';
import { DeviceRequest } from '@/domain/entities/device';
import { Create } from '@/domain/use_cases/devices/create';
import { DeleteById } from '@/domain/use_cases/devices/delete_by_id';
import { FetchAll } from '@/domain/use_cases/devices/fetch_all';
import { TurnOff } from '@/domain/use_cases/devices/turn_off';
import { TurnOn } from '@/domain/use_cases/devices/turn_on';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

@Controller('/users/:userId/devices')
export class DeviceController {
  @Post('/')
  async create(
    @Param('userId') userId: string,
    @Body() newDevice: DeviceRequest,
  ) {
    const createUC = new Create(new MongoDBDeviceService());
    const createdDevice = await createUC.execute({
      userId,
      newDevice,
    });
    return createdDevice;
  }

  @Patch('/:deviceId/on')
  async turnOn(
    @Param('userId') userId: string,
    @Param('deviceId') deviceId: string,
  ) {
    const turnOnUC = new TurnOn(
      new MongoDBDeviceService(),
      new MQTTBrokerService(),
    );
    await turnOnUC.execute({
      id: deviceId,
      userId,
    });
  }

  @Patch('/:deviceId/off')
  async turnOff(
    @Param('userId') userId: string,
    @Param('deviceId') deviceId: string,
  ) {
    const turnOffUC = new TurnOff(
      new MongoDBDeviceService(),
      new MQTTBrokerService(),
    );
    await turnOffUC.execute({
      id: deviceId,
      userId,
    });
  }

  @Get('/')
  async fecthAll(@Param('userId') userId: string) {
    const fecthAllUC = new FetchAll(new MongoDBDeviceService());
    const allDevices = await fecthAllUC.execute({
      userId,
    });
    return allDevices;
  }

  @Delete('/:deviceId')
  async deleteBYid(
    @Param('userId') userId: string,
    @Param('deviceId') deviceId: string,
  ) {
    const deleteByIdUC = new DeleteById(new MongoDBDeviceService());
    const deletedDevice = await deleteByIdUC.execute({
      id: deviceId,
      userId,
    });
    return deletedDevice;
  }
}
