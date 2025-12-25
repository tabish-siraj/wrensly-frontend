"use client";

import { useState, useEffect, useCallback } from 'react';
import { debounce } from 'lodash';

interface DraftData {
    content: string;
    parent_id?: string;
    type?: string;
    timestamp: number;
}

export function useDraftPost(key: string = 'post-draft') {
    const [draft, setDraft] = useState<string>('');
    const [isAutoSaving, setIsAutoSaving] = useState(false);
    const [lastSaved, setLastSaved] = useState<Date | null>(null);

    // Load draft from localStorage on mount
    useEffect(() => {
        if (typeof window === 'undefined') return;

        try {
            const savedDraft = localStorage.getItem(key);
            if (savedDraft) {
                const draftData: DraftData = JSON.parse(savedDraft);
                // Only load if draft is less than 24 hours old
                const isRecent = Date.now() - draftData.timestamp < 24 * 60 * 60 * 1000;
                if (isRecent && draftData.content) {
                    setDraft(draftData.content);
                    setLastSaved(new Date(draftData.timestamp));
                }
            }
        } catch (error) {
            console.warn('Failed to load draft:', error);
        }
    }, [key]);

    // Debounced save function
    const debouncedSave = useCallback(
        debounce((content: string) => {
            if (typeof window === 'undefined') return;

            setIsAutoSaving(true);

            try {
                const draftData: DraftData = {
                    content,
                    timestamp: Date.now(),
                };

                if (content.trim()) {
                    localStorage.setItem(key, JSON.stringify(draftData));
                } else {
                    localStorage.removeItem(key);
                }

                setLastSaved(new Date());
            } catch (error) {
                console.warn('Failed to save draft:', error);
            } finally {
                setIsAutoSaving(false);
            }
        }, 1000),
        [key]
    );

    // Auto-save when draft changes
    useEffect(() => {
        if (draft !== '') {
            debouncedSave(draft);
        }

        return () => {
            debouncedSave.cancel();
        };
    }, [draft, debouncedSave]);

    const clearDraft = useCallback(() => {
        setDraft('');
        setLastSaved(null);
        if (typeof window !== 'undefined') {
            localStorage.removeItem(key);
        }
    }, [key]);

    const updateDraft = useCallback((content: string) => {
        setDraft(content);
    }, []);

    return {
        draft,
        updateDraft,
        clearDraft,
        isAutoSaving,
        lastSaved,
    };
}