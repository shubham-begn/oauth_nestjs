import { Controller, Post, Body } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';

@Controller('rabbitmq')
export class RabbitmqController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @Post('send')
  async sendMessage(@Body() data: { pattern: string; message: any }) {
    console.log("in the controller");
    return this.rabbitmqService.sendMessage(data.pattern, data.message);
  }

  @Post('emit')
  async sendEvent(@Body() data: { pattern: string; message: any }) {
    await this.rabbitmqService.sendEvent(data.pattern, data.message);
    return { status: 'Message emitted' };
  }
}
