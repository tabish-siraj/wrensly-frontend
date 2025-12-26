"use client";

import React, { useEffect, useRef, useCallback } from 'react';
import { Loader2 } from 'lucide-react';

interface InfiniteScrollProps {
    children: React.ReactNode;
    hasNextPage: boolean;
    isFetchingNextPage: boolean;
    fetchNextPage: () => void;
    loader?: React.ReactNode;
    threshold?: number;
    className?: string;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
    children,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
    loader,
    threshold = 100,
    className = "",
}) => {
    const observerRef = useRef<IntersectionObserver | null>(null);
    const loadingRef = useRef<HTMLDivElement>(null);

    const handleObserver = useCallback(
        (entries: IntersectionObserverEntry[]) => {
            const [target] = entries;
            if (target?.isIntersecting && hasNextPage && !isFetchingNextPage) {
                fetchNextPage();
            }
        },
        [fetchNextPage, hasNextPage, isFetchingNextPage]
    );

    useEffect(() => {
        const element = loadingRef.current;
        if (!element) return;

        observerRef.current = new IntersectionObserver(handleObserver, {
            threshold: 0.1,
            rootMargin: `${threshold}px`,
        });

        observerRef.current.observe(element);

        return () => {
            if (observerRef.current) {
                observerRef.current.disconnect();
            }
        };
    }, [handleObserver, threshold]);

    const defaultLoader = (
        <div className="flex justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
        </div>
    );

    return (
        <div className={className}>
            {children}

            {hasNextPage && (
                <div ref={loadingRef} className="w-full">
                    {isFetchingNextPage ? (loader || defaultLoader) : null}
                </div>
            )}

            {!hasNextPage && (
                <div className="text-center py-8 text-gray-500">
                    <p>You've reached the end! 🎉</p>
                </div>
            )}
        </div>
    );
};