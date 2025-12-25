"use client";

import React from 'react';
import { useNetworkStatus } from '@/hooks/useNetworkStatus';
import { WifiOff, Wifi } from 'lucide-react';
import { toast } from 'sonner';

export const NetworkStatusIndicator: React.FC = () => {
    const { isOnline, wasOffline } = useNetworkStatus();

    React.useEffect(() => {
        if (isOnline && wasOffline) {
            toast.success("You're back online!", {
                icon: <Wifi className="w-4 h-4" />,
                duration: 3000,
            });
        } else if (!isOnline) {
            toast.error("You're offline. Some features may not work.", {
                icon: <WifiOff className="w-4 h-4" />,
                duration: 5000,
            });
        }
    }, [isOnline, wasOffline]);

    if (isOnline) return null;

    return (
        <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 px-4 z-50">
            <div className="flex items-center justify-center gap-2">
                <WifiOff className="w-4 h-4" />
                <span className="text-sm font-medium">
                    You're offline. Some features may not work properly.
                </span>
            </div>
        </div>
    );
};