import dotenv from 'dotenv';

dotenv.config();

export default {
  server: {
    port: process.env.APP_PORT || 8000,
  },
  database: {
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DATABASE,
    port: Number(process.env.POSTGRES_PORT) || 5432,
    user: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
  },
  ozon: {
    clientId: process.env.OZON_CLIENT_ID,
    apiKey: process.env.OZON_API_KEY,
  }
};