"use client";
import { useEffect, useState } from "react";
import { fetchTrendingMovies, TimeFrame, splitMovies } from "@/lib/movies";
import { Movie } from "@/types/movie";
import MovieCarousel from "./movie-carousel";
import { ApiError } from "@/types/error-message";
import { RotatingLines } from "react-loader-spinner";

// This component displays a list of trending movies
export default function TrendingMoviesList({ timeFrame }: { timeFrame: TimeFrame }) {

    const [movies, setMovies] = useState<Movie[]>([]);
    const [error, setError] = useState<ApiError | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchTrending() {
            try {
                const data = await fetchTrendingMovies(timeFrame);
                setMovies(data);
                setLoading(false);
            }
            catch (error) {
                console.error("Error fetching trending movies: ", error);
                setMovies([]);
                setError((error as ApiError));
                setLoading(false);
            }
        }
        fetchTrending();
    }, [timeFrame]);

    //const movieChunks = splitMovies(movies, 5);//Splits the movies into chunks of 5

    if(loading) {
        return (
            <div className="justify-center items-center flex flex-col space-y-4">
                <RotatingLines
                    strokeColor="grey"
                    strokeWidth="5"
                    animationDuration="0.75"
                    width="96"
                    visible={true}
                />
                <p>Loading trending movies...</p>
            </div>
        );
    }

    if(error) {
        return (
            <div className="justify-center items-center flex flex-col space-y-4">
                <h1 className="text-2xl text-red-600 sm:text-1xl">Error: "{error.message}" with Status: {error.statusCode}</h1>
                <p className="text-sm">Error loading trending movies. Please try again later.</p>
            </div>

        )
    }

    if(movies.length === 0) {
        return <div>No trending movies found. Please try again later.</div>;
    }

    return (
        <div className="">
            <MovieCarousel movies={movies} />
        </div>
    );
}