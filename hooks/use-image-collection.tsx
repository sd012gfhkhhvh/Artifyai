/**
 * Custom hook for image collection with client-side caching
 */

import { useCallback, useEffect, useState } from 'react';
import { clientCache } from '@/lib/cache/client-cache';
import { CACHE_CONFIG, getStorageKey } from '@/lib/cache/cache-config';
import { infiniteScrollImageLoader } from '@/lib/actions/image.action';
import { infiniteScrollImageLoadertype } from '@/lib/types';

interface UseImageCollectionOptions {
  type: infiniteScrollImageLoadertype;
  userId?: string | null;
  searchQuery?: string;
  initialImages: any[];
  limit: number;
}

export function useImageCollection({
  type,
  userId,
  searchQuery,
  initialImages,
  limit,
}: UseImageCollectionOptions) {
  const [allImages, setAllImages] = useState<any[]>(initialImages);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(limit);

  // Determine cache key and TTL based on type
  const getCacheConfig = useCallback(() => {
    switch (type) {
      case infiniteScrollImageLoadertype.ALL:
        return {
          key: getStorageKey.infiniteScrollAll(offset, searchQuery),
          ttl: CACHE_CONFIG.CLIENT_TTL.ALL_IMAGES,
          pattern: CACHE_CONFIG.STORAGE_KEYS.INFINITE_SCROLL_ALL,
        };
      case infiniteScrollImageLoadertype.USER:
        return {
          key: getStorageKey.infiniteScrollUser(userId || '', offset),
          ttl: CACHE_CONFIG.CLIENT_TTL.USER_IMAGES,
          pattern: `${CACHE_CONFIG.STORAGE_KEYS.INFINITE_SCROLL_USER}-${userId}`,
        };
      default:
        return {
          key: '',
          ttl: CACHE_CONFIG.CLIENT_TTL.INFINITE_SCROLL,
          pattern: '',
        };
    }
  }, [type, userId, searchQuery, offset]);

  // Load more images with client-side caching
  const loadMoreImages = useCallback(async () => {
    if (isLoading) return;

    const { key, ttl } = getCacheConfig();

    try {
      setIsLoading(true);

      // Check cache first
      const cachedData = clientCache.get<any[]>(key);
      if (cachedData) {
        console.log('Using cached data for offset:', offset);
        setOffset((o) => o + limit);
        setAllImages((images) => [...images, ...cachedData]);
        return;
      }

      // Fetch fresh data
      const newImages = await infiniteScrollImageLoader({
        type,
        offset,
        searchQuery,
        userId: userId ?? undefined,
      });

      if (!newImages) return;

      // Cache the fetched data
      clientCache.set(key, newImages.data, ttl);

      setOffset((o) => o + limit);
      setAllImages((images) => [...images, ...newImages.data]);
    } catch (error) {
      console.error('Error loading more images:', error);
    } finally {
      setIsLoading(false);
    }
  }, [offset, searchQuery, isLoading, type, userId, limit, getCacheConfig]);

  // Invalidate cache when search query changes
  useEffect(() => {
    const { pattern } = getCacheConfig();
    if (pattern) {
      clientCache.invalidatePattern(pattern);
    }
  }, [searchQuery]);

  // Prefetch next page on mount for better UX
  useEffect(() => {
    const prefetchNextPage = async () => {
      const { key, ttl } = getCacheConfig();
      
      // Only prefetch if not already cached
      if (!clientCache.has(key)) {
        try {
          const nextPageData = await infiniteScrollImageLoader({
            type,
            offset,
            searchQuery,
            userId: userId ?? undefined,
          });

          if (nextPageData?.data) {
            clientCache.set(key, nextPageData.data, ttl);
          }
        } catch (error) {
          console.error('Error prefetching:', error);
        }
      }
    };

    // Prefetch after a short delay to avoid blocking initial render
    const timeoutId = setTimeout(prefetchNextPage, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  // Clear cache function for manual invalidation
  const clearCache = useCallback(() => {
    const { pattern } = getCacheConfig();
    if (pattern) {
      clientCache.invalidatePattern(pattern);
    }
  }, [getCacheConfig]);

  return {
    allImages,
    isLoading,
    offset,
    loadMoreImages,
    clearCache,
  };
}
