import { Injectable, OnModuleInit, OnModuleDestroy, Logger } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';

@Injectable()
export class RabbitmqService implements OnModuleInit, OnModuleDestroy {
  private client: ClientProxy;
  private readonly logger = new Logger(RabbitmqService.name);

  onModuleInit() {
    this.client = ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://localhost:5672'],  // Change to the RabbitMQ server URL
        queue: 'main_queue',
        queueOptions: {
          durable: false,
        },
      },
    });
  }

  onModuleDestroy() {
    this.client.close();
  }

  public sendMessage(pattern: string, data: any) {
    this.logger.log(`Sending message with pattern: ${pattern}`);
    return this.client.send(pattern, data);
  }

  public async sendEvent(pattern: string, data: any) {
    this.logger.log(`Emitting event with pattern: ${pattern}`);
    await this.client.emit(pattern, data).toPromise();
  }
}
