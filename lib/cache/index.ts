/**
 * Cache Module - Central Export
 * Import from this file for all caching needs
 */

// Configuration
export { 
  CACHE_CONFIG, 
  getCacheTag, 
  getStorageKey 
} from './cache-config';

// Client-side cache
export { 
  clientCache, 
  useClientCache 
} from './client-cache';

// Server-side utilities
export {
  invalidateAllImages,
  invalidateUserImages,
  invalidateImageById,
  invalidateImageCount,
  invalidateUserCaches,
  revalidateImagePaths,
  getAllCacheTags,
  invalidateAllCaches,
} from './server-cache-utils';
