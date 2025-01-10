import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsCommaSeparatedString(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isCommaSeparatedString',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') return false;
          const items = value.split(',');
          return items.every((item) => item.trim().length > 0);
        },
        defaultMessage(args: ValidationArguments) {
          return `${propertyName} debe ser una cadena de texto con valores separados por comas.`;
        },
      },
    });
  };
}
