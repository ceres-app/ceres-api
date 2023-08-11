import { AppModule } from '@/api/routes/app/app.module';
import { NestFactory } from '@nestjs/core';
import { PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: true,
    credentials: true,
  });
  await app.listen(PORT);
}
bootstrap();
