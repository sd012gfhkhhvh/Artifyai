/**
 * Cache Usage Examples
 * Demonstrates how to use the caching system in various scenarios
 */

// ============================================================================
// Example 1: Using the Collection Component with Caching
// ============================================================================

import { AllImagesCollection } from '@/components/shared/all-images-collection';
import { UserImagesCollection } from '@/components/shared/user-images-collection';

// In your page component (Server Component)
export default async function HomePage({ searchParams }: { searchParams: { query?: string } }) {
  const searchQuery = searchParams.query || '';
  
  return (
    <div>
      <h1>All Images</h1>
      {/* Server-side cache is automatically applied via getAllImages() */}
      <AllImagesCollection searchQuery={searchQuery} />
    </div>
  );
}

// User profile page
export default async function ProfilePage({ params }: { params: { userId: string } }) {
  return (
    <div>
      <h1>My Images</h1>
      {/* Server-side cache is automatically applied via getUserImages() */}
      <UserImagesCollection userId={params.userId} page={1} />
    </div>
  );
}

// ============================================================================
// Example 2: Manual Cache Invalidation in Client Components
// ============================================================================

'use client';

import { useCacheInvalidation } from '@/components/shared/CacheInvalidator';
import { deleteImage } from '@/lib/actions/image.action';

export function DeleteImageButton({ imageId, userId }: { imageId: string; userId: string }) {
  const { invalidateAllImages, invalidateUserImages, clearAllCaches } = useCacheInvalidation();
  
  const handleDelete = async () => {
    try {
      // Delete the image (server cache is auto-invalidated in the action)
      await deleteImage(imageId);
      
      // Invalidate client-side caches
      invalidateUserImages(userId);
      invalidateAllImages();
      
      // Optional: Clear all caches for complete refresh
      // clearAllCaches();
      
      alert('Image deleted successfully!');
    } catch (error) {
      console.error('Error deleting image:', error);
    }
  };
  
  return (
    <button onClick={handleDelete}>
      Delete Image
    </button>
  );
}

// ============================================================================
// Example 3: Cache Stats Dashboard
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { useCacheInvalidation } from '@/components/shared/CacheInvalidator';

export function CacheStatsPanel() {
  const { getCacheStats, clearAllCaches } = useCacheInvalidation();
  const [stats, setStats] = useState({ totalEntries: 0, validEntries: 0, expiredEntries: 0 });
  
  useEffect(() => {
    const updateStats = () => {
      setStats(getCacheStats());
    };
    
    updateStats();
    const interval = setInterval(updateStats, 5000); // Update every 5 seconds
    
    return () => clearInterval(interval);
  }, [getCacheStats]);
  
  const hitRate = stats.totalEntries > 0 
    ? ((stats.validEntries / stats.totalEntries) * 100).toFixed(1)
    : '0';
  
  return (
    <div className="p-4 border rounded-lg">
      <h3 className="text-lg font-bold mb-2">Cache Statistics</h3>
      <div className="space-y-2">
        <p>Total Entries: {stats.totalEntries}</p>
        <p>Valid Entries: {stats.validEntries}</p>
        <p>Expired Entries: {stats.expiredEntries}</p>
        <p>Hit Rate: {hitRate}%</p>
        
        <button 
          onClick={clearAllCaches}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Clear All Caches
        </button>
      </div>
    </div>
  );
}

// ============================================================================
// Example 4: Custom Image Fetching with Cache Control
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { clientCache } from '@/lib/cache/client-cache';
import { CACHE_CONFIG, getStorageKey } from '@/lib/cache/cache-config';
import { getImageById } from '@/lib/actions/image.action';

export function ImageDetailWithCache({ imageId }: { imageId: string }) {
  const [image, setImage] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const loadImage = async () => {
      const cacheKey = getStorageKey.imageById(imageId);
      
      // Try cache first
      const cached = clientCache.get(cacheKey);
      if (cached) {
        console.log('Loading from cache');
        setImage(cached);
        setLoading(false);
        return;
      }
      
      // Fetch from server (which has its own cache)
      setLoading(true);
      try {
        const data = await getImageById(imageId);
        
        // Cache the result
        clientCache.set(cacheKey, data, CACHE_CONFIG.CLIENT_TTL.IMAGE_BY_ID);
        setImage(data);
      } catch (error) {
        console.error('Error loading image:', error);
      } finally {
        setLoading(false);
      }
    };
    
    loadImage();
  }, [imageId]);
  
  if (loading) return <div>Loading...</div>;
  if (!image) return <div>Image not found</div>;
  
  return <div>{/* Render image */}</div>;
}

// ============================================================================
// Example 5: Prefetch on Hover
// ============================================================================

'use client';

import { clientCache } from '@/lib/cache/client-cache';
import { CACHE_CONFIG, getStorageKey } from '@/lib/cache/cache-config';
import { getImageById } from '@/lib/actions/image.action';
import Link from 'next/link';

