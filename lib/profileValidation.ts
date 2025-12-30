// Profile validation utilities

export interface ValidationResult {
    isValid: boolean;
    errors: string[];
}

export const validateUsername = (username: string): ValidationResult => {
    const errors: string[] = [];

    if (!username) {
        errors.push("Username is required");
        return { isValid: false, errors };
    }

    if (username.length < 3) {
        errors.push("Username must be at least 3 characters long");
    }

    if (username.length > 30) {
        errors.push("Username must be less than 30 characters");
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        errors.push("Username can only contain letters, numbers, and underscores");
    }

    if (/^[0-9]/.test(username)) {
        errors.push("Username cannot start with a number");
    }

    // Reserved usernames
    const reserved = ['admin', 'api', 'www', 'mail', 'ftp', 'localhost', 'root', 'support', 'help', 'about', 'contact', 'terms', 'privacy'];
    if (reserved.includes(username.toLowerCase())) {
        errors.push("This username is reserved");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateBio = (bio: string): ValidationResult => {
    const errors: string[] = [];

    if (bio && bio.length > 160) {
        errors.push("Bio must be less than 160 characters");
    }

    // Check for excessive special characters or spam patterns
    if (bio && /(.)\1{10,}/.test(bio)) {
        errors.push("Bio contains too many repeated characters");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateWebsite = (website: string): ValidationResult => {
    const errors: string[] = [];

    if (!website) {
        return { isValid: true, errors };
    }

    try {
        const url = new URL(website);

        // Only allow http and https
        if (!['http:', 'https:'].includes(url.protocol)) {
            errors.push("Website must use http:// or https://");
        }

        // Basic domain validation
        if (!url.hostname || url.hostname.length < 3) {
            errors.push("Invalid website URL");
        }

    } catch (error) {
        errors.push("Invalid website URL format");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validatePhone = (phone: string): ValidationResult => {
    const errors: string[] = [];

    if (!phone) {
        return { isValid: true, errors };
    }

    // Remove all non-digit characters for validation
    const digitsOnly = phone.replace(/\D/g, '');

    if (digitsOnly.length < 10) {
        errors.push("Phone number must have at least 10 digits");
    }

    if (digitsOnly.length > 15) {
        errors.push("Phone number must have less than 15 digits");
    }

    // Basic format validation (allows various international formats)
    if (!/^[\+]?[1-9][\d\s\-\(\)]{8,}$/.test(phone)) {
        errors.push("Invalid phone number format");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateAge = (dateOfBirth: string): ValidationResult => {
    const errors: string[] = [];

    if (!dateOfBirth) {
        return { isValid: true, errors };
    }

    const birthDate = new Date(dateOfBirth);
    const today = new Date();

    if (isNaN(birthDate.getTime())) {
        errors.push("Invalid date format");
        return { isValid: false, errors };
    }

    if (birthDate > today) {
        errors.push("Date of birth cannot be in the future");
    }

    // Calculate age
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
        // Haven't had birthday this year
    }

    if (age < 13) {
        errors.push("You must be at least 13 years old to use this platform");
    }

    if (age > 120) {
        errors.push("Please enter a valid date of birth");
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

export const validateImageUrl = (url: string, type: 'avatar' | 'cover'): ValidationResult => {
    const errors: string[] = [];

    if (!url) {
        return { isValid: true, errors };
    }

    try {
        const urlObj = new URL(url);

        // Only allow http and https
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
            errors.push(`${type} URL must use http:// or https://`);
        }

        // Check for common image extensions
        const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp'];
        const hasValidExtension = validExtensions.some(ext =>
            urlObj.pathname.toLowerCase().endsWith(ext)
        );

        if (!hasValidExtension) {
            errors.push(`${type} URL should point to an image file (jpg, png, gif, webp)`);
        }

    } catch (error) {
        errors.push(`Invalid ${type} URL format`);
    }

    return {
        isValid: errors.length === 0,
        errors
    };
};

// Comprehensive profile validation
export const validateProfile = (profile: any): { isValid: boolean; fieldErrors: Record<string, string[]> } => {
    const fieldErrors: Record<string, string[]> = {};

    // Validate each field
    const usernameResult = validateUsername(profile.username);
    if (!usernameResult.isValid) {
        fieldErrors.username = usernameResult.errors;
    }

    const bioResult = validateBio(profile.bio);
    if (!bioResult.isValid) {
        fieldErrors.bio = bioResult.errors;
    }

    const websiteResult = validateWebsite(profile.website);
    if (!websiteResult.isValid) {
        fieldErrors.website = websiteResult.errors;
    }

    const phoneResult = validatePhone(profile.phone);
    if (!phoneResult.isValid) {
        fieldErrors.phone = phoneResult.errors;
    }

    const ageResult = validateAge(profile.date_of_birth);
    if (!ageResult.isValid) {
        fieldErrors.date_of_birth = ageResult.errors;
    }

    const avatarResult = validateImageUrl(profile.avatar, 'avatar');
    if (!avatarResult.isValid) {
        fieldErrors.avatar = avatarResult.errors;
    }

    const coverResult = validateImageUrl(profile.cover, 'cover');
    if (!coverResult.isValid) {
        fieldErrors.cover = coverResult.errors;
    }

    return {
        isValid: Object.keys(fieldErrors).length === 0,
        fieldErrors
    };
};