//Cache implementation using LocalStorage with expiration

/**
 * Sets an item in the cache with a specified TTL (time to live)
 * @param key Key of the item to be cached
 * @param data The actual data, ex: Movie details
 * @param ttl The time to live
 */
export function setCache(key: string, data: any, ttl: number) {
    const now = new Date();
    const item = {
        value: data,
        expiry: now.getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
}

/**
 * Retrieves an item from the cache
 * @param key Key of the cached item
 * @return The cached data or null if not found/expired
 */
export function getCache(key: string) {
    const itemStr = localStorage.getItem(key);
    if (!itemStr) {
        return null;
    }
    const item = JSON.parse(itemStr);
    const now = new Date();
    if (now.getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    return item.value;
}