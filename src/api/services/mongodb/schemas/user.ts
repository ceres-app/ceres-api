import { User } from '@/domain/entities/user';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class UserModel implements User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(UserModel);
