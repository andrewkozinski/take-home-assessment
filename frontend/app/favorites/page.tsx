import FavoriteMoviesList from "@/components/ui/favorite-movies-list";
import { Navbar } from "@/components/ui/navbar";

export default function FavoriteMoviesListPage() {
    return (
        <div className="flex min-h-screen">
            <main className="flex flex-col min-h-screen w-full">
                <Navbar />
                <div className="m-auto">
                    <h1 className="lg:text-4xl md:text-3xl sm:text-2xl">Your Favorites:</h1>
                    <FavoriteMoviesList />
                </div>
            </main>
            
        </div>
    );
}