/**
 * Server-side Cache Utilities
 * Provides cache invalidation and revalidation helpers
 */

import { revalidateTag, revalidatePath } from 'next/cache';
import { CACHE_CONFIG, getCacheTag } from './cache-config';

/**
 * Invalidate all images cache
 */
export function invalidateAllImages(searchQuery?: string) {
  const tag = getCacheTag.allImages(searchQuery);
  revalidateTag(tag);
  
  // Also invalidate the general all-images tag
  if (searchQuery) {
    revalidateTag(CACHE_CONFIG.TAGS.ALL_IMAGES);
  }
}

/**
 * Invalidate user images cache
 */
export function invalidateUserImages(userId: string) {
  const tag = getCacheTag.userImages(userId);
  revalidateTag(tag);
}

/**
 * Invalidate specific image cache
 */
export function invalidateImageById(imageId: string) {
  const tag = getCacheTag.imageById(imageId);
  revalidateTag(tag);
}

/**
 * Invalidate image count cache
 */
export function invalidateImageCount(userId: string) {
  const tag = getCacheTag.imageCount(userId);
  revalidateTag(tag);
}

/**
 * Invalidate all caches for a user
 */
export function invalidateUserCaches(userId: string) {
  invalidateUserImages(userId);
  invalidateImageCount(userId);
  // Also invalidate all images since user's images might appear there
  invalidateAllImages();
}

/**
 * Revalidate specific paths
 */
export function revalidateImagePaths(paths: string[]) {
  paths.forEach(path => {
    revalidatePath(path);
  });
}

/**
 * Get all cache tags for comprehensive invalidation
 */
export function getAllCacheTags() {
  return Object.values(CACHE_CONFIG.TAGS);
}

/**
 * Invalidate all image-related caches (nuclear option)
 */
export function invalidateAllCaches() {
  getAllCacheTags().forEach(tag => {
    revalidateTag(tag);
  });
}
