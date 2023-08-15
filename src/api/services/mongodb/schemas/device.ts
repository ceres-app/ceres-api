import { Device } from '@/domain/entities/device';
import mongoose, { Schema } from 'mongoose';

const DeviceSchema = new mongoose.Schema<Device>(
  {
    isWorking: Boolean,
    name: String,
    serialID: String,
    user: { type: Schema.Types.ObjectId, ref: 'users' },
  },
  { timestamps: false },
);

export const DeviceModel = mongoose.model('devices', DeviceSchema);
