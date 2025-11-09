import { Movie } from "@/types/movie";
import { ApiError } from "@/types/error-message";
import { setCache, getCache } from "./cache";

export enum TimeFrame {
    DAY = "day",
    WEEK = "week"
}

/**
 * Helper function to throw error given response and data
 * @param response - The fetched response
 * @param data - JSON response
 */
function throwError(response: Response, data: any) {
    throw new ApiError(data.error ? `${data.error}` : 'Failed to fetch movie details', response.status);
}

/**
 * Helper function to fetch trending movies
 * @param period - TimeFrame.DAY or TimeFrame.WEEK
 * @returns A promise that resolves to the list of trending movies
 */
export async function fetchTrendingMovies(period: TimeFrame) {

    //Before making any requests, check cache
    const cacheKey = `trending-movies-${period}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) {
        console.log("Returning cached data for trending movies: ", period);
        return cachedData;
    }

    const response = await fetch(`/api/trending/movie/${period}`);
    const data = await response.json();

    if(!response.ok) {
        throwError(response, data);
    }

    //Set cache for 10 minutes
    setCache(cacheKey, data, 10 * 60 * 1000); //10 minutes in milliseconds

    return data;
}

/**
 * Helper function to fetch movie details by ID
 * @param id - TMDB API Movie ID
 * @returns Details of the movie
 */
export async function fetchMovieDetails(id: string) {

    //Before making any requests, check cache
    const cacheKey = `movie-details-${id}`;
    const cachedData = getCache(cacheKey);

    if (cachedData) {
        console.log("Returning cached data for movie ID: ", id);
        return cachedData;
    }

    const response = await fetch(`/api/movies/${id}`);
    const data = await response.json();

    if(!response.ok) {
        throwError(response, data);
    }

    //Set cache for 10 minutes
    setCache(cacheKey, data, 10 * 60 * 1000); //10 minutes in milliseconds

    return data;
}


// Helper function to split movies into segments for each page of the carousel
/**
 * Splits an array of movies into chunks/pages of specified size
 * @param arr Array of movies
 * @param size Size of each chunk or 'page' of the split array
 * @returns An array of movie arrays, each of size 'size'
 */
export const splitMovies = (arr: Movie[], size: number): Movie[][] => {
    const result: Movie[][] = [];
    for (let i = 0; i < arr.length; i += size) {
        result.push(arr.slice(i, i + size));
    }
    return result;
}