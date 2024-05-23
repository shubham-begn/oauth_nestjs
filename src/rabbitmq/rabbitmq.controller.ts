import { Controller, Post, Body } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';

@Controller('messages')
export class MessagesController {
  constructor(private readonly rabbitmqService: RabbitmqService) {}

  @Post('send')
  async sendMessage(@Body() body: { pattern: string, data: any }) {
    const { pattern, data } = body;
    await this.rabbitmqService.sendEvent(pattern, data);
    return { status: 'Event emitted successfully' };
  }
}
