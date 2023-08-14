import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LineEvent } from './entities/line-event.entity';
import { EventType, CreateLineEventDto } from './dto/create-line-event.dto';
import { UpdateLineEventDto } from './dto/update-line-event.dto';

@Injectable()
export class LineEventsService {
  constructor(
    @InjectRepository(LineEvent)
    private readonly lineEventRepository: Repository<LineEvent>,
  ) { }

  async createLineId(payload: any) {

    const eventType = payload.events[0].type;
    const userId = payload.events[0].source.userId;
    const email = '';

    if (eventType === EventType.Follow) {
      // Check if an event with the same userId already exists
      const existingUser = await this.lineEventRepository.findOne({
        where: { userId: userId },
      });

      if (existingUser) {
        throw new ConflictException(
          `LineEvent with userId '${userId}' already exists`,
        );
      }

      const createLineEventDto: CreateLineEventDto = {
        type: eventType,
        userId: userId,
        email: email,
      };
      const lineEvent = this.lineEventRepository.create(createLineEventDto);
      return this.lineEventRepository.save(lineEvent);
    }

    // Else write here for different event types.

    return { message: 'Can not create a user' };
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
