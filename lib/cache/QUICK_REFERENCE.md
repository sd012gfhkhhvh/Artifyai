# Quick Reference - Caching System

## Import Paths

```typescript
// Configuration & Tags
import { CACHE_CONFIG, getCacheTag, getStorageKey } from '@/lib/cache/cache-config';

// Client Cache
import { clientCache } from '@/lib/cache/client-cache';

// Server Utils
import { 
  invalidateAllImages,
  invalidateUserImages,
  invalidateImageById,
  invalidateUserCaches
} from '@/lib/cache/server-cache-utils';

// Hooks
import { useImageCollection } from '@/hooks/use-image-collection';
import { useCacheInvalidation } from '@/components/shared/CacheInvalidator';
```

## Common Operations

### Server-Side (in Server Actions)

```typescript
// In image.action.ts
import { unstable_cache } from 'next/cache';
import { getCacheTag, CACHE_CONFIG } from '@/lib/cache/cache-config';

const getCachedData = unstable_cache(
  async () => {
    // Your query
    return data;
  },
  [getCacheTag.allImages()],
  {
    tags: [CACHE_CONFIG.TAGS.ALL_IMAGES],
    revalidate: CACHE_CONFIG.REVALIDATION.ALL_IMAGES,
  }
);
```

### Client-Side (in Components)

```typescript
// Using the hook
const { allImages, isLoading, loadMoreImages } = useImageCollection({
  type: infiniteScrollImageLoadertype.ALL,
  userId,
  searchQuery,
  initialImages,
  limit: 6,
});

// Manual cache control
const { invalidateAllImages, clearAllCaches } = useCacheInvalidation();
```

## Cache Invalidation

### When Creating Images
```typescript
invalidateUserCaches(userId);  // User images + count
invalidateAllImages();          // Public gallery
```

### When Updating Images
```typescript
invalidateImageById(imageId);   // Specific image
invalidateUserCaches(userId);   // User's collection
```

### When Deleting Images
```typescript
invalidateImageById(imageId);
invalidateUserCaches(userId);
invalidateAllImages();
```

### Manual Clear
```typescript
clearAllCaches();  // Nuclear option
```

## Cache Keys

### Server Tags
```typescript
getCacheTag.allImages()              → 'all-images'
getCacheTag.allImages('sunset')      → 'all-images-sunset'
getCacheTag.userImages('user123')    → 'user-images-user123'
getCacheTag.imageById('img456')      → 'image-by-id-img456'
```

### Client Keys
```typescript
getStorageKey.allImages('query', 0)          → 'artify-all-images-query-0'
getStorageKey.userImages('user123', 6)       → 'artify-user-images-user123-6'
getStorageKey.infiniteScrollAll(12, 'nature') → 'artify-infinite-all-12-nature'
```

## Configuration Values

### Server Revalidation (seconds)
- All Images: `60` (1 min)
- User Images: `30` (30 sec)
- Image By ID: `300` (5 min)
- Image Count: `60` (1 min)

### Client TTL (milliseconds)
- All Images: `60000` (1 min)
- User Images: `30000` (30 sec)
- Image By ID: `300000` (5 min)
- Infinite Scroll: `120000` (2 min)

## Debugging

### Check Cache Stats
```typescript
const stats = clientCache.getStats();
console.log(stats);
// { totalEntries: 10, validEntries: 8, expiredEntries: 2 }
```

### Manual Operations
```typescript
// Set
clientCache.set('key', data, 60000);

// Get
const data = clientCache.get('key');

// Check
const exists = clientCache.has('key');

// Invalidate
clientCache.invalidate('key');
clientCache.invalidatePattern('artify-all-images');

// Clear all
clientCache.clearAll();
```

## Component Patterns

### Server Component
```tsx
// Automatic caching via server action
export default async function Page() {
  return <AllImagesCollection searchQuery="" />;
}
```

### Client Component with Collection
```tsx
'use client';
export function MyGallery({ initialImages, userId }) {
  const { allImages, isLoading, loadMoreImages } = useImageCollection({
    type: infiniteScrollImageLoadertype.USER,
    userId,
    searchQuery: '',
    initialImages,
    limit: 6,
  });

  return <div>{/* Render allImages */}</div>;
}
```

### Client Component with Mutation
```tsx
'use client';
export function EditButton({ imageId, userId }) {
  const { invalidateImageById, invalidateUserImages } = useCacheInvalidation();
  
  const handleEdit = async () => {
    await updateImage({ ... });
    invalidateImageById(imageId);
    invalidateUserImages(userId);
  };

  return <button onClick={handleEdit}>Edit</button>;
}
```

## Performance Tips

1. **Adjust TTL** based on data volatility
2. **Use prefetching** for predictable navigation
3. **Monitor hit rate** with `getStats()`
4. **Clear expired entries** periodically
5. **Invalidate specifically** rather than clearing all

## Common Issues

| Issue | Solution |
|-------|----------|
| Stale data after mutation | Add cache invalidation calls |
| Cache growing too large | Reduce TTL or implement cleanup |
| TypeScript errors | Check imports and types |
| Cache not working | Verify localStorage is available |
| Slow initial load | Implement cache warming |

## File Locations

```
lib/cache/
├── cache-config.ts         # Configuration
├── client-cache.ts         # Client cache manager
├── server-cache-utils.ts   # Server invalidation
├── index.ts                # Exports
├── README.md               # Full docs
├── MIGRATION_GUIDE.md      # Migration help
├── USAGE_EXAMPLES.md       # Code examples
└── IMPLEMENTATION_SUMMARY.md

hooks/
└── use-image-collection.tsx # Collection hook

components/shared/
├── Collection.tsx          # Main collection (updated)
├── CacheInvalidator.tsx    # Invalidation helpers
├── all-images-collection.tsx
└── user-images-collection.tsx

lib/actions/
└── image.action.ts         # Server actions (updated)
```

## Quick Test

```bash
# 1. Start dev server
npm run dev

# 2. Open browser DevTools
# - Network tab: Watch API calls
# - Application > Local Storage: See cache entries
# - Console: Cache logs

# 3. Test flow
# - Load gallery (should cache)
# - Scroll down (should load more)
# - Navigate away and back (should use cache)
# - Wait for TTL expiry (should refetch)
# - Create/edit/delete image (should invalidate)
```

## Support

- 📖 **Full Docs**: `lib/cache/README.md`
- 🚀 **Migration**: `lib/cache/MIGRATION_GUIDE.md`
- 💡 **Examples**: `lib/cache/USAGE_EXAMPLES.md`
- 📋 **Summary**: `lib/cache/IMPLEMENTATION_SUMMARY.md`
- ⚡ **This**: Quick reference for daily use

---

**Remember**: Cache early, invalidate wisely! 🚀
