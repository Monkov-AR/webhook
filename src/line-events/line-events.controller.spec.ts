import { Test, TestingModule } from '@nestjs/testing';
import { LineEventsController } from './line-events.controller';
import { LineEventsService } from './line-events.service';

describe('LineEventsController', () => {
  let controller: LineEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LineEventsController],
      providers: [LineEventsService],
    }).compile();

    controller = module.get<LineEventsController>(LineEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
