/* @jest-environment jsdom */
import React from 'react';
import { render, screen } from '@testing-library/react';
import TrendingMoviesList from './trending-movies-list';
import { ApiError } from '@/types/error-message';
import { Movie } from '@/types/movie';
import { TimeFrame } from '@/lib/movies';
import MoviesCarousel from './movie-carousel';

// Mock the fetchTrendingMovies function
jest.mock('@/lib/movies', () => ({
    fetchTrendingMovies: jest.fn(),
    TimeFrame: { 
        DAY: 'day',
        WEEK: 'week'
    },
    splitMovies: jest.requireActual('@/lib/movies').splitMovies,
}));

//Mock the movie carousel component
jest.mock('./movie-carousel', () => ({
    __esModule: true,
    default: ({ movies }: { movies: Movie[] }) => (
        <div>
            {movies.map(movie => (
                <div key={movie.id}>{movie.title}</div>//Simple representation of movie card
            ))}
        </div>
    ),
}));

const moviesHelper = require ('@/lib/movies');//Mock import

describe('TrendingMoviesList', () => {
    const mockMovies: Movie[] = [
        {
            id: 1,
            title: 'Movie 1',
            overview: 'Overview 1',
            release_date: '2023-01-01',
            poster_path: '/path1.jpg',
            genres: [],
            production_companies:
                [
                    {
                        id: 101,
                        name: 'Company 1',
                        logo_path: '/logo1.png',
                    },
                    {
                        id: 102,
                        name: 'Company 2',
                        logo_path: '/logo2.png',
                    }
                ]
            ,
            runtime: 0,
            popularity: 0,
        },
        {
            id: 2,
            title: 'Movie 2',
            overview: 'Overview 2',
            release_date: '2023-02-01',
            poster_path: '/path2.jpg',
            genres: [],
            production_companies: [],
            runtime: 0,
            popularity: 0,
        },
    ];

    afterEach(() => {
        jest.clearAllMocks();
    });

    test("Renders loading state", () => {
        (moviesHelper.fetchTrendingMovies as jest.Mock).mockReturnValue(new Promise(() => {}));
        const { getByText } = render(<TrendingMoviesList timeFrame={TimeFrame.DAY} />);
        expect(getByText(/Loading trending movies.../i)).toBeTruthy();
    });

    //Async because useEffect uses async function to fetch data
    test("Renders error state", async () => {
        const error: ApiError = { name: "ApiError", message: "Failed to fetch", statusCode: 500 };
        (moviesHelper.fetchTrendingMovies as jest.Mock).mockRejectedValueOnce(error);
        render(<TrendingMoviesList timeFrame={TimeFrame.DAY} />);
        expect(
            await screen.findByText(/Error loading trending movies. Please try again later./i)
        ).toBeTruthy();
    });

    test("Renders no movies found state", async () => {
        (moviesHelper.fetchTrendingMovies as jest.Mock).mockResolvedValueOnce([]);
        render(<TrendingMoviesList timeFrame={TimeFrame.DAY} />);
        expect(
            await screen.findByText(/No trending movies found. Please try again later./i)
        ).toBeTruthy();
    });

    test("Renders movies when data is available", async () => {
        (moviesHelper.fetchTrendingMovies as jest.Mock).mockResolvedValueOnce(mockMovies);
        render(<TrendingMoviesList timeFrame={TimeFrame.DAY} />);
        expect(await screen.findByText(/Movie 1/i)).toBeTruthy();
        expect(await screen.findByText(/Movie 2/i)).toBeTruthy();
    });
    
});