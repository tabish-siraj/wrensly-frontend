"use client";

import { useEffect } from 'react';

interface PerformanceMetrics {
    name: string;
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
}

export function usePerformanceMonitoring() {
    useEffect(() => {
        if (typeof window === 'undefined') return;

        // Only run in production or when explicitly enabled
        if (process.env.NODE_ENV !== 'production' && !process.env.NEXT_PUBLIC_ENABLE_PERFORMANCE_MONITORING) {
            return;
        }

        const reportMetric = (metric: PerformanceMetrics) => {
            // In a real app, you'd send this to your analytics service
            console.log('Performance Metric:', metric);

            // Example: Send to analytics service
            // analytics.track('performance_metric', metric);
        };

        // Cumulative Layout Shift (CLS)
        const observeCLS = () => {
            let clsValue = 0;
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (!(entry as any).hadRecentInput) {
                        clsValue += (entry as any).value;
                    }
                }
            });

            observer.observe({ type: 'layout-shift', buffered: true });

            // Report CLS when the page is about to be unloaded
            window.addEventListener('beforeunload', () => {
                reportMetric({
                    name: 'CLS',
                    value: clsValue,
                    rating: clsValue < 0.1 ? 'good' : clsValue < 0.25 ? 'needs-improvement' : 'poor'
                });
            });
        };

        // First Input Delay (FID)
        const observeFID = () => {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    const fid = entry.processingStart - entry.startTime;
                    reportMetric({
                        name: 'FID',
                        value: fid,
                        rating: fid < 100 ? 'good' : fid < 300 ? 'needs-improvement' : 'poor'
                    });
                }
            });

            observer.observe({ type: 'first-input', buffered: true });
        };

        // Largest Contentful Paint (LCP)
        const observeLCP = () => {
            const observer = new PerformanceObserver((list) => {
                const entries = list.getEntries();
                const lastEntry = entries[entries.length - 1];
                const lcp = lastEntry.startTime;

                reportMetric({
                    name: 'LCP',
                    value: lcp,
                    rating: lcp < 2500 ? 'good' : lcp < 4000 ? 'needs-improvement' : 'poor'
                });
            });

            observer.observe({ type: 'largest-contentful-paint', buffered: true });
        };

        // First Contentful Paint (FCP)
        const observeFCP = () => {
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    if (entry.name === 'first-contentful-paint') {
                        reportMetric({
                            name: 'FCP',
                            value: entry.startTime,
                            rating: entry.startTime < 1800 ? 'good' : entry.startTime < 3000 ? 'needs-improvement' : 'poor'
                        });
                    }
                }
            });

            observer.observe({ type: 'paint', buffered: true });
        };

        // Time to First Byte (TTFB)
        const observeTTFB = () => {
            const navigationEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
            if (navigationEntry) {
                const ttfb = navigationEntry.responseStart - navigationEntry.requestStart;
                reportMetric({
                    name: 'TTFB',
                    value: ttfb,
                    rating: ttfb < 800 ? 'good' : ttfb < 1800 ? 'needs-improvement' : 'poor'
                });
            }
        };

        // Initialize observers
        try {
            observeCLS();
            observeFID();
            observeLCP();
            observeFCP();
            observeTTFB();
        } catch (error) {
            console.warn('Performance monitoring not supported:', error);
        }
    }, []);
}