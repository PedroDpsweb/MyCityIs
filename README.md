# My City Is
Diagrama de Componentes

# Introducción:
En el PFC se pedía un diagrama de Clases, pero como en este proyecto el backEnd es un Servicio Online (Firebase), he decidido hacer un esquema de la arquitectura de Angular explicando la funcionalidad de cada parte.

![Texto alternativo](/DiagramaComponentes.png)

# Services: AuthService:

Servicio que proporciona a los componentes que lo necesiten las funciones necesarias para interactuar con el sistema de Login. Este servicio además guarda los datos del usuario logeado, es decir, todo componente que quiera referenciar al usuario activo deberá hacer referencia al objeto user de este servicio el cual contiene todos los datos del usuario logeado.

- DataApiService:

Servicio que proporciona a los componentes que lo necesiten las funciones necesarias para acceder a la información almacenada en base de datos.

- MailControllerService

Servicio que proporciona a los componentes que lo necesiten las funciones necesarias para utilizar el sistema de mensajería privada de la aplicación. El sistema de sugerencias también utiliza este servicio.

- ToolService Este servicio provee de funcionalidades puntuales a todos los componentes. Las funciones pueden ir desde encriptación de contraseña hasta formateador de fechas, en esencia este servicio es un apoyo para funciones recurrentes.

# Components:

Cada componente tiene 4 archivos:
* html : estructura 
* css : estilos 
* ts : lógica 
* spec.ts : pruebas genéricas angular

- admin Panel administrador

- comunities Componente de elección de comunidades coments Comentarios de los posts home Pantalla de inicio

- main-feed Muro de la comunidad seleccionada 
- post Post escogido 
- navbar Header de navegación de la web 
- in-box Bandeja de correo 
- modals 
    - mail-modal : modal para enviar correo 
    - star-modal : modal para puntuar usuario 
    - modal : modal para subir post 
- users 
    - login : pantalla de login 
    - register: pantalla de registro 
    - profile : pantalla de perfil de usuario

- page 404 : pantalla no encontrada

# Guards Los guards son funciones que se ejecutan cuando se pasa de un componente a otro. Ejecutan una función y dejará paso SOLO si el resultado de dicha función es true.

authGuard : deja pasar si estas logeado. adminGuard : deja pasar solo al usuario administrador

# Models Objetos predefinidos que se usan como interfaces.

mail : estructura mail user : estructura user post : estructura post