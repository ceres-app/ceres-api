import { AppController } from '@/api/routes/app/app.controller';
import { AppService } from '@/api/services/app.service';
import { DATABASE_URL } from '@/constants';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [MongooseModule.forRoot(DATABASE_URL)],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
