# Parcial API Quotes

API REST para el parcial de Node.js. Permite traer frases aleatorias desde la API de ZenQuotes y guardar, listar o borrar frases favoritas en un archivo local.

## Pasos para instalar y correr el proyecto

1. Instalar las dependencias:
   ```bash
   npm install
configurar las variables de entorno:
copiar el archivo .env.example y renombrarlo a .env. Por defecto usa el puerto 3000.

levantar el servidor:
Bash
npm start
Aclaraciones de la entrega
la estructura del código está separado en rutas, controladores y servicios para no mezclar la lógica, en el flujo de datos implemente la regla de usar un solo return por método,me resulta mucho más prolijo para no tener salidas por cualquier lado y controlar bien qué devuelve cada función ademas que estoy mas acostumbrado a programar asi ya que nos enseñaron eso en las primeras materias, no usa base de datos guarda todo directo en data/favorites.json. Si el archivo se llega a borrar, el código lo vuelve a crear automáticamente con un array vacío para que el servidor no explote.