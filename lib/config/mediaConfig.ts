// Media upload configuration
// This file will be used to configure your storage bucket when ready

export interface MediaConfig {
    // Storage service type
    provider: 'aws-s3' | 'google-cloud' | 'cloudinary' | 'supabase' | 'custom';

    // Basic configuration
    bucketUrl?: string;
    apiKey?: string;
    region?: string;
    bucketName?: string;

    // File constraints
    maxFileSize: number;
    allowedTypes: string[];

    // Upload settings
    uploadPath: {
        avatars: string;
        covers: string;
    };

    // Image optimization
    optimization: {
        enabled: boolean;
        avatar: {
            width: number;
            height: number;
            quality: number;
        };
        cover: {
            width: number;
            height: number;
            quality: number;
        };
    };
}

// Default configuration
export const defaultMediaConfig: MediaConfig = {
    provider: 'custom',
    maxFileSize: 5 * 1024 * 1024, // 5MB
    allowedTypes: [
        'image/jpeg',
        'image/png',
        'image/gif',
        'image/webp'
    ],
    uploadPath: {
        avatars: 'uploads/avatars',
        covers: 'uploads/covers'
    },
    optimization: {
        enabled: true,
        avatar: {
            width: 400,
            height: 400,
            quality: 85
        },
        cover: {
            width: 1500,
            height: 500,
            quality: 85
        }
    }
};

// Environment-based configuration
export const getMediaConfig = (): MediaConfig => {
    const config: MediaConfig = { ...defaultMediaConfig };

    // Load from environment variables when available
    if (typeof window === 'undefined') {
        // Server-side configuration
        config.bucketUrl = process.env.STORAGE_BUCKET_URL;
        config.apiKey = process.env.STORAGE_API_KEY;
        config.region = process.env.STORAGE_REGION;
        config.bucketName = process.env.STORAGE_BUCKET_NAME;
    } else {
        // Client-side configuration (use NEXT_PUBLIC_ prefix)
        config.bucketUrl = process.env.NEXT_PUBLIC_STORAGE_BUCKET_URL;
        config.apiKey = process.env.NEXT_PUBLIC_STORAGE_API_KEY;
        config.region = process.env.NEXT_PUBLIC_STORAGE_REGION;
        config.bucketName = process.env.NEXT_PUBLIC_STORAGE_BUCKET_NAME;
    }

    return config;
};

// Configuration examples for different providers:

/*
// AWS S3 Configuration
export const awsS3Config: Partial<MediaConfig> = {
    provider: 'aws-s3',
    bucketUrl: 'https://your-bucket.s3.amazonaws.com',
    region: 'us-east-1',
    bucketName: 'your-bucket-name',
    // API key would be AWS access key
};

// Google Cloud Storage Configuration  
export const googleCloudConfig: Partial<MediaConfig> = {
    provider: 'google-cloud',
    bucketUrl: 'https://storage.googleapis.com/your-bucket',
    bucketName: 'your-bucket-name',
    // API key would be service account key
};

// Cloudinary Configuration
export const cloudinaryConfig: Partial<MediaConfig> = {
    provider: 'cloudinary',
    bucketUrl: 'https://api.cloudinary.com/v1_1/your-cloud-name',
    apiKey: 'your-api-key',
    // Additional Cloudinary-specific settings
};

// Supabase Storage Configuration
export const supabaseConfig: Partial<MediaConfig> = {
    provider: 'supabase',
    bucketUrl: 'https://your-project.supabase.co/storage/v1',
    apiKey: 'your-anon-key',
    bucketName: 'avatars', // or 'media'
};
*/

// Helper function to check if media upload is configured
export const isMediaUploadConfigured = (): boolean => {
    const config = getMediaConfig();
    return !!(config.bucketUrl && config.apiKey);
};

// Helper function to get upload URL for a specific file type
export const getUploadUrl = (type: 'avatar' | 'cover'): string => {
    const config = getMediaConfig();
    const pathKey = type === 'avatar' ? 'avatars' : 'covers';
    const path = config.uploadPath[pathKey];
    return `${config.bucketUrl}/${path}`;
};