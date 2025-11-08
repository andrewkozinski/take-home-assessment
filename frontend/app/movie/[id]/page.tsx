"use client";

import { useParams } from "next/dist/client/components/navigation";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"

export default function MoviePage() {
    //Get the movie ID from the URL params
    const { id } = useParams();

    //Fetch movie data from nextjs api route
    const [movie, setMovie] = useState<Movie | null>(null);

    useEffect(() => {
        async function fetchMovie() {
            console.log("Fetching movie with ID: ", id);
            const response = await fetch(`/api/movies/${id}`);
            const data = await response.json();
            setMovie(data);
        }
        fetchMovie();
    }, [id]);

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
                            movie.genres.map((genre) => (
                                <Badge key={genre.name} className="mr-2">{genre.name}</Badge>
                            ))
                        }
                    </div>
                </div>
            </main>
        </div>
    );

}