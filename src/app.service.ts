import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello !';
  }
  getUsers(): string[] {
    return ["juan","pedr"];
  }
}
