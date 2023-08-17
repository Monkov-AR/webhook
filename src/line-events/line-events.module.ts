import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { LineEventsService } from './line-events.service';
import { LineEventsController } from './line-events.controller';
import { LineEvent } from './entities/line-event.entity';
import { UtilsModule } from 'src/utils/utils.module';
import { LineBotService } from '../config/config.service';
import { LinkstaffApiService } from 'src/api/linkstaff-api/linkstaff-api.service';

@Module({
  imports: [ConfigModule, UtilsModule, HttpModule, TypeOrmModule.forFeature([LineEvent])],
  controllers: [LineEventsController],
  providers: [LineEventsService, LineBotService, LinkstaffApiService],
})
export class LineEventsModule { }
