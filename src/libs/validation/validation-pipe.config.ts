import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';

export const createValidationPipe = () => {
  const options: ValidationPipeOptions = {
    whitelist: true, // Elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
    transform: true, // Transforma los datos al tipo especificado en el DTO
  };

  return new ValidationPipe(options);
};
