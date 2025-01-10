# Access Control Nest

## Descripción del Proyecto

Access Control Nest es un proyecto que implementa un sistema de control de acceso utilizando NestJS. Este proyecto permite gestionar roles y permisos de manera eficiente, facilitando la creación de aplicaciones seguras y escalables.

## Estructura del Proyecto

La estructura del proyecto sigue las convenciones de NestJS, organizando el código en módulos, controladores y servicios, lo que permite una fácil escalabilidad y mantenimiento. A continuación se describe brevemente cada componente:

- **libs/**: Contiene bibliotecas reutilizables que proporcionan funcionalidades comunes a través de diferentes módulos.

  - **database/**: Configuraciones y conexiones a la base de datos.
  - **jwt/**: Implementación de autenticación y autorización utilizando JSON Web Tokens.
  - **swagger/**: Configuración para la documentación automática de la API con Swagger.
  - **validation/**: Funciones y clases para la validación de datos.

- **modules/**: Contiene los módulos principales de la aplicación.
  - **user/**: Módulo que gestiona la lógica relacionada con los usuarios.
    - **application/**: Contiene la lógica de aplicación, incluyendo:
      - **dto/**: Objetos de transferencia de datos utilizados para la comunicación entre capas.
      - **service/**: Servicios que implementan la lógica de negocio relacionada con los usuarios.
    - **domain/**: Define las entidades y las interfaces de servicio y repositorio.
      - **entities/**: Clases que representan las entidades del dominio.
      - **interfaces de servicio/**: Interfaces que definen los contratos de los servicios.
      - **interfaces de repositorio/**: Interfaces que definen los contratos de los repositorios.
    - **infrastructure/**: Implementaciones concretas de las interfaces del dominio.
      - **repository/**: Implementaciones de repositorios utilizando TypeORM.
    - **presentation/**: Contiene los controladores que manejan las solicitudes HTTP y definen las rutas de la API.

La conexión entre los diferentes componentes se realiza a través de tokens, utilizando la inyección de dependencias para facilitar la gestión de las dependencias y mejorar la testabilidad del código.

Si necesitas más ajustes o información adicional, házmelo saber.

## Arquitectura

El proyecto sigue una arquitectura basada en microservicios, lo que permite que diferentes partes de la aplicación se desarrollen, desplieguen y escalen de manera independiente. Utiliza patrones de diseño como la inyección de dependencias y la separación de preocupaciones, lo que mejora la mantenibilidad y la testabilidad del código.

## Documentación Swagger

La documentación de la API se genera automáticamente utilizando Swagger. Esto permite a los desarrolladores y a los usuarios de la API explorar y probar los endpoints de manera interactiva. Para acceder a la documentación, simplemente inicia el servidor y navega a la ruta `/api-docs`.

## Repositorio

Puedes encontrar el código fuente en el siguiente enlace:
[Repositorio de GitHub](https://github.com/joeljosebg/access-control-nest.git)

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```bash
pnpm install
```

## Ejecución

Para iniciar el servidor en modo de desarrollo, utiliza el siguiente comando:

```bash
pnpm run start:dev
```

## Documentación Swagger

Para acceder a la documentación de la API, inicia el servidor y navega a la ruta `/api-docs`.

```bash
http://localhost:3000/api-docs
```

```
access-control/
├── application/
│ ├── services/
│ └── use-cases/
├── domain/
│ ├── entities/
│ ├── repositories/
│ └── interfaces/
├── infrastructure/
│ ├── repositories/
│ ├── database/
│ └── adapters/
├── presentation/
├── guards/
│ ├── jwt-auth.guard.ts
│ └── permissions.guard.ts
├── decorators/
│ └── permissions.decorator.ts
└── controllers/
```
