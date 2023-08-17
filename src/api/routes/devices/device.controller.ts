import { MongoDBDeviceService } from '@/api/services/mongodb/device.service';
import { MQTTBrokerService } from '@/api/services/mqtt/mqtt_broker_service';
import { FetchAll } from '@/domain/use_cases/devices/fetch_all';
import { TurnOff } from '@/domain/use_cases/devices/turn_off';
import { TurnOn } from '@/domain/use_cases/devices/turn_on';
import { Controller, Get, Param, Patch } from '@nestjs/common';

@Controller('/users/:userId/devices')
export class DeviceController {
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
}
