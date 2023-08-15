import { DeviceUpdateRequest, OptionalDevice } from '@/domain/entities/device';
import { HttpError } from '@/domain/exceptions/http_error';
import { IDeviceService } from '@/domain/ports/idevice_service';
import { UseCase } from '../iuse_case';

type Input = {
  userId: string;
  id: string;
  newDevice: DeviceUpdateRequest;
};

type Output = OptionalDevice;

export class Update implements UseCase<Input, Output> {
  constructor(private readonly deviceService: IDeviceService) {}

  async execute(input: Input): Promise<Output> {
    const { userId, id, newDevice } = input;
    const updatedDevice = await this.deviceService.update(
      userId,
      id,
      newDevice,
    );
    if (!updatedDevice)
      throw new HttpError(`Não foi possível atualizar '${id}'`);
    return updatedDevice;
  }
}
