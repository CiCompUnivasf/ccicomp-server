import { CryptoService } from '@ccicomp/crypto';
import { Password, PasswordInstance } from './password';

describe('password aggregate', () => {
  const plainPasswords = ['ccicomp', 'CCiComp12@#', '#1backy#Ardigans'];
  const cryptoService = new CryptoService();
  const instances: Password[] = [];

  beforeAll(() => {
    for (const plainPassword of plainPasswords) {
      const password = new Password(
        plainPassword,
        PasswordInstance.PLAIN,
        cryptoService,
      );

      instances.push(password);
    }
  });

  it('should generated hash has a valid length', () => {
    const hashSyncSpy = jest.spyOn(cryptoService, 'createHashSync');
    const generateSaltSyncSpy = jest.spyOn(cryptoService, 'generateSaltSync');

    for (const instance of instances) {
      // a bcrypt hash size
      expect(instance.hash).toHaveLength(60);
    }

    // generateHashSync should call generateSaltSync to create a password safe table hash
    // so hashSync and generateSaltSync have to be called the same times of size of instance array
    expect(hashSyncSpy).toHaveBeenCalledTimes(instances.length);
    expect(generateSaltSyncSpy).toHaveBeenCalledTimes(instances.length);
  });

  it('should password instances be equals a it self and call compareHash', async () => {
    const spyCompareHash = jest.spyOn(cryptoService, 'compareHash');

    for (const instance of instances) {
      const isEqual = await instance.isEqual(instance);
      expect(isEqual).toBeTruthy();
    }

    expect(spyCompareHash).toBeCalledTimes(instances.length);
  });

  it('should password instance be equals other instance with the same value', async () => {
    for (const key in instances) {
      const instance = instances[key];
      const plainPassword = plainPasswords[key];
      const plainInstance = new Password(plainPassword, PasswordInstance.PLAIN);

      const isEqual = await instance.isEqual(plainInstance);

      expect(isEqual).toBeTruthy();
    }
  });

  it('should password instance with type HASH be equals instance with the same plain value', async () => {
    for (const key in instances) {
      const plainInstance = instances[key];

      expect(plainInstance.type).toStrictEqual(PasswordInstance.PLAIN);

      const hashInstance = new Password(
        plainInstance.hash,
        PasswordInstance.HASH,
        cryptoService,
      );

      expect(hashInstance.type).toStrictEqual(PasswordInstance.HASH);

      const isEqual = await hashInstance.isEqual(plainInstance);

      expect(isEqual).toBeTruthy();
    }
  });

  it('should password instance be not equals a other instance with different value', async () => {
    const somePassword = '65f10f42-6ed6-4c4f-8e88-eef600b00e06';

    for (const instance of instances) {
      const invalidInstance = new Password(
        somePassword,
        PasswordInstance.PLAIN,
      );

      const isEqual = await instance.isEqual(invalidInstance);

      expect(isEqual).toBeFalsy();
    }
  });
});
