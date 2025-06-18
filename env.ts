import dotenv from 'dotenv';
dotenv.config();

const env = {
    PORT: process.env.PORT || 3000,
    API_BASE_URL: process.env.API_BASE_URL || 'https://wrensly-backend.onrender.com',
};

export default env;