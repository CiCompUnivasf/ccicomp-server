import { CryptoService } from '@ccicomp/crypto';
import { Password, PasswordInstance } from './password';

describe('password aggregate', () => {
  const plainPasswords = ['ccicomp', 'CCiComp12@#', '#1backy#Ardigans'];
  const cryptoService = new CryptoService();
  const instances: Password[] = [];

  it('should create many hash from plain and have the same size and call hashSync', () => {
    const hashSyncSpy = jest.spyOn(cryptoService, 'createHashSync');
    const generateSaltSyncSpy = jest.spyOn(cryptoService, 'generateSaltSync');

    for (const plainPassword of plainPasswords) {
      const password = new Password(
        plainPassword,
        PasswordInstance.PLAIN,
        cryptoService,
      );

      // a bcrypt hash size
      expect(password.hash).toHaveLength(60);

      instances.push(password);
    }

    // generateHashSync should call generateSaltSync to create a password safe table hash
    // so hashSync and generateSaltSync have to be called the same times of size of instance array
    expect(hashSyncSpy).toHaveBeenCalledTimes(instances.length);
    expect(generateSaltSyncSpy).toHaveBeenCalledTimes(instances.length);
  });

  it('should password instance be equals a other instance with the same value', async () => {
    for (const key in instances) {
      const instance = instances[key];
      const plainPassword = plainPasswords[key];
      const plainInstance = new Password(plainPassword, PasswordInstance.PLAIN);

      const isEqual = await instance.isEqual(plainInstance);

      expect(isEqual).toBeTruthy();
    }
  });

  it('should password instances be equals a it self and call compareHash', async () => {
    const spyCompareHash = jest.spyOn(cryptoService, 'compareHash');

    for (const instance of instances) {
      const isEqual = await instance.isEqual(instance);
      expect(isEqual).toBeTruthy();
    }

    expect(spyCompareHash).toBeCalledTimes(instances.length);
  });
});
