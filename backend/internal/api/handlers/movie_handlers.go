package handlers

import (
	"fmt"
	"net/http"

	//"net/http"
	"github.com/go-chi/chi/v5"
	chimiddle "github.com/go-chi/chi/v5/middleware"
)

// MovieHandler Handles getting the information for each route. So getting trending movies & movie information
func MovieHandler(router *chi.Mux) {

	//Following allows trailing slashes to be accepted for routes and not throw a 404
	router.Use(chimiddle.StripSlashes)

	/**
	API Endpoints:
	• Fetch popular or trending movies: '/trending/movie/{day or week}'.
	• Fetch movie details: '/movie/{movie_id}'
	• Refer to poster path guide for images, "poster_path" in the TMDB API response for
	each movie to prepend the base URL.
	*/

	router.Get("/", func(w http.ResponseWriter, r *http.Request) {
		_, err := fmt.Fprintf(w, "Movie API Base Route")
		if err != nil {
			return
		}
	})

	router.Get("/movie/{id}", func(w http.ResponseWriter, r *http.Request) {
		_, err := fmt.Fprintf(w, "Movie API Response for id: "+chi.URLParam(r, "id"))
		if err != nil {
			return
		}
	})

	router.Get("/trending/movie/{day_or_week}", func(w http.ResponseWriter, r *http.Request) {
		_, err := fmt.Fprintf(w, "Trending Movie API Response for day-or-week: "+chi.URLParam(r, "day_or_week"))
		if err != nil {
			return
		}
	})

}
