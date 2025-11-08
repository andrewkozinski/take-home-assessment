export enum TimeFrame {
    DAY = "day",
    WEEK = "week"
}

/**
 * Helper function to fetch trending movies
 * @param period - TimeFrame.DAY or TimeFrame.WEEK
 * @returns A promise that resolves to the list of trending movies
 */
export async function fetchTrendingMovies(period: TimeFrame) {
    const response = await fetch(`/api/trending/movie/${period}`);
    const data = await response.json();

    if(!response.ok) {
        throw new Error(data.error || 'Failed to fetch trending movies');
    }

    return data;
}