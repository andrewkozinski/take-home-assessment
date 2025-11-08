// Helper functions for managing favorites in local storage

/**
 * Gets favorite movies from local storage
 * @returns Favorite movies from local storage
 */
export function getFavoriteMovies(): string[] {
    if (typeof window === 'undefined') return [];
    const favorites = localStorage.getItem('favoriteMovies');
    return favorites ? JSON.parse(favorites) : [];
}

/**
 * Checks if a movie is favorited
 * @param movieId TMDB API Movie ID
 * @returns True if the movie is favorited, false otherwise
 */
export function isMovieFavorited(movieId: string): boolean {
    const favorites = getFavoriteMovies();
    return favorites.includes(movieId);
}

/**
 * Adds a movie to favorites
 * @param movieId TMDB API Movie ID
 */
export function addFavoriteMovie(movieId: string): void {
    const favorites = getFavoriteMovies();
    if (!favorites.includes(movieId)) {
        favorites.push(movieId);
        localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    }
}

export function removeFavoriteMovie(movieId: string): void {
    const favorites = getFavoriteMovies();
    const index = favorites.indexOf(movieId);
    if (index !== -1) {
        favorites.splice(index, 1);//remove the movie from favorites, starting at index "index", remove 1 item
        localStorage.setItem('favoriteMovies', JSON.stringify(favorites));
    }
}