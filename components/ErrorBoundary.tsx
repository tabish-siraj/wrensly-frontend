"use client";

import React from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface ErrorBoundaryState {
    hasError: boolean;
    error?: Error;
    errorInfo?: React.ErrorInfo;
}

interface ErrorBoundaryProps {
    children: React.ReactNode;
    fallback?: React.ComponentType<{ error?: Error; resetError: () => void }>;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true, error };
    }

    componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
        this.setState({ errorInfo });

        // Report error to monitoring service (implement when ready)
        if (process.env.NODE_ENV === 'production') {
            // reportError(error, errorInfo);
        } else {
            console.error('Error caught by boundary:', error, errorInfo);
        }
    }

    resetError = () => {
        this.setState({ hasError: false, error: undefined, errorInfo: undefined });
    };

    render() {
        if (this.state.hasError) {
            const FallbackComponent = this.props.fallback || EnhancedErrorFallback;
            return (
                <FallbackComponent
                    error={this.state.error}
                    resetError={this.resetError}
                    errorInfo={this.state.errorInfo}
                />
            );
        }

        return this.props.children;
    }
}

const EnhancedErrorFallback: React.FC<{
    error?: Error;
    resetError: () => void;
    errorInfo?: React.ErrorInfo;
}> = ({ error, resetError, errorInfo }) => {
    const [showDetails, setShowDetails] = React.useState(false);

    return (
        <div className="min-h-[400px] flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border">
            <div className="mb-6">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Something went wrong</h2>
                <p className="text-gray-600 max-w-md">
                    We're sorry, but something unexpected happened. You can try refreshing the page or go back to the home page.
                </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mb-4">
                <Button
                    onClick={resetError}
                    className="flex items-center gap-2"
                >
                    <RefreshCw className="w-4 h-4" />
                    Try Again
                </Button>

                <Link href="/">
                    <Button variant="outline" className="flex items-center gap-2">
                        <Home className="w-4 h-4" />
                        Go Home
                    </Button>
                </Link>
            </div>

            {process.env.NODE_ENV === 'development' && (
                <div className="mt-4 w-full max-w-2xl">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setShowDetails(!showDetails)}
                        className="mb-2"
                    >
                        {showDetails ? 'Hide' : 'Show'} Error Details
                    </Button>

                    {showDetails && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-left">
                            <h3 className="font-semibold text-red-800 mb-2">Error Details:</h3>
                            <pre className="text-sm text-red-700 whitespace-pre-wrap overflow-auto max-h-40">
                                {error?.message}
                                {error?.stack && `\n\nStack Trace:\n${error.stack}`}
                                {errorInfo?.componentStack && `\n\nComponent Stack:${errorInfo.componentStack}`}
                            </pre>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default ErrorBoundary;