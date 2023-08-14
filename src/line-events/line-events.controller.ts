import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { LineEventsService } from './line-events.service';
import { UpdateLineEventDto } from './dto/update-line-event.dto';

@Controller('line-events')
export class LineEventsController {
  constructor(private readonly lineEventsService: LineEventsService) { }

  @Post()
  async create(@Body() payload: any) {

    return this.lineEventsService.createLineId(payload);

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
