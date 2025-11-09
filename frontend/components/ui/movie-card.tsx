"use client";
import { Movie } from "@/types/movie";
import Image from "next/image";
import { isMovieFavorited, addFavoriteMovie, removeFavoriteMovie } from "@/lib/favorites";
import { StarIcon } from "lucide-react";
import { useState, useEffect } from "react";


export function MovieCard({ movie }: { movie: Movie }) {

    const [isFavorited, setIsFavorited] = useState(false);

    useEffect(() => {
        
        const checkFavorited = async () => {
            const favorited = isMovieFavorited(movie.id);
            setIsFavorited(favorited);
        }
        checkFavorited();

        //Listen for any updates to favorited
        const handleFavoritesUpdated = () => {
            checkFavorited();
        }
        window.addEventListener("favoritesUpdated", handleFavoritesUpdated);

        return () => {
            window.removeEventListener("favoritesUpdated", handleFavoritesUpdated);
        }

    }, [movie.id]);

    return (
        <div
            key={movie.id}
            className="
                    flex
                    flex-col 
                    items-center 
                    bg-muted 
                    rounded-lg 
                    p-2 
                    shadow 
                    hover:shadow-lg transition-shadow duration-200 
                    hover:scale-[1.02] transition-transform duration-200
                    hover:cursor-pointer
                    "
            onClick={() => {
                //Navigate to movie details page for specific movie
                window.location.href = `/movie/${movie.id}`;
            }}
        >
            <div className="relative">
                <Image
                src={`${movie.poster_path}`}
                alt={movie.title}
                width={150}
                height={225}
                className="rounded-md object-cover"
                />
                {/* Star button over the poster */}
                <button
                    className="absolute top-1 right-1"
                    onClick={(e) => {
                        e.stopPropagation();
                        // Add or remove favorite movie
                        if (isFavorited) {
                            removeFavoriteMovie(movie.id);
                            setIsFavorited(false);
                        } else {
                            addFavoriteMovie(movie.id);
                            setIsFavorited(true);
                        }
                    }}
                    aria-pressed={isFavorited}
                    aria-label={isFavorited ? "Remove from favorites" : "Add to favorites"}
                >
                    {/* Star icon */}
                    <StarIcon 
                    className="w-5 h-5 text-blue-500"
                    fill={isFavorited ? "currentColor" : "none"}
                    aria-hidden="true"
                    strokeWidth={1.5}
                    />
                </button>
            </div>
            
            <h3 className="text-sm text-center mt-2 font-medium line-clamp-2">
                {movie.title}
            </h3>
        </div>
    )

}