export function ImageCard({ imageId, imageUrl }: { imageId: string; imageUrl: string }) {
  const prefetchImage = async () => {
    const cacheKey = getStorageKey.imageById(imageId);
    
    // Only prefetch if not already cached
    if (!clientCache.has(cacheKey)) {
      try {
        await clientCache.preload(
          cacheKey,
          () => getImageById(imageId),
          CACHE_CONFIG.CLIENT_TTL.IMAGE_BY_ID
        );
        console.log('Prefetched image:', imageId);
      } catch (error) {
        console.error('Prefetch error:', error);
      }
    }
  };
  
  return (
    <Link 
      href={`/transformations/${imageId}`}
      onMouseEnter={prefetchImage}
      onTouchStart={prefetchImage}
    >
      <img src={imageUrl} alt="Image" />
    </Link>
  );
}

// ============================================================================
// Example 6: Server Action with Custom Cache Control
// ============================================================================

'use server';

import { unstable_cache } from 'next/cache';
import prisma from '@/lib/database/prisma';
import { CACHE_CONFIG } from '@/lib/cache/cache-config';

export async function getPopularImages(limit: number = 10) {
  // Custom cached function with specific revalidation
  const getCachedPopularImages = unstable_cache(
    async () => {
      const images = await prisma.image.findMany({
        take: limit,
        orderBy: {
          // Assuming you have a views or likes count
          updatedAt: 'desc',
        },
      });
      
      return images;
    },
    ['popular-images', `limit-${limit}`],
    {
      tags: ['popular-images', CACHE_CONFIG.TAGS.ALL_IMAGES],
      revalidate: 300, // 5 minutes - longer for popular content
    }
  );
  
  return await getCachedPopularImages();
}

// ============================================================================
// Example 7: Optimistic Updates with Cache
// ============================================================================

'use client';

import { useState } from 'react';
import { useCacheInvalidation } from '@/components/shared/CacheInvalidator';
import { updateImage } from '@/lib/actions/image.action';

export function EditImageForm({ imageId, userId, initialData }: any) {
  const [image, setImage] = useState(initialData);
  const { invalidateImageById, invalidateUserImages } = useCacheInvalidation();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Optimistic update
    const previousImage = { ...image };
    setImage({ ...image, title: 'Updating...' });
    
    try {
      const updated = await updateImage({
        image: { id: imageId, ...image },
        userId,
        path: `/transformations/${imageId}`,
      });
      
      // Update succeeded
      setImage(updated);
      
      // Invalidate caches
      invalidateImageById(imageId);
      invalidateUserImages(userId);
      
    } catch (error) {
      // Revert optimistic update on error
      setImage(previousImage);
      console.error('Update failed:', error);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  );
}

// ============================================================================
// Example 8: Background Cache Refresh
// ============================================================================

'use client';

import { useEffect } from 'react';
import { clientCache } from '@/lib/cache/client-cache';
import { getAllImages } from '@/lib/actions/image.action';
import { CACHE_CONFIG, getStorageKey } from '@/lib/cache/cache-config';

export function CacheRefresher() {
  useEffect(() => {
    // Refresh popular queries in the background
    const refreshCache = async () => {
      const popularQueries = ['', 'nature', 'portrait', 'landscape'];
      
      for (const query of popularQueries) {
        const cacheKey = getStorageKey.allImages(query, 0);
        
        try {
          const data = await getAllImages({
            offset: 0,
            limit: 6,
            searchQuery: query,
          });
          
          if (data) {
            clientCache.set(cacheKey, data, CACHE_CONFIG.CLIENT_TTL.ALL_IMAGES);
          }
        } catch (error) {
          console.error('Cache refresh error:', error);
        }
      }
    };
    
    // Refresh every 2 minutes
    const interval = setInterval(refreshCache, 2 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return null;
}

// ============================================================================
// Example 9: Conditional Caching Based on User Preferences
// ============================================================================

'use client';

import { useState, useEffect } from 'react';
import { clientCache } from '@/lib/cache/client-cache';

export function CacheSettings() {
  const [cacheEnabled, setCacheEnabled] = useState(true);
  
  useEffect(() => {
    // Load preference from localStorage
    const enabled = localStorage.getItem('cache-enabled') !== 'false';
    setCacheEnabled(enabled);
  }, []);
  
  const toggleCache = () => {
    const newValue = !cacheEnabled;
    setCacheEnabled(newValue);
    localStorage.setItem('cache-enabled', String(newValue));
    
    if (!newValue) {
      // Clear all caches when disabling
      clientCache.clearAll();
    }
  };
  
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={cacheEnabled}
          onChange={toggleCache}
        />
        Enable Client-Side Caching
      </label>
      <p className="text-sm text-gray-500">
        {cacheEnabled 
          ? 'Caching enabled for faster loading' 
          : 'Caching disabled - always fetch fresh data'}
      </p>
    </div>
  );
}
