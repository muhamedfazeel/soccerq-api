import { Controller, Get } from '@nestjs/common';

@Controller('status')
export class HealthController {
  @Get()
  statusCheck(): boolean {
    return true;
  }
}
