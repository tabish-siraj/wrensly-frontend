// Environment configuration with validation
const requiredEnvVars = ['API_BASE_URL'] as const;

// Validate required environment variables
const validateEnv = () => {
    const missing = requiredEnvVars.filter(key => !process.env[key]);
    if (missing.length > 0) {
        throw new Error(`Missing required environment variables: ${missing.join(', ')}`);
    }
};

// Only validate in production or when explicitly requested
if (process.env.NODE_ENV === 'production' || process.env.VALIDATE_ENV === 'true') {
    validateEnv();
}

const env = {
    API_BASE_URL: process.env.API_BASE_URL || 'https://wrensly-backend.onrender.com/api',
    BASE_URL: process.env.BASE_URL || 'https://wrensly-frontend.vercel.app',
} as const;

export default env;