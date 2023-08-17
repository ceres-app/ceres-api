import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DeviceController } from './device.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [DeviceController],
  providers: [],
})
export class DeviceModule {}
