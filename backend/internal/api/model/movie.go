package model

// Movie represents a response from TMDB API for a movie
type Movie struct {
	ID          int    `json:"id"`
	Title       string `json:"title"`
	Overview    string `json:"overview"`
	PosterPath  string `json:"poster_path"`
	ReleaseDate string `json:"release_date"`
	Genres      []struct {
		Name string `json:"name"`
	} `json:"genres"`
}
