import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LineEventsService } from './line-events.service';
import { LineEventsController } from './line-events.controller';
import { LineEvent } from './entities/line-event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([LineEvent])],
  controllers: [LineEventsController],
  providers: [LineEventsService]
})
export class LineEventsModule { }
