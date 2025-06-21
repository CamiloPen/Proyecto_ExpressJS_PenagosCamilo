import dotenv from 'dotenv';
import fs from 'fs';

if (fs.existsSync('.env')) {
    dotenv.config({ path: '.env' });
} else {
    console.error('No existe el archivo .env')
}

export const ENVIRONMENT = process.env.NODE_ENV;

const prod = ENVIRONMENT === 'production';

export const HOSTNAME = (process.env.APP_HOSTNAME || 'localhost');
export const PORT = (process.env.APP_PORT || 4000);

export const MONGO_URL = prod ? 
(process.env.MONGO_URL_PROD): 
(process.env.MONGO_URL_LOCAL);

if (!MONGO_URL) {
    if (prod) {
        console.error('No hay cadena de conexion de producción configurada para la base de datos')
    } else {
        console.error('No hay cadena de conexion de desarrollo configurada para la base de datos')
    }
    process.exit(1);
}

export const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
export const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

export const COOKIE_KEY = process.env.COOKIE_KEY;