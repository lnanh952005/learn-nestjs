import { Controller, Get, Req} from '@nestjs/common';
import { Public } from './decorators/publicDecorator';

@Controller()
export class AppController {
  constructor() {}

  @Get('/')
  @Public()
  getHomepage() {
    return 'hello from homepage';
  }
}
