import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Bing Bing Ming Pocket Boom';
  }
}
