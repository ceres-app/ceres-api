import { User } from '@/domain/entities/user';
import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema<User>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: false },
);

export const UserModel = mongoose.model('users', UserSchema);
