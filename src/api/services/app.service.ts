import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getInfo() {
    return {
      name: 'Ceres API v0.1',
      description: 'An API to manage a water pump with Arduino.',
    };
  }
}
