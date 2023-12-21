import { Test, TestingModule } from '@nestjs/testing';
import { AppContextService } from './app.context.service';

describe('AppContextService', () => {
  let service: AppContextService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AppContextService],
    }).compile();

    service = module.get<AppContextService>(AppContextService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
