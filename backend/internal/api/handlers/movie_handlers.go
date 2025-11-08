package handlers

import (
	"backend/internal/api/model"
	"backend/internal/api/tmdb"
	"backend/internal/cache"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/go-chi/chi/v5"
	chimiddle "github.com/go-chi/chi/v5/middleware"
)

// MovieHandler Handles getting the information for each route. So getting trending movies & movie information
func MovieHandler(router *chi.Mux, client *tmdb.TMDBClient) {

	//Following allows trailing slashes to be accepted for routes and not throw a 404
	router.Use(chimiddle.StripSlashes)

	//Caches for movies and trending movies can be added here in the future
	movieCache := cache.NewCache[string, model.Movie]()
	trendingCache := cache.NewCache[string, []model.Movie]()

	/**
	API Endpoints:
	• Fetch popular or trending movies: '/trending/movie/{day or week}'.
	• Fetch movie details: '/movie/{movie_id}'
	• Refer to poster path guide for images, "poster_path" in the TMDB API response for
	each movie to prepend the base URL.
	*/

	//Base route to check if API is working
	router.Get("/", func(w http.ResponseWriter, r *http.Request) {
		_, err := fmt.Fprintf(w, "Movie API Base Route")
		if err != nil {
			return
		}
	})

	//Route to get movie details by ID
	router.Route("/movie", func(r chi.Router) {
		r.Get("/{id}", func(w http.ResponseWriter, r *http.Request) {

			id := chi.URLParam(r, "id") //get the movie id

			//First check the cache
			if cached, ok := movieCache.Get(id); ok {
				fmt.Println("Serving from cache for movie ID:", id)
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusOK)
				_ = json.NewEncoder(w).Encode(cached)
				return
			}

			movie, movieErr := client.GetMovieDetails(id) //fetch movie details from TMDB
			if movieErr != nil {
				http.Error(w, "Failed to fetch movie details", http.StatusInternalServerError)
				return
			}

			//Once done with the response body, close it
			defer movie.Body.Close()

			var movieData model.Movie //Movie struct to hold the decoded data
			//Actually decode the data into the struct
			jsonErr := json.NewDecoder(movie.Body).Decode(&movieData)

			if jsonErr != nil {
				http.Error(w, "Failed to decode movie details", http.StatusInternalServerError)
				return
			}

			//Before sending the response, properly format the PosterPath (docs for reference: https://developer.themoviedb.org/docs/image-basics)
			movieData.PosterPath = "https://image.tmdb.org/t/p/w500" + movieData.PosterPath

			//Cache the movie data, set to expire after 10 minutes
			movieCache.Set(id, movieData, 10*time.Minute)

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(movie.StatusCode)
			_ = json.NewEncoder(w).Encode(movieData)
		})
	})

	//Route to get trending movies
	router.Route("/trending/movie", func(r chi.Router) {
		r.Get("/{day_or_week}", func(w http.ResponseWriter, r *http.Request) {

			timeFrame := chi.URLParam(r, "day_or_week") //get the day or week param

			//First check the cache
			if cached, ok := trendingCache.Get(timeFrame); ok {
				fmt.Println("Serving from cache for trending movies:", timeFrame)
				w.Header().Set("Content-Type", "application/json")
				w.WriteHeader(http.StatusOK)
				_ = json.NewEncoder(w).Encode(cached)
				return
			}

			resp, respErr := client.GetTrendingMovies(timeFrame) //fetch trending movies from TMDB
			if respErr != nil {
				http.Error(w, "Failed to fetch trending movies", http.StatusInternalServerError)
				return
			}

			//Once done with the response body, close it
			defer resp.Body.Close()

			//Map results array in the response to a Slice of Movie structs
			var result struct {
				Results []model.Movie `json:"results"`
			}

			jsonErr := json.NewDecoder(resp.Body).Decode(&result)
			if jsonErr != nil {
				http.Error(w, "Failed to decode trending movies", http.StatusInternalServerError)
				return
			}

			//Before sending the response, properly format the PosterPath for each movie
			for i := range result.Results {
				result.Results[i].PosterPath = "https://image.tmdb.org/t/p/w500" + result.Results[i].PosterPath
			}

			//Cache the trending movies data, set to expire after 5 minutes
			trendingCache.Set(timeFrame, result.Results, 5*time.Minute)

			w.Header().Set("Content-Type", "application/json")
			w.WriteHeader(resp.StatusCode)
			_ = json.NewEncoder(w).Encode(result.Results)

		})
	})

}
