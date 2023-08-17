import { Test, TestingModule } from '@nestjs/testing';
import { LinkstaffApiService } from './linkstaff-api.service';

describe('LinkstaffApiService', () => {
  let service: LinkstaffApiService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LinkstaffApiService],
    }).compile();

    service = module.get<LinkstaffApiService>(LinkstaffApiService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
