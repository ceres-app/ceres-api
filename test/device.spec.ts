import { MongoDBDeviceService } from '@/api/services/mongodb/device.service';
import { MongoDBUserService } from '@/api/services/mongodb/user.service';
import { MQTTBrokerService } from '@/api/services/mqtt/mqtt_broker_service';
import { MQTTConnector } from '@/api/services/mqtt/mqtt_connector';
import { MQTTListener } from '@/api/services/mqtt/mqtt_listener';
import { BROKER_URL } from '@/constants';
import { Device } from '@/domain/entities/device';
import { User } from '@/domain/entities/user';
import { Create } from '@/domain/use_cases/devices/create';
import { TurnOff } from '@/domain/use_cases/devices/turn_off';
import { TurnOn } from '@/domain/use_cases/devices/turn_on';
import { Create as CreateUser } from '@/domain/use_cases/users/create';
import { generateMockName } from './common/generate_mock_name';

describe('Devices (Use Cases)', () => {
  let user: User;
  let device: Device;
  let mqttConnector: MQTTConnector;

  beforeAll(async () => {
    const createUserUC = new CreateUser(new MongoDBUserService());
    const createUC = new Create(new MongoDBDeviceService());

    user = await createUserUC.execute({
      newUser: {
        password: '123',
        username: generateMockName('USER'),
      },
    });

    device = await createUC.execute({
      userId: user.id,
      newDevice: {
        name: generateMockName('DEVICE'),
        serialID: '1234',
      },
    });

    mqttConnector = new MQTTConnector(new MQTTListener());
    await mqttConnector.init(BROKER_URL);
  });

  it('Should turn on the water pump', async () => {
    const turnOnUC = new TurnOn(
      new MongoDBDeviceService(),
      new MQTTBrokerService(),
    );

    await expect(
      turnOnUC.execute({
        id: device.id,
        userId: user.id,
      }),
    ).resolves.not.toThrow();
  });

  it.skip('Should turn off the water pump', async () => {
    const turnOffUC = new TurnOff(
      new MongoDBDeviceService(),
      new MQTTBrokerService(),
    );

    await expect(
      turnOffUC.execute({
        id: device.id,
        userId: user.id,
      }),
    ).resolves.not.toThrow();
  });

  afterAll(async () => {
    await mqttConnector.close();
  });
});
