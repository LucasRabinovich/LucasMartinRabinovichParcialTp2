import app from './app.js';

const SERVER_PORT = process.env.PORT || 3000;

app.listen(SERVER_PORT, () => {
    console.log(`[API Quotes] -> Servidor ejecutándose correctamente en el puerto ${SERVER_PORT}`);
});