# Migration Guide - Adding Caching to Existing Image Collections

This guide helps you upgrade existing image collection components to use the new caching system.

## Quick Start

### For New Collections

If you're creating a new image collection, simply use the existing components - they already have caching built-in:

```tsx
import { AllImagesCollection } from '@/components/shared/all-images-collection';

// In your page
export default async function Page() {
  return <AllImagesCollection searchQuery="" />;
}
```

### For Existing Collections

If you have custom collection components, follow these steps:

## Step 1: Update Server Actions

Your server actions in `/lib/actions/image.action.ts` already have caching! No changes needed if you're using:
- `getAllImages()`
- `getUserImages()`
- `getImageById()`
- `getImageCount()`

## Step 2: Update Client Components

Replace manual state management with the `useImageCollection` hook:

### Before:
```tsx
'use client';

import { useState, useCallback } from 'react';
import { infiniteScrollImageLoader } from '@/lib/actions/image.action';

export function MyCollection({ initialImages, type, userId }) {
  const [images, setImages] = useState(initialImages);
  const [isLoading, setIsLoading] = useState(false);
  const [offset, setOffset] = useState(6);

  const loadMore = useCallback(async () => {
    if (isLoading) return;
    setIsLoading(true);
    
    const newImages = await infiniteScrollImageLoader({
      type,
      offset,
      userId,
    });
    
    if (newImages) {
      setImages(prev => [...prev, ...newImages.data]);
      setOffset(prev => prev + 6);
    }
    
    setIsLoading(false);
  }, [offset, isLoading]);

  return (
    <div>
      {/* Render images */}
    </div>
  );
}
```

### After:
```tsx
'use client';

import { useImageCollection } from '@/hooks/use-image-collection';

export function MyCollection({ initialImages, type, userId }) {
  const {
    allImages,
    isLoading,
    offset,
    loadMoreImages,
    clearCache,
  } = useImageCollection({
    type,
    userId,
    searchQuery: '',
    initialImages,
    limit: 6,
  });

  return (
    <div>
      {/* Render allImages instead of images */}
    </div>
  );
}
```

## Step 3: Add Cache Invalidation to Mutations

Update any components that create, update, or delete images:

### Before:
```tsx
'use client';

import { deleteImage } from '@/lib/actions/image.action';

export function DeleteButton({ imageId }) {
  const handleDelete = async () => {
    await deleteImage(imageId);
    // Page reloads or manually refetch
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

### After:
```tsx
'use client';

import { deleteImage } from '@/lib/actions/image.action';
import { useCacheInvalidation } from '@/components/shared/CacheInvalidator';

export function DeleteButton({ imageId, userId }) {
  const { invalidateUserImages, invalidateAllImages } = useCacheInvalidation();
  
  const handleDelete = async () => {
    await deleteImage(imageId);
    
    // Clear client-side caches
    invalidateUserImages(userId);
    invalidateAllImages();
    
    // Server cache is automatically invalidated in the deleteImage action
  };

  return <button onClick={handleDelete}>Delete</button>;
}
```

## Step 4: Verify Configuration

Check `/lib/cache/cache-config.ts` and adjust TTL values if needed:

```typescript
export const CACHE_CONFIG = {
  REVALIDATION: {
    ALL_IMAGES: 60,      // Adjust based on update frequency
    USER_IMAGES: 30,
    IMAGE_BY_ID: 300,
    IMAGE_COUNT: 60,
  },
  CLIENT_TTL: {
    ALL_IMAGES: 60 * 1000,      // Adjust based on user behavior
    USER_IMAGES: 30 * 1000,
    IMAGE_BY_ID: 5 * 60 * 1000,
    INFINITE_SCROLL: 2 * 60 * 1000,
  },
};
```

## Step 5: Test the Implementation

### Test Server-Side Caching

1. Load a page with images
2. Check Network tab - should see database queries
3. Reload the page within revalidation time
4. Should see cached response (faster load)

### Test Client-Side Caching

1. Scroll to load more images
2. Navigate away and back
3. Scroll again - should see instant loading from cache
4. Wait for TTL to expire
5. Scroll again - should fetch fresh data

### Test Cache Invalidation

1. Create a new image
2. Check that it appears in collections immediately
3. Update an image
4. Check that changes are reflected
5. Delete an image
6. Verify it's removed from all collections

## Common Issues

### Issue: Stale Data After Mutations

**Solution:** Ensure cache invalidation is called:

```tsx
import { useCacheInvalidation } from '@/components/shared/CacheInvalidator';

const { invalidateUserImages, invalidateAllImages } = useCacheInvalidation();

// After any mutation
invalidateUserImages(userId);
invalidateAllImages();
```

### Issue: Cache Growing Too Large

**Solution:** Reduce TTL or implement periodic cleanup:

```tsx
import { clientCache } from '@/lib/cache/client-cache';

// Clear old entries
useEffect(() => {
  const interval = setInterval(() => {
    const stats = clientCache.getStats();
    if (stats.expiredEntries > 10) {
      clientCache.clearAll();
    }
  }, 60000); // Check every minute
  
  return () => clearInterval(interval);
}, []);
```

### Issue: Images Not Loading from Cache

**Solution:** Check cache keys match:

```tsx
// Make sure searchQuery is consistent
const { allImages } = useImageCollection({
  type,
  userId,
  searchQuery: searchQuery || '', // Not undefined
  initialImages,
  limit: 6,
});
```

## Rollback Plan

If you need to temporarily disable caching:

### Disable Server Caching

Comment out `unstable_cache` wrapper in actions:

```typescript
// Before
const getCachedImages = unstable_cache(
  async () => { /* ... */ },
  [tags],
  { revalidate: 60 }
);

// Disable by directly calling the function
// const result = await getCachedImages();
const result = await (async () => { /* ... */ })();
```

### Disable Client Caching

In the hook, skip cache reads:

```typescript
// In use-image-collection.tsx
const cachedData = null; // clientCache.get<any[]>(key);
```

## Performance Monitoring

Add logging to track cache effectiveness:

```typescript
// In your component
useEffect(() => {
  const stats = clientCache.getStats();
  console.log('Cache Stats:', {
    hitRate: ((stats.validEntries / stats.totalEntries) * 100).toFixed(1) + '%',
    ...stats
  });
}, []);
```

## Next Steps

1. Monitor cache hit rates in production
2. Adjust TTL values based on real usage patterns
3. Consider implementing Redis for distributed caching
4. Add cache warming for popular queries
5. Implement analytics to track cache performance

## Support

For issues or questions:
1. Check the [README.md](./README.md) for detailed documentation
2. Review [USAGE_EXAMPLES.md](./USAGE_EXAMPLES.md) for code samples
3. Inspect cache state in browser DevTools > Application > Local Storage
4. Check server logs for cache-related errors
