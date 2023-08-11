import { Device, DeviceRequest } from '@/domain/entities/device';
import { HttpError } from '@/domain/exceptions/http_error';
import { IDeviceService } from '@/domain/ports/idevice_service';
import { UseCase } from '../iuse_case';

export type CreateUseCaseDeviceRequest = Omit<DeviceRequest, 'isWorking'>;

type Input = {
  userId: string;
  newDevice: CreateUseCaseDeviceRequest;
};

type Output = Device;

export class Create implements UseCase<Input, Output> {
  constructor(private readonly deviceService: IDeviceService) {}

  async execute(input: Input): Promise<Output> {
    const { userId, newDevice } = input;
    const createdDevice = await this.deviceService.create(userId, {
      ...newDevice,
      isWorking: false,
    });
    if (!createdDevice)
      throw new HttpError(
        `Não foi possível criar dispositivo '${newDevice.serialID}'`,
      );
    return createdDevice;
  }
}
