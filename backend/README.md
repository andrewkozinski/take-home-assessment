The backend was built using Go. The backend directory structure was loosely based on the [golang-standards/project-layout](https://github.com/golang-standards/project-layout) GitHub repository.

- cmd/: This directory contains the main.go file which is the entry point for the application.
  - movieapi/: Contains the main.go file to start the API.
- docs/: This directory contains the Swagger API documentation files.
- internal/: This directory contains the bulk of the application logic. It includes the following subdirectories:
  - api/: Contains the API handlers and routing logic.
    - model/: Contains the movie data model
    - tmdb/: Contains the TMDB API client logic to fetch movie information and trending movies.
    - handlers/: Contains the API routes.
  - cache/: Contains the caching logic for in-memory caching to store movie data and reduce API calls to TMDB.

### The backend makes use of the following third party libraries:
- Chi for API routing. Chosen for its more expressive routing. 
- joho/godotenv for loading environment variables from a .env file.
- swaggo/http-swagger for generating Swagger API documentation. To generate the docs, run `swag init -g ./cmd/movieapi/main.go -o ./docs` from the backend directory. When backend instance is running, found at /swagger/index.html route. For example, if on local host, [http://localhost:8080/swagger/index.html](http://localhost:8080/swagger/index.html).

### Running tests:
There are unit tests written for tmdb_client.go and cache.go in their respective directories. To run tests for everything run the following from the backend directory:
```
go test -cover ./...
```
Make sure the API_KEY environment variable is set for tmdb_client_test.go tests. 