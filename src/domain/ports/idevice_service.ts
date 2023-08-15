import {
  Device,
  DeviceRequest,
  DeviceUpdateRequest,
  OptionalDevice,
} from '../entities/device';

export interface IDeviceService {
  create(userId: string, newDevice: DeviceRequest): Promise<OptionalDevice>;
  fetchAll(userId: string): Promise<Device[]>;
  update(
    userId: string,
    id: string,
    newDevice: DeviceUpdateRequest,
  ): Promise<OptionalDevice>;
  deleteById(userId: string, id: string): Promise<OptionalDevice>;
  findById(userId: string, id: string): Promise<OptionalDevice>;
}
