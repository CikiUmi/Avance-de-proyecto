# Avance-de-proyecto

> [!IMPORTANT]
> Este proyecto es una tienda en línea de ropa, una página web desarrollada con Node.js, Express y MongoDB. En la carpeta de 'entregables' hay una demostración de cómo funciona la página cuando las variables de ambiente tienen los datos necesarios.

> *Equipo 1 - Sr Lucxs Studio*

 - MHQ 3001084
 - JMDR 7090780
 - DHH 2989955


- - - - - - - - - - - - - - - - - - - - - 
## **Endpoints de la API (operaciones CRUD)**


### ***= cuentaUsuarios***
| Método | Ruta                   | Acción que realiza                 |
| -------| ---------------------- | ---------------------------------- | 
| POST   | /api/cuentaUsuario     | Creación de cuenta para user       |
| POST   | /api/cuentaUsuario     | Creación de cuenta para usuario    |
| GET    | /api/cuentaUsuario/:id | Obtener datos de un usuario por ID |
| PUT    | /api/cuentaUsuario/:id | Actualizar datos del usuario       |
| DELETE | /api/cuentaUsuario/:id | Eliminar cuenta de usuario         |

### ***= carrito***
| Método | Endpoint                      | Acción que realiza                          |
| ------ | ----------------------------- | ------------------------------------------- |
| POST   | `/api/carrito`                | Crear un carrito para un usuario            |
| PUT    | `/api/carrito/:userID/add`    | Añadir un producto al carrito del usuario   |
| GET    | `/api/carrito/:userID`        | Obtener el carrito de un usuario            |
| PUT    | `/api/carrito/:userID/update` | Reemplazar/actualizar productos del carrito |
| DELETE | `/api/carrito/:userID/delete` | Eliminar el carrito del usuario             |

### ***= catalogo***
| Método | Endpoint            | Acción que realiza               |
| ------ | ------------------- | -------------------------------- |
| POST   | `/api/catalogo`     | Crear un producto en el catálogo |
| GET    | `/api/catalogo`     | Obtener todos los productos      |
| GET    | `/api/catalogo/:id` | Obtener un producto por ID       |
| PUT    | `/api/catalogo/:id` | Actualizar un producto por ID    |
| DELETE | `/api/catalogo/:id` | Eliminar un producto por ID      |

### ***= pedido***
| Método | Endpoint          | Acción que realiza          |
| ------ | ----------------- | --------------------------- |
| POST   | `/api/pedido`     | Crear un nuevo pedido       |
| GET    | `/api/pedido`     | Obtener todos los pedidos   |
| GET    | `/api/pedido/:id` | Obtener un pedido por ID    |
| PUT    | `/api/pedido/:id` | Actualizar un pedido por ID |
| DELETE | `/api/pedido/:id` | Eliminar un pedido por ID   |

### ***= auth***
| Método | Endpoint             | Descripción                        |
| ------ | -------------------- | ---------------------------------- |
| POST   | `/api/auth/register` | Registrar un nuevo usuario         |
| POST   | `/api/auth/login`    | Iniciar sesión y obtener token JWT |


- - - - - - - - - - - - - - - - - - - - - 
## El proyecto está dividido en carpetas:

### **node_modules:**
librerías y dependencias instaladas para el proyecto. 

### **public:**
Frontend de la página. Estructuras, estilos, etc.

***= app =***
archivos .js para las páginas.

***= pages =***
estructura del sitio web en formato .html.

***= styles =***
.css para la página.


### **src:**
Backend y lógica de la página. Base de datos, conexiones y configuraciones. server.js

***= config =***
Configuración de la base de datos (Mongo)

***= controllers =***
CRUD de la base de datos.

***= models =***
Schemas (DB).

***= routes =***
Rutas de API.

***= middlewares =***
Jsonwebtoken, rutas protegidas.

 > Además de esto, el programa cuenta con los paquetes .json, las variables de entorno (un ejemplo), licencia y este archivo.
