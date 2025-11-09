package cache

import (
	"sync"
	"testing"
	"time"
)

func TestCacheExpiration(t *testing.T) {
	cache := NewCache[string, int]()
	cache.Set("key1", 42, 1*time.Millisecond)
	value, ok := cache.Get("key1")
	if !ok || value != 42 {
		t.Errorf("Expected to get value 42 for key1, got %v", value)
	}

	time.Sleep(2 * time.Millisecond)
	_, ok = cache.Get("key1")
	if ok {
		t.Errorf("Expected key1 to be expired")
	}

}

func TestCacheGetAndSet(t *testing.T) {
	cache := NewCache[string, int]()
	cache.Set("key1", 42, 5*time.Second)
	value, ok := cache.Get("key1")
	if !ok || value != 42 {
		t.Errorf("Expected to get value 42 for key1, got %v", value)
	}
}

func TestCacheDelete(t *testing.T) {
	cache := NewCache[string, int]()
	cache.Set("key1", 42, 5*time.Second)
	cache.Delete("key1")
	_, ok := cache.Get("key1")
	if ok {
		t.Errorf("Expected key1 to be expired")
	}
}

func TestCacheClear(t *testing.T) {
	cache := NewCache[string, int]()
	cache.Set("key1", 42, 5*time.Second)
	cache.Set("key2", 5, 5*time.Second)
	cache.Set("key3", 1, 2*time.Second)

	//Check before clearing the cache that everything exists
	if value, ok := cache.Get("key1"); !ok || value != 42 {
		t.Errorf("Expected to get value 4 for key1, got %v", value)
	}
	if value, ok := cache.Get("key2"); !ok || value != 5 {
		t.Errorf("Expected to get value 5 for key2, got %v", value)
	}
	if value, ok := cache.Get("key3"); !ok || value != 1 {
		t.Errorf("Expected to get value 1 for key3, got %v", value)
	}

	//Clear the cache
	cache.Clear()

	//Now check if any of the 3 keys exist
	if _, ok := cache.Get("key1"); ok {
		t.Errorf("Expected key1 to be expired")
	}
	if _, ok := cache.Get("key2"); ok {
		t.Errorf("Expected key2 to be expired")
	}
	if _, ok := cache.Get("key3"); ok {
		t.Errorf("Expected key3 to be expired")
	}

}

// Test reading/writing concurrently
func TestConcurrentReadAndWrite(t *testing.T) {
	cache := NewCache[int, string]()

	var wg sync.WaitGroup
	numItems := 100

	//Launch a goroutine to write values
	wg.Add(1)
	go func() {
		defer wg.Done()
		for i := 0; i < numItems; i++ {
			cache.Set(i, "test", time.Minute)
		}
	}()

	//Launch a goroutine to read values
	wg.Add(1)
	go func() {
		defer wg.Done()
		for i := 0; i < numItems; i++ {
			_, _ = cache.Get(i)
		}
	}()

	wg.Wait()

	for i := 0; i < numItems; i++ {
		val, ok := cache.Get(i)
		if !ok || val != "test" {
			t.Errorf("Expected key %d to exist", i)
		}
	}

}
