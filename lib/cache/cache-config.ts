/**
 * Cache Configuration
 * Centralized configuration for server and client-side caching
 */

export const CACHE_CONFIG = {
  // Server-side cache tags
  TAGS: {
    ALL_IMAGES: 'all-images',
    USER_IMAGES: 'user-images',
    IMAGE_BY_ID: 'image-by-id',
    IMAGE_COUNT: 'image-count',
  },
  
  // Cache revalidation times (in seconds)
  REVALIDATION: {
    ALL_IMAGES: 60, // 1 minute
    USER_IMAGES: 30, // 30 seconds
    IMAGE_BY_ID: 300, // 5 minutes
    IMAGE_COUNT: 60, // 1 minute
  },
  
  // Client-side cache TTL (in milliseconds)
  CLIENT_TTL: {
    ALL_IMAGES: 60 * 1000, // 1 minute
    USER_IMAGES: 30 * 1000, // 30 seconds
    IMAGE_BY_ID: 5 * 60 * 1000, // 5 minutes
    INFINITE_SCROLL: 2 * 60 * 1000, // 2 minutes for paginated data
  },
  
  // Client-side storage keys
  STORAGE_KEYS: {
    ALL_IMAGES: 'artify-all-images',
    USER_IMAGES: 'artify-user-images',
    IMAGE_BY_ID: 'artify-image',
    INFINITE_SCROLL_ALL: 'artify-infinite-all',
    INFINITE_SCROLL_USER: 'artify-infinite-user',
  },
} as const;

// Helper to generate dynamic cache tags
export const getCacheTag = {
  allImages: (searchQuery?: string) => 
    searchQuery 
      ? `${CACHE_CONFIG.TAGS.ALL_IMAGES}-${searchQuery}` 
      : CACHE_CONFIG.TAGS.ALL_IMAGES,
  
  userImages: (userId: string) => 
    `${CACHE_CONFIG.TAGS.USER_IMAGES}-${userId}`,
  
  imageById: (imageId: string) => 
    `${CACHE_CONFIG.TAGS.IMAGE_BY_ID}-${imageId}`,
  
  imageCount: (userId: string) => 
    `${CACHE_CONFIG.TAGS.IMAGE_COUNT}-${userId}`,
};

// Helper to generate dynamic storage keys
export const getStorageKey = {
  allImages: (searchQuery?: string, offset: number = 0) => 
    `${CACHE_CONFIG.STORAGE_KEYS.ALL_IMAGES}${searchQuery ? `-${searchQuery}` : ''}-${offset}`,
  
  userImages: (userId: string, offset: number = 0) => 
    `${CACHE_CONFIG.STORAGE_KEYS.USER_IMAGES}-${userId}-${offset}`,
  
  imageById: (imageId: string) => 
    `${CACHE_CONFIG.STORAGE_KEYS.IMAGE_BY_ID}-${imageId}`,
  
  infiniteScrollAll: (offset: number, searchQuery?: string) =>
    `${CACHE_CONFIG.STORAGE_KEYS.INFINITE_SCROLL_ALL}-${offset}${searchQuery ? `-${searchQuery}` : ''}`,
  
  infiniteScrollUser: (userId: string, offset: number) =>
    `${CACHE_CONFIG.STORAGE_KEYS.INFINITE_SCROLL_USER}-${userId}-${offset}`,
};
