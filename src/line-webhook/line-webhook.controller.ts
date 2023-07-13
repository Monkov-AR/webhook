import { Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';

@Controller('webhook')
export class LineWebhookController {
  @Post()
  handleWebhook(@Req() request: Request) {
    console.log(request.body);
    // Display the received information in the console

    // You can also send the information to the browser by returning a response
    return 'Webhook received!';
  }
}
