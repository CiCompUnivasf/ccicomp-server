import { Test, TestingModule } from '@nestjs/testing';
import { BCRYPT_ROUNDS } from './constants';
import { CryptoService } from './crypto.service';

describe('CryptoService', () => {
  let service: CryptoService;
  let module: TestingModule;

  const plain = 'ccicomp';

  beforeAll(async () => {
    module = await Test.createTestingModule({
      providers: [CryptoService],
    }).compile();

    service = module.get<CryptoService>(CryptoService);
  });

  afterAll(() => module.close());

  it('should bcrypt rounds cost be a valid and safe value', () => {
    expect(BCRYPT_ROUNDS).toBeGreaterThanOrEqual(10);
    expect(BCRYPT_ROUNDS).toBeLessThanOrEqual(12);
  });

  it('should "createHash" generate a hash with salt with valid length', async () => {
    const spyGenSalt = jest.spyOn(service, 'generateSalt');

    const { salt, hash } = await service.createHash(plain);

    // a valid bcrypt size
    // see more: https://github.com/kelektiv/node.bcrypt.js#hash-info
    expect(hash).toHaveLength(60);
    expect(salt).toHaveLength(29);

    expect(spyGenSalt).toBeCalledTimes(1);
  });

  it('should "createHashSync" generate a hash with salt with valid length', () => {
    const spyGenSaltSync = jest.spyOn(service, 'generateSaltSync');

    const { salt, hash } = service.createHashSync(plain);

    // a valid bcrypt size
    // see more: https://github.com/kelektiv/node.bcrypt.js#hash-info
    expect(hash).toHaveLength(60);
    expect(salt).toHaveLength(29);

    expect(spyGenSaltSync).toBeCalledTimes(1);
  });

  it('should created hash async and sync be true on compare', async () => {
    const { hash } = await service.createHash(plain);
    const { hash: hashSync } = service.createHashSync(plain);

    const asyncHashIsValid = await service.compareHash({ plain, hash });

    expect(asyncHashIsValid).toBeTruthy();

    const syncHashIsValid = await service.compareHash({
      plain,
      hash: hashSync,
    });

    expect(syncHashIsValid).toBeTruthy();
  });
});
