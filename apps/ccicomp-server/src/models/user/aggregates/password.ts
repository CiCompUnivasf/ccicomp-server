import { ValueTransformer } from 'typeorm';
import { CryptoService } from '@ccicomp/crypto';

export enum PasswordInstance {
  PLAIN,
  HASH,
}

export class Password {
  private _hash: string;

  constructor(
    private readonly value: string,
    public readonly type: PasswordInstance,
    private readonly cryptoService = new CryptoService(),
  ) {}

  // if the current instance is of type PLAIN, it will use self as plain value
  // else it's try to get compare instance value to compare as plain value
  async isEqual(password: Password): Promise<boolean> {
    let plain: string;
    let hash: string;

    if (this.type === PasswordInstance.PLAIN) {
      plain = this.value;
      hash = password.hash;
    } else {
      plain = password.value;
      hash = this.hash;
    }

    return this.cryptoService.compareHash({ hash, plain });
  }

  get hash(): string {
    // if current instance is HASH, value is hash
    if (this.type === PasswordInstance.HASH) return this.value;

    if (!this._hash)
      this._hash = this.cryptoService.createHashSync(this.value).hash;

    return this._hash;
  }

  // TODO
  isStrong(): boolean {
    return true;
  }

  // database transformer
  static transformer(): ValueTransformer {
    return {
      from(hash: string): Password {
        return new Password(hash, PasswordInstance.HASH);
      },
      to(password: Password): string {
        if (!(password instanceof Password)) {
          throw new Error('password deve ser uma instância de Password');
        }

        return password.hash;
      },
    };
  }
}
