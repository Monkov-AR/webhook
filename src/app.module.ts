import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LineWebhookController } from './line-webhook/line-webhook.controller';

@Module({
  imports: [],
  controllers: [AppController, LineWebhookController],
  providers: [AppService],
})
export class AppModule {}
