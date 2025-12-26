// Enhanced logging utility for both development and production

interface LogContext {
    component?: string;
    action?: string;
    userId?: string;
    metadata?: Record<string, any>;
}

class Logger {
    private static instance: Logger;

    static getInstance(): Logger {
        if (!Logger.instance) {
            Logger.instance = new Logger();
        }
        return Logger.instance;
    }

    private formatMessage(level: string, message: string, context?: LogContext): string {
        const timestamp = new Date().toISOString();
        const contextStr = context ? ` | Context: ${JSON.stringify(context)}` : '';
        return `[${timestamp}] ${level.toUpperCase()}: ${message}${contextStr}`;
    }

    error(message: string, error?: Error | unknown, context?: LogContext): void {
        const formattedMessage = this.formatMessage('error', message, context);
        console.error(formattedMessage);

        if (error) {
            console.error('Error details:', error);
            if (error instanceof Error) {
                console.error('Stack trace:', error.stack);
            }
        }

        // In production, you could send to external logging service
        if (process.env.NODE_ENV === 'production') {
            // Example: Send to external service
            // this.sendToExternalService('error', formattedMessage, error);
        }
    }

    warn(message: string, context?: LogContext): void {
        const formattedMessage = this.formatMessage('warn', message, context);
        console.warn(formattedMessage);
    }

    info(message: string, context?: LogContext): void {
        const formattedMessage = this.formatMessage('info', message, context);
        console.info(formattedMessage);
    }

    debug(message: string, context?: LogContext): void {
        // Only log debug in development
        if (process.env.NODE_ENV === 'development') {
            const formattedMessage = this.formatMessage('debug', message, context);
            console.debug(formattedMessage);
        }
    }

    // API request/response logging
    apiRequest(method: string, url: string, data?: any): void {
        this.info(`API Request: ${method.toUpperCase()} ${url}`, {
            component: 'API',
            action: 'request',
            metadata: { method, url, hasData: !!data }
        });
    }

    apiResponse(method: string, url: string, status: number, success: boolean): void {
        const level = success ? 'info' : 'error';
        const message = `API Response: ${method.toUpperCase()} ${url} - ${status}`;

        if (level === 'error') {
            this.error(message, undefined, {
                component: 'API',
                action: 'response',
                metadata: { method, url, status, success }
            });
        } else {
            this.info(message, {
                component: 'API',
                action: 'response',
                metadata: { method, url, status, success }
            });
        }
    }

    // User action logging
    userAction(action: string, component: string, userId?: string, metadata?: Record<string, any>): void {
        this.info(`User Action: ${action}`, {
            component,
            action: 'user_action',
            userId,
            metadata
        });
    }

    // Performance logging
    performance(metric: string, value: number, context?: LogContext): void {
        this.info(`Performance: ${metric} = ${value}ms`, {
            ...context,
            action: 'performance',
            metadata: { metric, value }
        });
    }

    private sendToExternalService(level: string, message: string, error?: Error | unknown): void {
        // Implement external logging service integration here
        // Examples: Sentry, LogRocket, DataDog, etc.

        // Example structure:
        // externalLogger.log({
        //   level,
        //   message,
        //   error: error instanceof Error ? error.message : String(error),
        //   stack: error instanceof Error ? error.stack : undefined,
        //   timestamp: new Date().toISOString(),
        //   environment: process.env.NODE_ENV,
        //   url: typeof window !== 'undefined' ? window.location.href : undefined,
        //   userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : undefined
        // });
    }
}

// Export singleton instance
export const logger = Logger.getInstance();

// Convenience exports
export const logError = (message: string, error?: Error | unknown, context?: LogContext) =>
    logger.error(message, error, context);

export const logWarn = (message: string, context?: LogContext) =>
    logger.warn(message, context);

export const logInfo = (message: string, context?: LogContext) =>
    logger.info(message, context);

export const logDebug = (message: string, context?: LogContext) =>
    logger.debug(message, context);

export const logApiRequest = (method: string, url: string, data?: any) =>
    logger.apiRequest(method, url, data);

export const logApiResponse = (method: string, url: string, status: number, success: boolean) =>
    logger.apiResponse(method, url, status, success);

export const logUserAction = (action: string, component: string, userId?: string, metadata?: Record<string, any>) =>
    logger.userAction(action, component, userId, metadata);

export const logPerformance = (metric: string, value: number, context?: LogContext) =>
    logger.performance(metric, value, context);