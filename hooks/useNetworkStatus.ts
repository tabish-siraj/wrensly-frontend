"use client";

import { useState, useEffect } from 'react';

export function useNetworkStatus() {
    const [isOnline, setIsOnline] = useState(true);
    const [wasOffline, setWasOffline] = useState(false);

    useEffect(() => {
        // Check if we're in the browser
        if (typeof window === 'undefined') return;

        // Set initial state
        setIsOnline(navigator.onLine);

        const handleOnline = () => {
            setIsOnline(true);
            if (wasOffline) {
                // Show reconnection message
                setWasOffline(false);
            }
        };

        const handleOffline = () => {
            setIsOnline(false);
            setWasOffline(true);
        };

        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);

        return () => {
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
        };
    }, [wasOffline]);

    return { isOnline, wasOffline };
}