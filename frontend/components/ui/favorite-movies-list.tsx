"use client";
import { useEffect, useState } from "react";
import { getFavoriteMovies } from "@/lib/favorites";
import { fetchMovieDetails } from "@/lib/movies";
import { Movie } from "@/types/movie";
import MovieCarousel from "./movie-carousel";


export default function FavoriteMoviesList() {

    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {

        const loadFavorites = async () => {
            const favoriteMovies = getFavoriteMovies();
            //For each movie ID in favoriteMovies, fetch the movie details from TMDB API
            const movieDetails = favoriteMovies.map(id => fetchMovieDetails(id.toString()));
            const movies = await Promise.all(movieDetails);
            setMovies(movies);
        }
        loadFavorites();

        //Listen for any updates to favorited
        const handleFavoritesUpdated = () => {
            loadFavorites();
        }
        window.addEventListener("favoritesUpdated", handleFavoritesUpdated);

        return () => {
            window.removeEventListener("favoritesUpdated", handleFavoritesUpdated);
        };

    }, []);

    if(movies.length === 0) {
        return (
            <div className="justify-center items-center flex flex-col space-y-4">
                <h1 className="text-2xl sm:text-1xl">No movies favorited.</h1>
                <p className="text-sm">Favorite a movie and it will appear here!</p>
            </div>
        );
    }

    return (
        <div>
            <MovieCarousel movies={movies} />
        </div>
    );
}