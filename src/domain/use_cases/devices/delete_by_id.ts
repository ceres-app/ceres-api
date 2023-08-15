import { OptionalDevice } from '@/domain/entities/device';
import { HttpError } from '@/domain/exceptions/http_error';
import { IDeviceService } from '@/domain/ports/idevice_service';
import { UseCase } from '../iuse_case';

type Input = {
  userId: string;
  id: string;
};

type Output = OptionalDevice;

export class DeleteById implements UseCase<Input, Output> {
  constructor(private readonly deviceService: IDeviceService) {}

  async execute(input: Input): Promise<Output> {
    const { userId, id } = input;
    const deletedDevice = await this.deviceService.deleteById(userId, id);
    if (!deletedDevice)
      throw new HttpError(`Não foi possível deletar dispositivo de ID '${id}'`);
    return deletedDevice;
  }
}
