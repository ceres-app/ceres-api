import { HttpExceptionInterceptor } from '@/api/interceptors/http_exception_interceptor';
import { AppController } from '@/api/routes/app/app.controller';
import { AppService } from '@/api/services/app.service';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { DeviceModule } from '../devices/device.module';
import { UserModule } from '../users/user.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, DeviceModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpExceptionInterceptor,
    },
  ],
})
export class AppModule {}
