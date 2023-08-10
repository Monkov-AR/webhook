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
import { EventType, CreateLineEventDto } from './dto/create-line-event.dto';
import { UpdateLineEventDto } from './dto/update-line-event.dto';

@Controller('line-events')
export class LineEventsController {
  constructor(private readonly lineEventsService: LineEventsService) {}

  @Post()
  async create(@Body() createLineEventDto: CreateLineEventDto) {
    if (createLineEventDto.type === EventType.Follow) {
      return this.lineEventsService.create(createLineEventDto);
    }
    // Handle other event types if needed
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
