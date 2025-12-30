"use client";

import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, X, Image as ImageIcon, Loader2 } from "lucide-react";
import Image from "next/image";
import { mediaUploadService } from "@/lib/mediaUpload";
import { toast } from "sonner";

interface MediaUploadProps {
    value?: string;
    onChange: (url: string) => void;
    onRemove: () => void;
    disabled?: boolean;
    type: "avatar" | "cover";
    className?: string;
}

export function MediaUpload({
    value,
    onChange,
    onRemove,
    disabled = false,
    type,
    className = "",
}: MediaUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            toast.error("Please select an image file");
            return;
        }

        // Validate file size (5MB limit)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (file.size > maxSize) {
            toast.error("File size must be less than 5MB");
            return;
        }

        setIsUploading(true);

        try {
            // Use the enhanced media upload service
            const result = await mediaUploadService.uploadFile(file, type === 'avatar' ? 'avatars' : 'covers');

            if (result.success && result.url) {
                onChange(result.url);
                toast.success(`${type === 'avatar' ? 'Profile picture' : 'Cover photo'} uploaded successfully`);
            } else {
                throw new Error(result.error || 'Upload failed');
            }
        } catch (error) {
            console.error('Upload error:', error);
            toast.error("Upload failed. Please try again.");
        } finally {
            setIsUploading(false);
            // Reset file input
            if (fileInputRef.current) {
                fileInputRef.current.value = '';
            }
        }
    };

    const handleUploadClick = () => {
        if (disabled) {
            toast.error("Media upload is currently disabled. Please contact support.");
            return;
        }
        fileInputRef.current?.click();
    };

    const handleRemove = () => {
        onRemove();
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const getUploadText = () => {
        if (type === 'avatar') {
            return value ? 'Change profile picture' : 'Upload profile picture';
        }
        return value ? 'Change cover photo' : 'Upload cover photo';
    };

    const getPreviewSize = () => {
        if (type === 'avatar') {
            return { width: 120, height: 120 };
        }
        return { width: 400, height: 160 };
    };

    const getPreviewClasses = () => {
        if (type === 'avatar') {
            return "w-30 h-30 rounded-full";
        }
        return "w-full h-40 rounded-lg";
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Hidden file input */}
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
                disabled={disabled || isUploading}
            />

            {/* Preview */}
            {value && (
                <div className="relative inline-block">
                    <div className={`overflow-hidden ${getPreviewClasses()}`}>
                        <Image
                            src={value}
                            alt={type === 'avatar' ? 'Profile picture' : 'Cover photo'}
                            width={getPreviewSize().width}
                            height={getPreviewSize().height}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                                console.error('Image load error:', e);
                                e.currentTarget.style.display = 'none';
                            }}
                        />
                    </div>

                    {/* Remove button */}
                    <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        onClick={handleRemove}
                        disabled={disabled || isUploading}
                        className="absolute -top-2 -right-2 h-6 w-6 rounded-full p-0"
                    >
                        <X className="w-3 h-3" />
                    </Button>
                </div>
            )}

            {/* Upload button */}
            <div className="flex gap-2">
                <Button
                    type="button"
                    variant="outline"
                    onClick={handleUploadClick}
                    disabled={disabled || isUploading}
                    className="flex items-center gap-2"
                >
                    {isUploading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                        <Upload className="w-4 h-4" />
                    )}
                    {isUploading ? 'Uploading...' : getUploadText()}
                </Button>

                {/* Disabled notice */}
                {disabled && (
                    <div className="flex items-center text-sm text-gray-500">
                        <ImageIcon className="w-4 h-4 mr-1" />
                        Upload disabled (bucket not configured)
                    </div>
                )}
            </div>

            {/* File requirements */}
            <p className="text-xs text-gray-500">
                Supported formats: JPG, PNG, GIF. Max size: 5MB.
                {type === 'avatar' && ' Recommended: Square image, at least 200x200px.'}
                {type === 'cover' && ' Recommended: 1500x500px for best quality.'}
            </p>
        </div>
    );
}