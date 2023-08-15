import { User } from './user';

export interface Device {
  id?: string;
  serialID: string;
  name: string;
  isWorking: boolean;
  user?: User;
}

export type OptionalDevice = Device | null | undefined;

export type DeviceRequest = Pick<Device, 'name' | 'serialID' | 'isWorking'>;

export type DeviceUpdateRequest = Partial<
  Omit<Device, 'id' | 'user'> & { userId: string }
>;

export interface CommandData {
  id: string;
  command: 'turnon' | 'turnoff';
}
