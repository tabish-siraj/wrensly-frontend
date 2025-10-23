import dotenv from 'dotenv';
dotenv.config();

const env = {
    PORT: process.env.PORT || 3000,
    API_BASE_URL: process.env.API_BASE_URL || 'https://wrensly-backend.onrender.com/api',
    BASE_URL: process.env.BASE_URL || 'https://wrensly-frontend.vercel.app',
};

export default env;