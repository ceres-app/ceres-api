import { AppModule } from '@/api/routes/app/app.module';
import { NestFactory } from '@nestjs/core';
import { PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}
bootstrap();
