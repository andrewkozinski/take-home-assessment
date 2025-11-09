import { Movie } from "@/types/movie";
import Image from "next/image";

export function MovieCard({ movie }: { movie: Movie }) {

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
            <Image
                src={`${movie.poster_path}`}
                alt={movie.title}
                width={150}
                height={225}
                className="rounded-md object-cover"
            />
            <h3 className="text-sm text-center mt-2 font-medium line-clamp-2">
                {movie.title}
            </h3>
        </div>
    )

}