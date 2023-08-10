import { Test, TestingModule } from '@nestjs/testing';
import { LineEventsService } from './line-events.service';

describe('LineEventsService', () => {
  let service: LineEventsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LineEventsService],
    }).compile();

    service = module.get<LineEventsService>(LineEventsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
