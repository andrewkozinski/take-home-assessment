package main

import (
	"backend/internal/api/handlers"
	"backend/internal/api/tmdb"
	"log"
	"net/http"
	"os"

	_ "backend/docs" // swag generated docs

	"github.com/go-chi/chi/v5"
	chimiddle "github.com/go-chi/chi/v5/middleware"
	"github.com/joho/godotenv"
	httpSwagger "github.com/swaggo/http-swagger"
)

func main() {

	//Load TMDB key from the environment file
	loadErr := godotenv.Load()
	if loadErr != nil {
		log.Println("Error loading .env file")
	}
	apiKey := os.Getenv("TMDB_KEY")

	router := chi.NewRouter()
	router.Use(chimiddle.StripSlashes) //allows trailing slashes to be accepted for routes and not throw a 404
	router.Use(chimiddle.Logger)       //Log each request to the console

	client := tmdb.NewTMDBClient(apiKey) //Create TMDB client that will be used to make HTTP requests

	handlers.MovieHandler(router, client)

	//Swagger route
	router.Get("/swagger/*", httpSwagger.Handler(
		httpSwagger.URL("http://localhost:8080/swagger/doc.json"), // Adjust port and path as needed
	))

	err := http.ListenAndServe(":8080", router)
	if err != nil {
		log.Fatal(err)
	}

}
