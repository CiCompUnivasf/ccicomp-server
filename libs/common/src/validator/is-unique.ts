import { Injectable, Scope, Type } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import debug from 'debug';
import { FindOneOptions, FindOperator, getManager } from 'typeorm';

interface IsUniqueOptions<T> {
  // Entidade que vai ser buscada com a propriedade
  entity: Type<T>;
  /**
   * @param theObj O objeto atual a ser validado
   * @description Deve retornar um objeto ou null. Se retornar null, a validação será pulada
   */
  extraValidation?: (
    theObj: any,
  ) => { [Key in keyof T]?: T[Key] | FindOperator<T> } | null;
  // A propriedade pode ser null ou undefined
  nullable?: boolean;
  // Utilizar o próprio ID para validação. default: false
  useSelfId?: boolean;
}

const log = debug('isUnique');

@Injectable({ scope: Scope.REQUEST })
@ValidatorConstraint({ name: 'IsRelationValid', async: true })
class IsUniqueInEntity implements ValidatorConstraintInterface {
  public customMessage = '';

  async validate(value: any, args: ValidationArguments) {
    const { entity, nullable, useSelfId, extraValidation } = args
      .constraints[0] as IsUniqueOptions<any>;

    log('validando "isUnique":', args.property);

    if (!value && !nullable) {
      this.customMessage = `${args.property} deve ser preenchido`;
      return false;
    }

    const where: FindOneOptions['where'] = {
      [args.property]: value,
    };

    // Se houver um ID no objeto passado
    // E na configuração de validação não estiver explicito que deve ser pulado a validação de "use-self-id"
    // Adicionamos condição onde o ID não é igual ao ID do objeto passado.
    if (Reflect.has(args.object, 'id')) {
      if (useSelfId !== true) {
        const id = (args.object as any)?.id || null;

        if (id) {
          where.id = id;
          log('withId:', id);
        }
      }
    }

    const repo = getManager().getRepository(entity);

    if (extraValidation) {
      const extraWhere = extraValidation(args.object);

      // Se o resultado da validação extra for null, quer dizer que não devemos validar.
      if (extraWhere === null) {
        return true;
      }

      log('extra validation', extraWhere);

      Object.assign(where, extraWhere);
    }

    log('options', { where });

    const item = await repo.findOne({ where });

    return !item;
  }

  defaultMessage(args: ValidationArguments) {
    const { entity } = args.constraints[0];

    if (!entity) {
      return `Entidade não especificada para ${args.property} !`;
    }

    return (
      this.customMessage || `Esse ${args.property} já está sendo utilizado.`
    );
  }
}

export function IsUnique<T>(
  isUniqueOptions: IsUniqueOptions<T>,
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  log('options', isUniqueOptions);

  return (object: Record<string, any>, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      constraints: [isUniqueOptions],
      validator: IsUniqueInEntity,
    });
  };
}
