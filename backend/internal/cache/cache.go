package cache

import (
	"sync"
	"time"
)

// Item is the type that will be cached in the Cache map, uses generics to allow more than just one type to be cached
type Item[T any] struct {
	value      T
	expiration time.Time //Time
}

// Cache is a map that handles the in memory caching. Keys must be Comparable and Values are of type CacheItem
type Cache[K comparable, T any] struct {
	data map[K]Item[T] //Keys are Comparable, CacheItem can be any type
	mu   sync.RWMutex  //mutex for r/w protection
}

// NewCache initializes a new Cache instance
func NewCache[K comparable, T any]() *Cache[K, T] {
	return &Cache[K, T]{
		data: make(map[K]Item[T]),
	}
}

// Set adds a new key/value pair with a specified expiration time
func (c *Cache[K, T]) Set(key K, value T, ttl time.Duration) {
	c.mu.Lock()         //Lock the mutex first
	defer c.mu.Unlock() //Unlock last

	c.data[key] = Item[T]{ //set the key/value pair
		value:      value,
		expiration: time.Now().Add(ttl),
	}
}

// zeroVal returns the default value given a type
// example: int -> 0, boolean->false, etc.
func zeroVal[T any]() T {
	var zero T
	return zero
}

// Get retrieves items from the Cache. If item is found, expiration time is checked.
func (c *Cache[K, T]) Get(key K) (T, bool) {
	c.mu.Lock()         //lock mutex first
	defer c.mu.Unlock() //unlock mutex as last step before returning
	item, ok := c.data[key]
	if !ok {
		return zeroVal[T](), false
	}
	// item found - check the expiration time
	if item.expiration.Before(time.Now()) {
		// remove the item from cache if time is beyond the expiration
		delete(c.data, key)
		return zeroVal[T](), false
	}
	return item.value, true
}

// Delete removes a key/value pair from the cache.
func (c *Cache[K, T]) Delete(key K) {
	c.mu.Lock()
	defer c.mu.Unlock()
	delete(c.data, key)
}

// Clear removes all items from the cache
func (c *Cache[K, T]) Clear() {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.data = make(map[K]Item[T])
}
