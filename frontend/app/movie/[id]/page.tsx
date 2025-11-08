"use client";

import { useParams } from "next/dist/client/components/navigation";
import { Movie } from "@/types/movie";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge"
import { fetchMovieDetails } from "@/lib/movies";
import { Navbar } from "@/components/ui/navbar";
import { Toggle } from "@/components/ui/toggle";
import { addFavoriteMovie, removeFavoriteMovie, isMovieFavorited } from "@/lib/favorites";
import { StarIcon } from "lucide-react";
import { ApiError } from "@/types/error-message";
import Image from "next/image";

export default function MoviePage() {
    //Get the movie ID from the URL params
    const { id } = useParams();

    //Fetch movie data from nextjs api route
    const [movie, setMovie] = useState<Movie | null>(null);
    const [error, setError] = useState<ApiError | null>(null);
    const [isFavorited, setIsFavorited] = useState<boolean>(false);

    useEffect(() => {
        async function fetchMovie() {
            try {
                console.log("Fetching movie with ID: ", id);
                const data = await fetchMovieDetails(id?.toString() || "");
                setMovie(data);
            } catch (err) {
                setError((err as ApiError));
            }
        }
        fetchMovie();
        //Check if movie is favorited
        if (id) {
            const favorited = isMovieFavorited(Number(id));
            setIsFavorited(favorited);
            console.log("Is movie favorited: ", favorited);
            console.log(localStorage.getItem("favoriteMovies"));
        }
    }, [id]);

    if (error) {
        return (
            <>
                <Navbar />
                <div className="justify-center items-center flex flex-col space-y-4">
                    <h1 className="text-2xl text-red-600 sm:text-1xl">Error: "{error.message}" with Status: {error.statusCode}</h1>
                    <p className="text-sm">Error loading trending movies. Please try again later.</p>
                </div>
            </>
        );
    }

    if (!movie) {
        return (
            <div>
                <Navbar />
                Loading...
            </div>
        );
    }

    return (
        <div className="">
            <Navbar />
            <main className="">
                <div className="m-8 space-y-4 flex flex-col lg:flex-row lg:space-x-8 lg:space-y-0">
                    
                    {/* Image left side */}
                    <div>
                        <Image
                            width={300}
                            height={450}
                            src={`${movie.poster_path}`}
                            alt={movie.title}
                            className="rounded-lg"
                        />
                    </div>
                    {/* Movie details right side */}
                    <div>
                        <h1 className="text-3xl font-bold">{movie.title}</h1>
                        <p className="mt-4">Release Date: {movie.release_date}</p>
                        <p className="mt-4">{movie.overview}</p>


                        <div className="mt-4">
                            <p>Genres: </p> 
                            {
                                movie.genres?.map((genre) => (
                                    <Badge key={genre.name} className="mr-2">{genre.name}</Badge>
                                ))
                            }
                        </div>

                        <Toggle
                            aria-label="Toggle bookmark"
                            size="sm"
                            variant="outline"
                            className="mt-4 data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
                            pressed={isFavorited}
                            onPressedChange={(pressed) => {
                                if (pressed) {
                                    addFavoriteMovie(movie.id);
                                } else {
                                    removeFavoriteMovie(movie.id);
                                }
                                setIsFavorited(pressed);
                            }}
                        >
                            <StarIcon className="mr-2" />
                            Favorite
                        </Toggle>
                    </div>
                </div>
            </main>
        </div>
    );

}