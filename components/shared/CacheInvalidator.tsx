/**
 * Cache Invalidation Component
 * Provides client-side cache invalidation on image mutations
 */

"use client";

import { useEffect } from 'react';
import { clientCache } from '@/lib/cache/client-cache';
import { CACHE_CONFIG } from '@/lib/cache/cache-config';

interface CacheInvalidatorProps {
  /**
   * Trigger cache invalidation (timestamp or any changing value)
   */
  trigger?: number | string;
  
  /**
   * Specific patterns to invalidate
   */
  patterns?: string[];
  
  /**
   * Whether to clear all caches
   */
  clearAll?: boolean;
}

/**
 * Component to handle client-side cache invalidation
 * Use this in pages/layouts where image mutations occur
 */
export function CacheInvalidator({ 
  trigger, 
  patterns = [],
  clearAll = false 
}: CacheInvalidatorProps) {
  useEffect(() => {
    if (!trigger) return;

    if (clearAll) {
      clientCache.clearAll();
    } else if (patterns.length > 0) {
      patterns.forEach(pattern => {
        clientCache.invalidatePattern(pattern);
      });
    }
  }, [trigger, patterns, clearAll]);

  return null;
}

/**
 * Hook to manually invalidate caches
 */
export function useCacheInvalidation() {
  const invalidateAllImages = () => {
    clientCache.invalidatePattern(CACHE_CONFIG.STORAGE_KEYS.ALL_IMAGES);
    clientCache.invalidatePattern(CACHE_CONFIG.STORAGE_KEYS.INFINITE_SCROLL_ALL);
  };

  const invalidateUserImages = (userId: string) => {
    clientCache.invalidatePattern(`${CACHE_CONFIG.STORAGE_KEYS.USER_IMAGES}-${userId}`);
    clientCache.invalidatePattern(`${CACHE_CONFIG.STORAGE_KEYS.INFINITE_SCROLL_USER}-${userId}`);
  };

  const invalidateImageById = (imageId: string) => {
    const key = `${CACHE_CONFIG.STORAGE_KEYS.IMAGE_BY_ID}-${imageId}`;
    clientCache.invalidate(key);
  };

  const clearAllCaches = () => {
    clientCache.clearAll();
  };

  const getCacheStats = () => {
    return clientCache.getStats();
  };

  return {
    invalidateAllImages,
    invalidateUserImages,
    invalidateImageById,
    clearAllCaches,
    getCacheStats,
  };
}
