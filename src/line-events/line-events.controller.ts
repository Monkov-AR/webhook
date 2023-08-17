import {
  Controller,
  Get,
  Post,
  Body,
  Res,
  Patch,
  Param,
  Delete,
  HttpStatus,
} from '@nestjs/common';
import { LineEventsService } from './line-events.service';
import { UpdateLineEventDto } from './dto/update-line-event.dto';

@Controller('line-events')
export class LineEventsController {
  constructor(private readonly lineEventsService: LineEventsService) { }

  @Post()
  async handleLineEvent(@Body() payload: any, @Res() res): Promise<void> {
    // Perform the security and channel validation.

    try {
      await this.lineEventsService.handleEvent(payload.events[0]);
      res.status(HttpStatus.OK).send();
    } catch (error) {
      console.error('Error handling LINE event:', error);
      res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
    // return this.lineEventsService.createLineId(payload);
  }

  @Get()
  findAll() {
    return this.lineEventsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.lineEventsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateLineEventDto: UpdateLineEventDto,
  ) {
    return this.lineEventsService.update(+id, updateLineEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.lineEventsService.remove(+id);
  }
}
