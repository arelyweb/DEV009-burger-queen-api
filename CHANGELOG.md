# Changelog

## 1.1.1 - 2023-09-26

### Sprint learnings

- Aprendí a realizar paginado de los datos obtenidos de la base de datos y a realizar la configuración para la pruebas e2e.

### Added

- Inicio de la funcionalidad CRUD de productos.
- Creación del get de un usuario utilizando UID.
- Modificaciones para hacer test unitario.
- Creación y funcionamiento del middleware auth.
- Realizando el changelog.
- Creación del GET de usuarios por página y límite.
- Creación de usuario con método POST.
- Creación del usuario admin.

### Changed

- Modificación al archivo globalSetup para pruebas E2E.
- Modificación al paginación de usuarios utilizando GET.
- Modificación a la autenticación del usuario.

## 1.0.0 - 2023-09-20

### Sprint learnings

- Aprendí a realizar la conexión a la base de datos (NodeJS - Mongodb), a ingresar datos utilizando Mongoose, a utilizar el MVC y utilizar los verbos de HTTP.

### Added

- Agregue la funcionalidad que permite la creacion de un usuario admin, usuario sin privilegios y que retornará un token de autenticación.
- Agregue la autenticacion del usuario, validando que exista en la base de datos y que el password coincida.
- Agregue la obtención de todos los usuarios con los parámetros page y limit que se obtienen de la URL.
