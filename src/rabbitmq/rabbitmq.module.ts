import { Module } from '@nestjs/common';
import { RabbitmqService } from './rabbitmq.service';
import { MessagesController } from './rabbitmq.controller';

@Module({
  providers: [RabbitmqService],
  controllers: [MessagesController]
})
export class RabbitmqModule {}
