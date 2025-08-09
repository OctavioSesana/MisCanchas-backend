# Backend - MisCanchas

Este es el backend de la aplicación FeCancha, desarrollado con Node.js, Express y MySQL.
Se encarga de gestionar la lógica de negocio, conexión a base de datos, creación de reservas y la integración con MercadoPago Checkout Pro.

## Requisitos previos
Antes de iniciar el backend, asegurate de tener instalado:

- Node.js (versión recomendada: 18 o superior)
- npm
- MySQL en ejecución
- Variables de entorno configuradas

## Instalación
Cloná el repositorio e instalá las dependencias:

<img width="960" height="180" alt="image" src="https://github.com/user-attachments/assets/c4a79760-9857-4882-aacf-666f23d4ffa4" />

## Configuración
Crear un archivo .env en la raíz del backend con las siguientes variables (adaptar según tu entorno):
<img width="730" height="331" alt="image" src="https://github.com/user-attachments/assets/b1582d2a-c9c4-4822-bd7d-eb5235ce1f63" />

## Ejecutar en desarrollo
Para iniciar el servidor con recarga automática (usando nodemon):
<img width="761" height="102" alt="image" src="https://github.com/user-attachments/assets/20b4d335-825c-4b17-aa48-49752a474e09" />

<img width="736" height="90" alt="image" src="https://github.com/user-attachments/assets/853b29ea-48e6-49e1-9137-13dcff9fe999" />

## Build y producción
Para compilar y ejecutar en modo producción:
<img width="757" height="118" alt="image" src="https://github.com/user-attachments/assets/0a60bd2a-5f95-4221-b9c5-b2ccdb90966d" />

## Endpoints principales
<img width="928" height="383" alt="image" src="https://github.com/user-attachments/assets/a349dd4c-6afc-41e8-8308-9acbb75dc7e5" />

## Integración con MercadoPago
Este backend utiliza la SDK oficial de MercadoPago para generar enlaces de pago.
Cuando se crea una reserva, se genera un init_point que redirige al checkout de MercadoPago.

## Testing
Los testings se ejecutan corriendo en la terminal: npm run test

