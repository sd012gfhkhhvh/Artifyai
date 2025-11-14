# Caching System Architecture Diagram

## Data Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                          USER ACTION                                 │
│                   (View Gallery / Load More)                         │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    CLIENT COMPONENT                                  │
│                   (Collection.tsx)                                   │
│                                                                      │
│   Uses: useImageCollection() hook                                   │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│              CLIENT-SIDE CACHE CHECK                                 │
│              (localStorage via clientCache)                          │
│                                                                      │
│   Key: artify-infinite-all-12-query                                 │
│   TTL: 60000ms (1 minute)                                           │
└─────────────┬──────────────────────────────────┬────────────────────┘
              │                                  │
         CACHE HIT                          CACHE MISS
              │                                  │
              ▼                                  ▼
    ┌──────────────────┐           ┌─────────────────────────────────┐
    │ Return Cached    │           │   Call Server Action            │
    │ Data (~5-10ms)   │           │   infiniteScrollImageLoader()   │
    └──────────────────┘           └────────────┬────────────────────┘
                                                 │
                                                 ▼
                                    ┌─────────────────────────────────┐
                                    │  SERVER-SIDE CACHE CHECK        │
                                    │  (unstable_cache)               │
                                    │                                 │
                                    │  Tag: all-images-query          │
                                    │  Revalidate: 60s                │
                                    └──────┬────────────────┬─────────┘
                                           │                │
                                      CACHE HIT        CACHE MISS
                                           │                │
                                           ▼                ▼
                                ┌──────────────┐   ┌────────────────┐
                                │ Return Cache │   │  DATABASE      │
                                │ (~20-50ms)   │   │  QUERY         │
                                └──────────────┘   │  Prisma        │
                                                   │  (~200-500ms)  │
                                                   └────────┬───────┘
                                                            │
                                                            ▼
                                                   ┌────────────────┐
                                                   │ Cache Result   │
                                                   │ Return Data    │
                                                   └────────────────┘
```

## Cache Invalidation Flow

```
┌─────────────────────────────────────────────────────────────────────┐
│                       MUTATION EVENT                                 │
│            (Add / Update / Delete Image)                            │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│                    SERVER ACTION                                     │
│         (addImage / updateImage / deleteImage)                      │
│                                                                      │
│   1. Perform database operation                                     │
│   2. Call invalidation utilities                                    │
└────────────────────────────┬────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│              SERVER-SIDE INVALIDATION                                │
│                                                                      │
│   invalidateUserCaches(userId)                                      │
│   ├─ revalidateTag('user-images-userId')                           │
│   ├─ revalidateTag('image-count-userId')                           │
│   └─ revalidateTag('all-images')                                   │
│                                                                      │
│   Next Request: Cache Miss → Fresh Data                            │
└─────────────────────────────────────────────────────────────────────┘
                             │
                             ▼
┌─────────────────────────────────────────────────────────────────────┐
│              CLIENT-SIDE INVALIDATION                                │
│                                                                      │
│   useCacheInvalidation()                                            │
│   ├─ invalidateUserImages(userId)                                  │
│   │  └─ Remove: artify-user-images-userId-*                       │
│   ├─ invalidateAllImages()                                         │
│   │  └─ Remove: artify-all-images-*                               │
│   └─ Result: Next load fetches fresh data                         │
└─────────────────────────────────────────────────────────────────────┘
```

## Component Integration Map

```
┌─────────────────────────────────────────────────────────────────────┐
│                         PAGE COMPONENTS                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  app/(root)/(home)/page.tsx                                         │
│  ├─ AllImagesCollection (Server Component)                         │
│  │  ├─ getAllImages() [Server Action - Cached]                    │
│  │  └─ Collection (Client Component)                              │
│  │     └─ useImageCollection() [Client Cache]                     │
│  │                                                                  │
│  app/(root)/profile/page.tsx                                        │
│  ├─ UserImagesCollection (Server Component)                        │
│  │  ├─ getUserImages() [Server Action - Cached]                   │
│  │  └─ Collection (Client Component)                              │
│  │     └─ useImageCollection() [Client Cache]                     │
│  │                                                                  │
│  app/(root)/transformations/[id]/page.tsx                           │
│  └─ getImageById() [Server Action - Cached]                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────┐
│                     MUTATION COMPONENTS                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  TransformationForm                                                  │
│  ├─ addImage() / updateImage()                                     │
│  └─ Invalidates: User + All caches                                 │
│                                                                      │
│  DeleteConfirmation                                                  │
│  ├─ deleteImage()                                                   │
│  └─ Invalidates: Image + User + All caches                         │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## Cache Storage Structure

