"use client";

import { useParams } from "next/dist/client/components/navigation";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { fetchMovieDetails } from "@/lib/movies";

export default function MoviePage() {
    //Get the movie ID from the URL params
    const { id } = useParams();

    //Fetch movie data from nextjs api route
    const [movie, setMovie] = useState<Movie | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchMovie() {
            try {
                console.log("Fetching movie with ID: ", id);
                const data = await fetchMovieDetails(id?.toString() || "");
                setMovie(data);
            } catch (err) {
                setError((err as Error).message);
            }
        }
        fetchMovie();
    }, [id]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!movie) {
        return <div>Loading...</div>;
    }

    return (
        <div className="">
            <main className="">
                <div className="m-auto">
                    <p>Movie Page</p>
                    <h1 className="text-3xl font-bold">{movie.title}</h1>
                    <p className="mt-4">{movie.overview}</p>
                    <p className="mt-4">Release Date: {movie.release_date}</p>
                    <div className="mt-4">
                        Genres: {
                            movie.genres?.map((genre) => (
                                <Badge key={genre.name} className="mr-2">{genre.name}</Badge>
                            ))
                        }
                    </div>
                </div>
            </main>
        </div>
    );

}