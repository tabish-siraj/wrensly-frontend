// Utility functions to convert between snake_case (API) and camelCase (Frontend)

export const toCamelCase = (str: string): string => {
    return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
};

export const toSnakeCase = (str: string): string => {
    return str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`);
};

// Convert object keys from snake_case to camelCase recursively
export const convertToCamelCase = (obj: any): any => {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(convertToCamelCase);
    }

    if (typeof obj === 'object' && obj.constructor === Object) {
        const converted: any = {};
        for (const [key, value] of Object.entries(obj)) {
            const camelKey = toCamelCase(key);
            converted[camelKey] = convertToCamelCase(value);
        }
        return converted;
    }

    return obj;
};

// Convert object keys from camelCase to snake_case recursively
export const convertToSnakeCase = (obj: any): any => {
    if (obj === null || obj === undefined) {
        return obj;
    }

    if (Array.isArray(obj)) {
        return obj.map(convertToSnakeCase);
    }

    if (typeof obj === 'object' && obj.constructor === Object) {
        const converted: any = {};
        for (const [key, value] of Object.entries(obj)) {
            const snakeKey = toSnakeCase(key);
            converted[snakeKey] = convertToSnakeCase(value);
        }
        return converted;
    }

    return obj;
};