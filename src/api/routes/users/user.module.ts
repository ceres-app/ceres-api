import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserController } from './user.controller';

@Module({
  imports: [ConfigModule.forRoot()],
  controllers: [UserController],
  providers: [],
})
export class UserModule {}
