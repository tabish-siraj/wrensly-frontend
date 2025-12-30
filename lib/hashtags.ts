// Hashtag utility functions
import React from 'react';

/**
 * Extract hashtags from text content
 */
export const extractHashtags = (content: string): string[] => {
    if (!content) return [];

    // Regex to match hashtags: # followed by alphanumeric characters and underscores
    const hashtagRegex = /#[a-zA-Z0-9_]+/g;
    const matches = content.match(hashtagRegex);

    if (!matches) return [];

    // Remove # symbol and convert to lowercase, remove duplicates
    const hashtags = matches
        .map(tag => tag.slice(1).toLowerCase())
        .filter((tag, index, arr) => arr.indexOf(tag) === index) // Remove duplicates
        .filter(tag => tag.length > 0 && tag.length <= 50); // Validate length

    return hashtags;
};

/**
 * Convert text content to JSX with clickable hashtags
 */
export const renderContentWithHashtags = (
    content: string,
    onHashtagClick?: (hashtag: string) => void
): React.ReactNode => {
    if (!content) return null;

    // Split content by hashtags while preserving them
    const parts = content.split(/(#[a-zA-Z0-9_]+)/g);

    return parts.map((part, index) => {
        if (part.startsWith('#')) {
            const hashtag = part.slice(1);
            return React.createElement(
                'span',
                {
                    key: index,
                    className: 'text-blue-500 hover:text-blue-600 cursor-pointer font-medium',
                    onClick: (e: React.MouseEvent) => {
                        e.stopPropagation();
                        onHashtagClick?.(hashtag);
                    }
                },
                part
            );
        }
        return part;
    });
};

/**
 * Validate hashtag name
 */
export const isValidHashtag = (hashtag: string): boolean => {
    if (!hashtag || hashtag.length === 0) return false;
    if (hashtag.length > 50) return false;

    // Only allow alphanumeric characters and underscores
    const validPattern = /^[a-zA-Z0-9_]+$/;
    return validPattern.test(hashtag);
};

/**
 * Format hashtag for display (add # if missing)
 */
export const formatHashtag = (hashtag: string): string => {
    if (!hashtag) return '';
    return hashtag.startsWith('#') ? hashtag : `#${hashtag}`;
};

/**
 * Clean hashtag name (remove # and convert to lowercase)
 */
export const cleanHashtag = (hashtag: string): string => {
    if (!hashtag) return '';
    return hashtag.replace('#', '').toLowerCase();
};

/**
 * Get hashtag suggestions based on input
 */
export const getHashtagSuggestions = (input: string, existingHashtags: string[]): string[] => {
    if (!input || input.length < 1) return [];

    const cleanInput = cleanHashtag(input);

    // Filter existing hashtags that match the input
    return existingHashtags
        .filter(tag => tag.toLowerCase().includes(cleanInput))
        .slice(0, 5); // Limit to 5 suggestions
};

/**
 * Count hashtags in content
 */
export const countHashtags = (content: string): number => {
    return extractHashtags(content).length;
};

/**
 * Check if content has hashtags
 */
export const hasHashtags = (content: string): boolean => {
    return countHashtags(content) > 0;
};