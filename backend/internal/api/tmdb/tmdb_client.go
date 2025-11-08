package tmdb

import (
	"fmt"
	"net/http"
)

/**
API Endpoints:
• Fetch popular or trending movies: '/trending/movie/{day or week}'.
• Fetch movie details: '/movie/{movie_id}'
• Refer to poster path guide for images, "poster_path" in the TMDB API response for
each movie to prepend the base URL.
*/

const baseURL = "https://api.themoviedb.org/3"

// TMDBClient struct to hold API key and HTTP client
type TMDBClient struct {
	APIKey     string
	HTTPClient *http.Client
}

// NewTMDBClient creates a new TMDBClient instance
func NewTMDBClient(apiKey string) *TMDBClient {
	return &TMDBClient{
		APIKey:     apiKey,
		HTTPClient: &http.Client{},
	}
}

// GetTrendingMovies fetches trending movies for a given time window (day or week) (docs: https://developer.themoviedb.org/reference/trending-movies)
func (client *TMDBClient) GetTrendingMovies(time string) (*http.Response, error) {
	url := fmt.Sprintf("%s/trending/movie/%s?api_key=%s", baseURL, time, client.APIKey)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	return client.HTTPClient.Do(req)
}

// GetMovieDetails fetches details for a specific movie by its ID
func (client *TMDBClient) GetMovieDetails(movieID string) (*http.Response, error) {
	url := fmt.Sprintf("%s/movie/%s?api_key=%s", baseURL, movieID, client.APIKey)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	return client.HTTPClient.Do(req)
}
