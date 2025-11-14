/**
 * Client-side Cache Manager
 * Handles localStorage caching with TTL and invalidation
 */

interface CacheEntry<T> {
  data: T;
  timestamp: number;
  ttl: number;
}

class ClientCacheManager {
  private isClient = typeof window !== 'undefined';

  /**
   * Set data in cache with TTL
   */
  set<T>(key: string, data: T, ttl: number): void {
    if (!this.isClient) return;

    try {
      const entry: CacheEntry<T> = {
        data,
        timestamp: Date.now(),
        ttl,
      };
      localStorage.setItem(key, JSON.stringify(entry));
    } catch (error) {
      console.error('Error setting cache:', error);
      // Handle quota exceeded error
      if (error instanceof DOMException && error.name === 'QuotaExceededError') {
        this.clearOldEntries();
        // Retry once after clearing
        try {
          const entry: CacheEntry<T> = {
            data,
            timestamp: Date.now(),
            ttl,
          };
          localStorage.setItem(key, JSON.stringify(entry));
        } catch (retryError) {
          console.error('Error setting cache after cleanup:', retryError);
        }
      }
    }
  }

  /**
   * Get data from cache if not expired
   */
  get<T>(key: string): T | null {
    if (!this.isClient) return null;

    try {
      const item = localStorage.getItem(key);
      if (!item) return null;

      const entry: CacheEntry<T> = JSON.parse(item);
      const now = Date.now();

      // Check if expired
      if (now - entry.timestamp > entry.ttl) {
        localStorage.removeItem(key);
        return null;
      }

      return entry.data;
    } catch (error) {
      console.error('Error getting cache:', error);
      localStorage.removeItem(key);
      return null;
    }
  }

  /**
   * Check if cache entry exists and is valid
   */
  has(key: string): boolean {
    return this.get(key) !== null;
  }

  /**
   * Invalidate specific cache entry
   */
  invalidate(key: string): void {
    if (!this.isClient) return;
    localStorage.removeItem(key);
  }

  /**
   * Invalidate all cache entries matching a pattern
   */
  invalidatePattern(pattern: string): void {
    if (!this.isClient) return;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.includes(pattern)) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error invalidating pattern:', error);
    }
  }

  /**
   * Clear all cache entries (artify-* keys only)
   */
  clearAll(): void {
    if (!this.isClient) return;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith('artify-')) {
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing cache:', error);
    }
  }

  /**
   * Clear old/expired entries to free up space
   */
  private clearOldEntries(): void {
    if (!this.isClient) return;

    try {
      const keys = Object.keys(localStorage);
      const now = Date.now();

      keys.forEach(key => {
        if (!key.startsWith('artify-')) return;

        try {
          const item = localStorage.getItem(key);
          if (!item) return;

          const entry: CacheEntry<any> = JSON.parse(item);
          if (now - entry.timestamp > entry.ttl) {
            localStorage.removeItem(key);
          }
        } catch {
          // Remove corrupted entries
          localStorage.removeItem(key);
        }
      });
    } catch (error) {
      console.error('Error clearing old entries:', error);
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): {
    totalEntries: number;
    validEntries: number;
    expiredEntries: number;
  } {
    if (!this.isClient) {
      return { totalEntries: 0, validEntries: 0, expiredEntries: 0 };
    }

    const keys = Object.keys(localStorage).filter(k => k.startsWith('artify-'));
    const now = Date.now();
    let validCount = 0;
    let expiredCount = 0;

    keys.forEach(key => {
      try {
        const item = localStorage.getItem(key);
        if (!item) return;

        const entry: CacheEntry<any> = JSON.parse(item);
        if (now - entry.timestamp > entry.ttl) {
          expiredCount++;
        } else {
          validCount++;
        }
      } catch {
        expiredCount++;
      }
    });

    return {
      totalEntries: keys.length,
      validEntries: validCount,
      expiredEntries: expiredCount,
    };
  }

  /**
   * Update cache entry TTL without changing data
   */
  refreshTTL(key: string, newTtl?: number): boolean {
    if (!this.isClient) return false;

    try {
      const item = localStorage.getItem(key);
      if (!item) return false;

      const entry: CacheEntry<any> = JSON.parse(item);
      entry.timestamp = Date.now();
      if (newTtl) entry.ttl = newTtl;

      localStorage.setItem(key, JSON.stringify(entry));
      return true;
    } catch (error) {
      console.error('Error refreshing TTL:', error);
      return false;
    }
  }

  /**
   * Preload data into cache (for cache warming)
   */
  async preload<T>(
    key: string,
    fetcher: () => Promise<T>,
    ttl: number
  ): Promise<T> {
    // Check if valid cache exists
    const cached = this.get<T>(key);
    if (cached !== null) {
      return cached;
    }

    // Fetch and cache
    const data = await fetcher();
    this.set(key, data, ttl);
    return data;
  }
}

// Export singleton instance
export const clientCache = new ClientCacheManager();

// Export hook for React components
export const useClientCache = () => clientCache;
