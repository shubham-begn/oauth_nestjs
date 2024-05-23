import { GoogleStrategy } from './google.strategy';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RabbitmqModule } from './rabbitmq/rabbitmq.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule.forRoot(), RabbitmqModule,HttpModule],
  controllers: [AppController],
  providers: [AppService, GoogleStrategy],
})
export class AppModule {}