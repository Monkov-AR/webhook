import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LineEvent } from './entities/line-event.entity';
import { CreateLineEventDto } from './dto/create-line-event.dto';
import { UpdateLineEventDto } from './dto/update-line-event.dto';

@Injectable()
export class LineEventsService {
  constructor(
    @InjectRepository(LineEvent)
    private readonly lineEventRepository: Repository<LineEvent>,
  ) { }

  async create(createLineEventDto: CreateLineEventDto) {
    const lineEvent = this.lineEventRepository.create(createLineEventDto);
    return this.lineEventRepository.save(lineEvent);
  }

  findAll() {
    return `This action returns all lineEvents`;
  }

  findOne(id: number) {
    return `This action returns a #${id} lineEvent`;
  }

  update(id: number, updateLineEventDto: UpdateLineEventDto) {
    return `This action updates a #${id} lineEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} lineEvent`;
  }
}
