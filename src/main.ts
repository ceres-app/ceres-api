import { AppModule } from '@/api/routes/app/app.module';
import { NestFactory } from '@nestjs/core';
import { HttpExceptionInterceptor } from './api/interceptors/http_exception_interceptor';
import { MQTTConnector } from './api/services/mqtt/mqtt_connector';
import { MQTTListener } from './api/services/mqtt/mqtt_listener';
import { BROKER_URL, PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  app.useGlobalInterceptors(new HttpExceptionInterceptor());

  const mqttConnector = new MQTTConnector(new MQTTListener());
  await mqttConnector.init(BROKER_URL);

  await app.listen(PORT);
}
bootstrap();
