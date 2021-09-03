import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseDateListener } from './database-date.listener';
import { DatabaseModule } from './database.module';

describe('CoreService', () => {
  let listener: DatabaseDateListener;
  let moduleRef: TestingModule;

  beforeEach(async () => {
    moduleRef = await Test.createTestingModule({
      imports: [DatabaseModule],
    }).compile();

    listener = moduleRef.get<DatabaseDateListener>(DatabaseDateListener);
  });

  afterAll(() => moduleRef.close());

  // TODO: test beforeInsert entity
  // TODO: test beforeUpdate entity

  it('should be defined', () => {
    expect(listener).toBeDefined();
  });
});
