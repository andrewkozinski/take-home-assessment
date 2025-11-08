"use client";
import { useEffect, useState } from "react";
import { fetchTrendingMovies, TimeFrame } from "@/lib/movies";
import { Movie } from "@/types/movie";
import Image from "next/image";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";

// This component displays a list of trending movies
export default function TrendingMoviesList({ timeFrame }: { timeFrame: TimeFrame }) {
    
    const [movies, setMovies] = useState<Movie[]>([]);

    useEffect(() => {
        async function fetchTrending() {
            const data = await fetchTrendingMovies(timeFrame);
            setMovies(data);
        }
        fetchTrending();
    }, [timeFrame]);

    // Helper function to split movies into segments for each page of the carousel
    const splitMovies = (arr: Movie[], size: number): Movie[][] => {
        const result: Movie[][] = [];
        for (let i = 0; i < arr.length; i += size) {
            result.push(arr.slice(i, i + size));
        }
        return result;
    }
    const movieChunks = splitMovies(movies, 5);//Splits the movies into chunks of 5

    return (
        <div className="">
            <Carousel>
                <CarouselContent>
                    {movieChunks.map((chunk, index) => (
                        <CarouselItem key={index}>
                            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 p-4 ">
                                {chunk.map((movie) => (
                                    <div
                                        key={movie.id}
                                        className="flex 
                                                   flex-col 
                                                   items-center 
                                                   bg-muted 
                                                   rounded-lg 
                                                   p-2 
                                                   shadow 
                                                   hover:shadow-lg transition-shadow duration-200 
                                                   hover:scale-[1.02] transition-transform duration-200"
                                        style={{cursor: 'pointer'}}
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
                                ))}
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
            </Carousel>
        </div>
    );
}