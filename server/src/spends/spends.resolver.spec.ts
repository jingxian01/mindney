import { Test, TestingModule } from '@nestjs/testing';
import { SpendsResolver } from './spends.resolver';
import { SpendsService } from './spends.service';

describe('SpendsResolver', () => {
  let resolver: SpendsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SpendsResolver, SpendsService],
    }).compile();

    resolver = module.get<SpendsResolver>(SpendsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
