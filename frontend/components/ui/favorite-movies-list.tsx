"use client";
import { useEffect, useState } from "react";
import { getFavoriteMovies } from "@/lib/favorites";
import { fetchMovieDetails, splitMovies } from "@/lib/movies";
import { Movie } from "@/types/movie";
import MovieCarousel from "./movie-carousel";


export default function FavoriteMoviesList() {

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        const favoriteMovies = getFavoriteMovies();

        //For each movie ID in favoriteMovies, fetch the movie details from TMDB API
        const movieDetails = favoriteMovies.map(id => fetchMovieDetails(id.toString()));

        Promise.all(movieDetails)
            .then(movies => setMovies(movies))
            .catch(error => console.error("Error fetching favorite movies: ", error));

    }, []);

    if(movies.length === 0) {
        return <div>No movies favorited. Favorite a movie and it will appear here!</div>;
    }

    return (
        <div>
            <MovieCarousel movies={movies} />
        </div>
    );
}