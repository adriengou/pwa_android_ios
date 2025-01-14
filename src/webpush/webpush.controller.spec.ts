import { Test, TestingModule } from '@nestjs/testing';
import { WebpushController } from './webpush.controller';

describe('WebpushController', () => {
  let controller: WebpushController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [WebpushController],
    }).compile();

    controller = module.get<WebpushController>(WebpushController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
