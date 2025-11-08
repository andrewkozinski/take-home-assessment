package main

import (
	"backend/internal/api/handlers"
	"backend/internal/api/tmdb"
	"log"
	"net/http"
	"os"

	"github.com/go-chi/chi/v5"
	"github.com/joho/godotenv"
)

func main() {

	//Load TMDB key from the environment file
	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Println("Error loading .env file")
	}
	apiKey := os.Getenv("TMDB_KEY")

	router := chi.NewRouter()

	//router.Get("/", func(w http.ResponseWriter, r *http.Request) {
	//	fmt.Fprintf(w, "Movie API Response")
	//})

	client := tmdb.NewTMDBClient(apiKey)

	handlers.MovieHandler(router, client)

	err := http.ListenAndServe(":8080", router)
	if err != nil {
		log.Fatal(err)
	}

}
