import { AppController } from '@/api/routes/app/app.controller';
import { AppService } from '@/api/services/app.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
