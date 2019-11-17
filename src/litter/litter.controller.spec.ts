import { Test, TestingModule } from '@nestjs/testing';
import { LitterController } from './litter.controller';

describe('Litter Controller', () => {
  let controller: LitterController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LitterController],
    }).compile();

    controller = module.get<LitterController>(LitterController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