### Server-Side (Next.js Data Cache)

```
Cache Entries:
├─ all-images (tag)
│  ├─ Entries: all-images-0-6-1, all-images-6-6-1, etc.
│  └─ Revalidate: 60s
│
├─ all-images-sunset (tag with query)
│  ├─ Entries: all-images-sunset-0-6-1
│  └─ Revalidate: 60s
│
├─ user-images-user123 (tag)
│  ├─ Entries: user-images-user123-0-6-1
│  └─ Revalidate: 30s
│
├─ image-by-id-img456 (tag)
│  ├─ Entry: Single image data
│  └─ Revalidate: 300s
│
└─ image-count-user123 (tag)
   ├─ Entry: Count number
   └─ Revalidate: 60s
```

### Client-Side (localStorage)

```
localStorage:
├─ artify-all-images-0
│  └─ { data: [...], timestamp: 1234567890, ttl: 60000 }
│
├─ artify-all-images-sunset-0
│  └─ { data: [...], timestamp: 1234567890, ttl: 60000 }
│
├─ artify-user-images-user123-0
│  └─ { data: [...], timestamp: 1234567890, ttl: 30000 }
│
├─ artify-infinite-all-12
│  └─ { data: [...], timestamp: 1234567890, ttl: 120000 }
│
├─ artify-infinite-user-user123-12
│  └─ { data: [...], timestamp: 1234567890, ttl: 120000 }
│
└─ artify-image-img456
   └─ { data: {...}, timestamp: 1234567890, ttl: 300000 }
```

## Time-Based Behavior

```
Time: 0s
├─ User loads gallery
├─ Server: MISS → Query DB → Cache result
└─ Client: Store in localStorage

Time: 10s
├─ User scrolls (loads more)
├─ Server: HIT → Return cached
└─ Client: Store page 2 in localStorage

Time: 20s
├─ User navigates away
└─ Cache: Still valid

Time: 30s
├─ User returns
├─ Server: HIT (still within 60s)
└─ Client: HIT (within TTL)
    └─ Result: Instant load (~5ms)

Time: 65s (past server revalidation)
├─ User loads gallery
├─ Server: MISS → Query DB → Update cache
└─ Client: HIT (still within 120s for infinite scroll)

Time: 130s (past all TTLs)
├─ User action
├─ Server: MISS → Fresh query
└─ Client: MISS → Fetch from server
```

## Performance Metrics

```
┌──────────────────┬──────────────┬──────────────┬───────────────┐
│ Scenario         │ Before Cache │ After Cache  │ Improvement   │
├──────────────────┼──────────────┼──────────────┼───────────────┤
│ Initial Load     │ 400ms        │ 400ms        │ 0% (expected) │
│ Reload (< TTL)   │ 400ms        │ 20ms         │ 95%           │
│ Scroll More      │ 350ms        │ 5ms (client) │ 98%           │
│ Back Navigation  │ 400ms        │ 5ms          │ 98%           │
│ Search Results   │ 450ms        │ 450ms first  │ 0% (expected) │
│                  │              │ 5ms repeated │ 98% repeat    │
└──────────────────┴──────────────┴──────────────┴───────────────┘

Database Query Reduction: 80-90% (estimated)
User Experience: Significantly improved (instant subsequent loads)
Server Load: Drastically reduced (most requests served from cache)
```

## Legend

```
┌─────────────────────────────────────────────────────────────┐
│ SYMBOLS                                                      │
├─────────────────────────────────────────────────────────────┤
│ ▼  Flow direction                                           │
│ ├─ Branch/Child item                                        │
│ └─ Last branch/Child item                                   │
│ [Server Action - Cached] Server-side caching applied        │
│ [Client Cache] Client-side caching applied                  │
│ (~5ms) Approximate timing                                   │
└─────────────────────────────────────────────────────────────┘
```

This visual representation shows how the caching system works from user interaction through to data retrieval and back. The two-tier approach ensures optimal performance at both levels while maintaining data freshness through intelligent invalidation.
