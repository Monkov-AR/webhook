import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('webhook')
export class LineWebhookController {
  @Post()
  handleWebhook(@Req() request: Request) {
    const data = JSON.stringify(request.body, null, 2);
    console.log(data);
    // Display the received information in the console

    // You can also send the information to the browser by returning a response
    return 'Webhook received!';
  }
}
