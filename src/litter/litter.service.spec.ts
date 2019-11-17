import { Test, TestingModule } from '@nestjs/testing';
import { LitterService } from './litter.service';

describe('LitterService', () => {
  let service: LitterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LitterService],
    }).compile();

    service = module.get<LitterService>(LitterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
