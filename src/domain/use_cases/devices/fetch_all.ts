import { Device } from '@/domain/entities/device';
import { IDeviceService } from '@/domain/ports/idevice_service';
import { UseCase } from '../iuse_case';

type Input = {
  userId: string;
};

type Output = Device[];

export class FetchAll implements UseCase<Input, Output> {
  constructor(private readonly deviceService: IDeviceService) {}

  async execute(input: Input): Promise<Output> {
    const { userId } = input;
    return this.deviceService.fetchAll(userId);
  }
}
