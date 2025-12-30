// Enhanced media upload service - Best practice implementation
import api from '@/lib/api';

export interface UploadConfig {
    bucketUrl?: string;
    apiKey?: string;
    maxFileSize?: number;
    allowedTypes?: string[];
}

export interface UploadResult {
    success: boolean;
    url?: string;
    error?: string;
}

export interface SignedUploadResponse {
    uploadUrl: string;
    fileUrl: string;
    uploadId: string;
    expiresIn: number;
}

class MediaUploadService {
    private config: UploadConfig = {
        maxFileSize: 5 * 1024 * 1024, // 5MB default
        allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    };

    configure(config: Partial<UploadConfig>) {
        this.config = { ...this.config, ...config };
    }

    validateFile(file: File): { valid: boolean; error?: string } {
        // Check file type
        if (!this.config.allowedTypes?.includes(file.type)) {
            return {
                valid: false,
                error: `File type ${file.type} is not supported. Allowed types: ${this.config.allowedTypes?.join(', ')}`
            };
        }

        // Check file size
        if (this.config.maxFileSize && file.size > this.config.maxFileSize) {
            const maxSizeMB = this.config.maxFileSize / (1024 * 1024);
            return {
                valid: false,
                error: `File size (${(file.size / (1024 * 1024)).toFixed(2)}MB) exceeds maximum allowed size (${maxSizeMB}MB)`
            };
        }

        return { valid: true };
    }

    /**
     * Best Practice: Direct upload to storage with signed URLs
     * This approach provides better performance and reduces server load
     */
    async uploadFile(file: File, folder: 'avatars' | 'covers' = 'avatars'): Promise<UploadResult> {
        // Validate file first
        const validation = this.validateFile(file);
        if (!validation.valid) {
            return {
                success: false,
                error: validation.error
            };
        }

        try {
            // Step 1: Get signed upload URL from backend
            const signedUrlResponse = await this.getSignedUploadUrl(file, folder);

            // Step 2: Upload directly to storage provider
            const uploadResult = await this.uploadToProvider(file, signedUrlResponse);

            // Step 3: Confirm upload with backend
            await this.confirmUpload(signedUrlResponse.uploadId, signedUrlResponse.fileUrl, folder);

            return {
                success: true,
                url: signedUrlResponse.fileUrl
            };

        } catch (error) {
            console.error('Upload error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Upload failed'
            };
        }
    }

    /**
     * Get signed upload URL from backend
     */
    private async getSignedUploadUrl(file: File, uploadType: 'avatars' | 'covers'): Promise<SignedUploadResponse> {
        const response = await api.post('/media/upload-url', {
            fileName: file.name,
            fileType: file.type,
            fileSize: file.size,
            uploadType: uploadType === 'avatars' ? 'avatar' : 'cover'
        });

        if (!response.data.success) {
            throw new Error(response.data.message || 'Failed to get upload URL');
        }

        return response.data.data;
    }

    /**
     * Upload file directly to storage provider using signed URL
     */
    private async uploadToProvider(file: File, signedResponse: SignedUploadResponse): Promise<void> {
        // For most providers, this is a simple PUT request to the signed URL
        const response = await fetch(signedResponse.uploadUrl, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': file.type,
            },
        });

        if (!response.ok) {
            throw new Error(`Upload failed: ${response.statusText}`);
        }
    }

    /**
     * Confirm upload completion with backend
     */
    private async confirmUpload(uploadId: string, fileUrl: string, uploadType: string): Promise<void> {
        const response = await api.post('/media/confirm-upload', {
            uploadId,
            fileUrl,
            uploadType: uploadType === 'avatars' ? 'avatar' : 'cover'
        });

        if (!response.data.success) {
            throw new Error(response.data.message || 'Failed to confirm upload');
        }
    }

    /**
     * Delete file from storage
     */
    async deleteFile(url: string): Promise<boolean> {
        try {
            const response = await api.delete('/media/delete', {
                data: { fileUrl: url }
            });

            return response.data.success;
        } catch (error) {
            console.error('Delete error:', error);
            return false;
        }
    }

    /**
     * Fallback: Upload through backend (less efficient but simpler)
     * Use this only if direct upload is not possible
     */
    async uploadThroughBackend(file: File, folder: 'avatars' | 'covers' = 'avatars'): Promise<UploadResult> {
        const validation = this.validateFile(file);
        if (!validation.valid) {
            return {
                success: false,
                error: validation.error
            };
        }

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('folder', folder);

            const response = await api.post('/media/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            if (!response.data.success) {
                throw new Error(response.data.message || 'Upload failed');
            }

            return {
                success: true,
                url: response.data.data.url
            };

        } catch (error) {
            console.error('Upload error:', error);
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Upload failed'
            };
        }
    }

    // Utility function to generate optimized image URLs
    getOptimizedUrl(url: string, options: { width?: number; height?: number; quality?: number } = {}): string {
        // If no optimization service configured, return original URL
        if (!this.config.bucketUrl) {
            return url;
        }

        // TODO: Implement URL optimization based on your storage service
        // Example for Cloudinary:
        // return url.replace('/upload/', `/upload/w_${width},h_${height},q_${quality}/`);

        return url;
    }
}

// Export singleton instance
export const mediaUploadService = new MediaUploadService();

// Configuration helper for easy setup
export const configureMediaUpload = (config: UploadConfig) => {
    mediaUploadService.configure(config);
};