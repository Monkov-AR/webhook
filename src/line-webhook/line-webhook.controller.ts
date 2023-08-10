import { Controller, Post, Body } from '@nestjs/common';

@Controller('webhook')
export class LineWebhookController {
  @Post()
  handleWebhook(@Body() payload: any) {
    const data = JSON.stringify(payload, null, 2);
    console.log(data);
    return { message: 'Webhook data logged successfully!' };
  }
}
