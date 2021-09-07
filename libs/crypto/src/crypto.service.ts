import { Injectable } from '@nestjs/common';
import {
  compare,
  genSalt,
  genSaltSync,
  hash as createHash,
  hashSync,
} from 'bcrypt';
import { BCRYPT_ROUNDS } from './constants';
import { HashCompare, HashCreated } from './interfaces';

@Injectable()
export class CryptoService {
  async createHash(plain: string): Promise<HashCreated> {
    const salt = await this.generateSalt();
    const hash = await createHash(plain, salt);

    return { salt, hash };
  }

  createHashSync(plain: string): HashCreated {
    const salt = this.generateSaltSync();
    const hash = hashSync(plain, salt);

    return { salt, hash };
  }

  async compareHash({ hash, plain }: HashCompare) {
    return compare(plain, hash);
  }

  generateSaltSync() {
    return genSaltSync(BCRYPT_ROUNDS);
  }

  async generateSalt() {
    return genSalt(BCRYPT_ROUNDS);
  }
}
