import { useEffect, useState } from 'react';

/**
 * Hook to handle hydration mismatches in Next.js
 * Returns true only after the component has hydrated on the client
 */
export function useHydration() {
    const [isHydrated, setIsHydrated] = useState(false);

    useEffect(() => {
        setIsHydrated(true);
    }, []);

    return isHydrated;
}

/**
 * Hook specifically for Zustand stores with persist middleware
 * Waits for both client hydration and store rehydration
 */
export function useStoreHydration(hasStoreHydrated: boolean) {
    const isClientHydrated = useHydration();

    return isClientHydrated && hasStoreHydrated;
}