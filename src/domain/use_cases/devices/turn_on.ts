import { HttpError } from '@/domain/exceptions/http_error';
import { IBrokerService } from '@/domain/ports/ibroker_service';
import { IDeviceService } from '@/domain/ports/idevice_service';
import { UseCase } from '../iuse_case';

type Input = {
  userId: string;
  id: string;
};

type Output = void;

export class TurnOn implements UseCase<Input, Output> {
  constructor(
    private readonly deviceService: IDeviceService,
    private readonly brokerService: IBrokerService,
  ) {}

  async execute(input: Input): Promise<void> {
    const { id, userId } = input;
    const foundDevice = await this.deviceService.findById(userId, id);
    if (!foundDevice)
      throw new HttpError(`Dispositivo de ID '${id}' não existe.`);

    // Send 'turn on' command
    const commandConfirmation = await this.brokerService.sendMessage<string>(
      `water:${foundDevice.serialID}`,
      'turnon',
    );

    if (!commandConfirmation)
      throw new HttpError(
        `Não foi possível enviar comando de ligar bomba d'água de dispositivo de ID '${foundDevice.id}'`,
      );

    await this.deviceService.update(userId, id, {
      isWorking: true,
    });
  }
}
